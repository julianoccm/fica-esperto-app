package br.com.ficaespertoapp.backend.application;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.domain.service.BillService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import br.com.ficaespertoapp.backend.infrastructure.persistence.repository.BillRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;

    public BillServiceImpl(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    @Override
    public List<BillDTO> findAllBillsByUserId(Long userId) {
        List<BillDTO> responseBill = new ArrayList<>();
        List<Bill> bills = billRepository.findBillByUserId(userId);

        bills.forEach(bill -> responseBill.add(bill.toDTO()));

        return responseBill;
    }
}
