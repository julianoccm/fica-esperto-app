package br.com.ficaespertoapp.backend.infrastructure.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenGenerator {

    private final JwtGeneratorProperties properties;

    public JwtTokenGenerator(JwtGeneratorProperties properties) {
        this.properties = properties;
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, properties.getKey())
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(properties.getKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}