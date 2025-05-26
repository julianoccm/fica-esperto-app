package br.com.ficaespertoapp.backend.domain.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class BillDTO {
    private Long id;
    private String name;
    private String description;
    private Double value;
    private LocalDateTime dueDate;
    private String status;
    private Long userId;
}