package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import java.util.List;

public interface BillService {
    List<BillDTO> findAllBillsByUserId(Long userId);
}
