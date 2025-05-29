package br.com.ficaespertoapp.backend.domain.dto;

import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AuthResponseDTO {
    private User user;
    private String token;
}
