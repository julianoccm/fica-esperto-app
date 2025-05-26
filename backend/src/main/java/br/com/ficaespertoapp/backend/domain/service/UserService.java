package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.domain.dto.UserDTO;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import java.util.Optional;

public interface UserService {
    User verifyAuthentication(String email, String password);
    Optional<User> findByEmail(String email);
    User save(User user);
    User saveDto(UserDTO user);
}
