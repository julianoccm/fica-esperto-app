package br.com.ficaespertoapp.backend.domain.service;

import br.com.ficaespertoapp.backend.domain.dto.PostDTO;
import br.com.ficaespertoapp.backend.domain.enums.PostCategory;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Post;
import java.util.List;
import java.util.Optional;

public interface PostService {
    List<Post> findAllPostsByCategory(PostCategory category);
    Post save(Post post);
    Optional<Post> findById(Long id);
    Post saveDto(PostDTO post);
    List<Post> findAllPosts();
    void deletePost(Long id);
}
