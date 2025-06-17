package br.com.ficaespertoapp.backend.application;

import br.com.ficaespertoapp.backend.domain.dto.BillDTO;
import br.com.ficaespertoapp.backend.domain.enums.BillOrigin;
import br.com.ficaespertoapp.backend.domain.enums.BillStatus;
import br.com.ficaespertoapp.backend.domain.exception.BillException;
import br.com.ficaespertoapp.backend.domain.service.BillService;
import br.com.ficaespertoapp.backend.domain.service.UserService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Bill;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import br.com.ficaespertoapp.backend.infrastructure.persistence.repository.BillRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final UserService userService;

    public BillServiceImpl(BillRepository billRepository, UserService userService) {
        this.billRepository = billRepository;
        this.userService = userService;
    }

    @Override
    public List<Bill> findAllBillsByUserId(Long userId) {
        return billRepository.findBillByUserId(userId);
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return billRepository.findById(id);
    }

    @Override
    public Bill pendingBill(Long id) {
        Optional<Bill> optionalBill = billRepository.findById(id);

        if (optionalBill.isEmpty()) {
            throw new BillException("Cannot update Bill. Bill not found with ID: " + id);
        }

        Bill bill = optionalBill.get();
        bill.setStatus(BillStatus.PENDING);

        return billRepository.save(bill);
    }

    @Override
    public Bill payBill(Long id) {
        Optional<Bill> optionalBill = billRepository.findById(id);

        if (optionalBill.isEmpty()) {
            throw new BillException("Cannot update Bill. Bill not found with ID: " + id);
        }

        Bill bill = optionalBill.get();
        bill.setStatus(BillStatus.PAID);

        return billRepository.save(bill);
    }

    @Override
    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public List<Bill> syncSerasa(Long userId) {
        // TODO SERASA INTEGRAGTION, ONLY MOCKING VALUES FOR NOW

        User currentUser = userService.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("User not found with ID: " + userId));

        if(findAllBillsByUserId(currentUser.getId()).stream().anyMatch(it -> it.getOrigin() == BillOrigin.SERASA))
            return List.of();

        Bill bill1 = new Bill();
        bill1.setName("Financiamento Bradesco");
        bill1.setDescription("Financiamento de veículo Audi realizado em 2024.");
        bill1.setDueDate(LocalDateTime.now());
        bill1.setValue(3000.0);
        bill1.setStatus(BillStatus.PENDING);
        bill1.setOrigin(BillOrigin.SERASA);
        bill1.setUser(currentUser);

        Bill bill2 = new Bill();
        bill2.setName("Emprestimo Bradesco");
        bill2.setDescription("Emprestimo Bradesco realizado em 2024.");
        bill2.setDueDate(LocalDateTime.now());
        bill2.setValue(6000.0);
        bill2.setStatus(BillStatus.PENDING);
        bill2.setOrigin(BillOrigin.SERASA);
        bill2.setUser(currentUser);


        Bill bill3 = new Bill();
        bill3.setName("Conta de Luz Sanepar");
        bill3.setDescription("Conta de Luz referente ao mês de Outubro de 2024.");
        bill3.setDueDate(LocalDateTime.now());
        bill3.setValue(300.0);
        bill3.setStatus(BillStatus.PENDING);
        bill3.setOrigin(BillOrigin.SERASA);
        bill3.setUser(currentUser);

        return billRepository.saveAll(List.of(bill1, bill2, bill3));
    }

    @Override
    public Bill saveDto(BillDTO bill) {
        Optional<User> optionalUser = userService.findById(bill.getUserId());

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("Cannot save Bill. User not found with ID: " + bill.getUserId());
        }

        Bill entity = new Bill();
        entity.setName(bill.getName());
        entity.setDescription(bill.getDescription());
        entity.setDueDate(bill.getDueDate());
        entity.setValue(bill.getValue());
        entity.setStatus(BillStatus.valueOf(bill.getStatus()));
        entity.setUser(optionalUser.get());
        entity.setOrigin(BillOrigin.MANUAL);

        return billRepository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        Optional<Bill> optionalBill = billRepository.findById(id);

        if (optionalBill.isEmpty()) {
            throw new BillException("Cannot delete Bill. Bill not found with ID: " + id);
        }

        billRepository.deleteById(id);
    }
}
