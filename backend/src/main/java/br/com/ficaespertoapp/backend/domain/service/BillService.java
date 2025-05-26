package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import java.util.List;

public interface BillService {
    List<Bill> findAllBillsByUserId(Long userId);
}
