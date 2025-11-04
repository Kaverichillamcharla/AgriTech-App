package com.example.SsoApplication.service;

import com.example.SsoApplication.model.User;
import com.example.SsoApplication.repository.UserRepository;
import com.example.SsoApplication.security.JwUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwUtil jwUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setProvider("local");
        userRepository.save(user);
        return "User registered successfully!";
    }


    public String loginUser(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();


        if (!"local".equalsIgnoreCase(user.getProvider())) {
            throw new RuntimeException("Please login using your provider (" + user.getProvider() + ")");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwUtil.generateToken(user.getEmail());
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveOAuth2User(String provider, String providerId, String name, String email) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .provider(provider)
                            .name(name)
                            .email(email)
                            .password("")
                            .build();
                    return userRepository.save(newUser);
                });
    }

    public String generateTokenForOAuthUser(String email) {
        return jwUtil.generateToken(email);
    }
}
