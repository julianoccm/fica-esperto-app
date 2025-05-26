package br.com.ficaespertoapp.backend.application;

import br.com.ficaespertoapp.backend.domain.dto.UserDTO;
import br.com.ficaespertoapp.backend.domain.exception.UserException;
import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import br.com.ficaespertoapp.backend.infrastructure.persistence.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User save(User user) {
        Optional<User> userOptional = findByEmail(user.getEmail());

        if (userOptional.isPresent()) {
            throw new UserException(String.format("User with email %s already exists", user.getEmail()));
        }

        return userRepository.save(user);
    }

    @Override
    public User saveDto(UserDTO user) {
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setCpf(user.getCpf());

        return save(newUser);
    }

    @Override
    public User verifyAuthentication(String email, String password) {
        Optional<User> userOptional = findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UserException(String.format("User with email %s not found", email));
        }

        User user = userOptional.get();
        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserException("Invalid password");
        }

        return user;
    }
}
