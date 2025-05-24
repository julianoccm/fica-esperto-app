package br.com.ficaespertoapp.backend.web.controller;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.domain.service.BillService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bill/v1")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BillDTO>> getBillByUserId(@PathVariable Long userId) {
        try {
            List<BillDTO> bills = billService.findAllBillsByUserId(userId);
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
