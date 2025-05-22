package br.com.ficaespertoapp.backend.web.security.jwt;

import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
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
                User databaseUser = userService.findByEmail(username);

                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(databaseUser.getEmail(), null, new ArrayList<>())
                );
            }
        }
        chain.doFilter(request, response);
    }
}