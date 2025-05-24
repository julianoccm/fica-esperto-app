package br.com.ficaespertoapp.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class BillDTO {
    private Long id;
    private String description;
    private Double amount;
    private String dueDate;
    private String status;
    private Long userId;
}