package br.com.ficaespertoapp.backend.infrastructure.security.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenGenerator {

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, Keys.secretKeyFor(SignatureAlgorithm.HS256))
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(Keys.secretKeyFor(SignatureAlgorithm.HS256))
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}