package br.com.ficaespertoapp.backend.infrastructure.persistence.entity;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.domain.enums.BillStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bills")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column(nullable = false)
    private Double value;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BillStatus status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public BillDTO toDTO() {
        BillDTO billDTO = new BillDTO();
        billDTO.setId(this.id);
        billDTO.setDescription(this.description);
        billDTO.setAmount(this.value);
        billDTO.setDueDate(this.dueDate.toString());
        billDTO.setStatus(this.status.name());
        billDTO.setUserId(this.user.getId());
        return billDTO;
    }
}
