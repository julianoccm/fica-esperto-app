package br.com.ficaespertoapp.backend.infrastructure.persistence.repository;

import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    List<Bill> findBillByUserId(Long userId);
}
