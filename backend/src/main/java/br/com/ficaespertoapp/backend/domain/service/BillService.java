package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import java.util.List;
import java.util.Optional;

public interface BillService {
    List<Bill> findAllBillsByUserId(Long userId);
    Optional<Bill> findById(Long id);
    Bill pendingBill(Long id);
    Bill payBill(Long id);
    Bill save(Bill bill);
    Bill saveDto(BillDTO bill);
    void deleteById(Long id);
}
