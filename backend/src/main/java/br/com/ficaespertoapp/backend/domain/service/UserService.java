package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;

public interface UserService {
    User verifyAuthentication(String email, String password);
    User findByEmail(String email);
}
