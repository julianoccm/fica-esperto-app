package br.com.ficaespertoapp.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private String author;
    private String imageUrl;
    private String category;
}
