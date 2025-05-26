package br.com.ficaespertoapp.backend.domain.enums;

public enum PostCategory {

    CHILDREN("Crianças"),
    TEENS("Adolescentes"),
    ADULTS("Adultos"),
    SENIORS("Idosos");

    private final String description;

    PostCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
