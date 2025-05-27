package br.com.ficaespertoapp.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UserDTO {
    private String name;
    private String email;
    private String password;
    private String cpf;
    private String birthDate;
}