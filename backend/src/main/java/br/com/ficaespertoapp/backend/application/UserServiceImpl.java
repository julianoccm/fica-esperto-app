package br.com.ficaespertoapp.backend.application;

import br.com.ficaespertoapp.backend.domain.exception.UserException;
import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import br.com.ficaespertoapp.backend.infrastructure.persistence.repository.UserRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UserException(String.format("User with email %s not found", email));
        }

        return user.get();
    }

    @Override
    public User verifyAuthentication(String email, String password) {
        User user = findByEmail(email);

        if (!user.getPassword().equals(password)) {
            throw new UserException("Invalid password");
        }

        return user;
    }
}
