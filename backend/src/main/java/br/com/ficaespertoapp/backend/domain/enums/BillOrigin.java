package br.com.ficaespertoapp.backend.domain.enums;

public enum BillOrigin {
    SERASA("Serasa"),
    MANUAL("Manul");

    private final String description;

    BillOrigin(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
