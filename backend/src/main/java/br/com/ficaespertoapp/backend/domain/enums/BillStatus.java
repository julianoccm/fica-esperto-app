package br.com.ficaespertoapp.backend.domain.enums;

public enum BillStatus {
    PENDING("Pendente"),
    PAID("Pago"),
    OVERDUE("Vencido");

    private final String description;

    BillStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
