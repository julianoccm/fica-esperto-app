package br.com.ficaespertoapp.backend.web.security.jwt;

import br.com.ficaespertoapp.backend.domain.exception.UserException;
import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenGenerator jwtTokenService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtTokenGenerator jwtTokenService, UserService userService) {
        this.jwtTokenService = jwtTokenService;
        this.userService = userService;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            String username = jwtTokenService.getUsernameFromToken(token);

            if (username != null) {
                Optional<User> optinalUser = userService.findByEmail(username);

                if (optinalUser.isEmpty()) {
                    throw new UserException(String.format("Invalid token for user %s", username));
                }

                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(optinalUser.get().getEmail(), null, new ArrayList<>())
                );
            }
        }
        chain.doFilter(request, response);
    }
}