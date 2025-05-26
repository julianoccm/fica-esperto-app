package br.com.ficaespertoapp.backend.web.controller;


import br.com.ficaespertoapp.backend.domain.dto.LoginDTO;
import br.com.ficaespertoapp.backend.domain.dto.UserDTO;
import br.com.ficaespertoapp.backend.domain.exception.AuthenticationException;
import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import br.com.ficaespertoapp.backend.web.security.jwt.JwtTokenGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/v1")
public class AuthController {

    private final JwtTokenGenerator jwtTokenGenerator;
    private final UserService userService;

    public AuthController(JwtTokenGenerator jwtTokenGenerator, UserService userService) {
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginRequest) {
        try {
            userService.verifyAuthentication(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(jwtTokenGenerator.generateToken(loginRequest.getEmail()));
        } catch (Exception exception) {
            return ResponseEntity.status(500).body("Unable to authenticate, invalid credentials. " + exception.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO registerRequest) {
        try {
            return ResponseEntity.ok(userService.saveDto(registerRequest));
        } catch (Exception exception) {
            return ResponseEntity.status(500).body("Unable to register user. " + exception.getMessage());
        }
    }
}