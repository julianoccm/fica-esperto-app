package br.com.ficaespertoapp.backend.infrastructure.webapi;


import br.com.ficaespertoapp.backend.domain.dto.LoginDTO;
import br.com.ficaespertoapp.backend.domain.exception.AuthenticationException;
import br.com.ficaespertoapp.backend.infrastructure.security.jwt.JwtTokenGenerator;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/v1")
public class AuthController {

    private final JwtTokenGenerator jwtTokenGenerator;

    public AuthController(JwtTokenGenerator jwtTokenGenerator) {
        this.jwtTokenGenerator = jwtTokenGenerator;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDTO loginRequest) {
        if ("user".equals(loginRequest.getUsername()) && "password".equals(loginRequest.getPassword())) {
            return jwtTokenGenerator.generateToken(loginRequest.getUsername());
        }

        throw new AuthenticationException("Unble to authenticate, invalid credentials.");
    }
}