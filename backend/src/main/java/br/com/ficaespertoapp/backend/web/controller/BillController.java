package br.com.ficaespertoapp.backend.web.controller;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.domain.service.BillService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bill/v1")
public class BillController {

    private final BillService billService;

    public BillController(BillService billService) {
        this.billService = billService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBillByUserId(@PathVariable Long userId) {
        try {
            List<Bill> bills = billService.findAllBillsByUserId(userId);
            return ResponseEntity.ok(bills);
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBillById(@PathVariable Long id) {
        try {
            Optional<Bill> billOptional = billService.findById(id);
            return billOptional.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @PutMapping("/pending/{id}")
    public ResponseEntity<?> pendingBill(@PathVariable Long id) {
        try {
            Bill bill = billService.pendingBill(id);
            return ResponseEntity.ok(bill);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<?> payBill(@PathVariable Long id) {
        try {
            Bill bill = billService.payBill(id);
            return ResponseEntity.ok(bill);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveBill(@RequestBody BillDTO bill) {
        try {
            Bill savedBill = billService.saveDto(bill);
            return ResponseEntity.ok(savedBill);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @GetMapping("/sync/serasa/{userId}")
    public ResponseEntity<?> syncSerasa(@PathVariable Long userId) {
        try {
            List<Bill> bills = billService.syncSerasa(userId);
            return ResponseEntity.ok(bills);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBill(@PathVariable Long id) {
        try {
            billService.deleteById(id);
            return ResponseEntity.ok("Bill deleted successfully.");
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

}
