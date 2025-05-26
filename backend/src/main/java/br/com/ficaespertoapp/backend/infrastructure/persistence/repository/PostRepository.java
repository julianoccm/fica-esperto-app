package br.com.ficaespertoapp.backend.infrastructure.persistence.repository;

import br.com.ficaespertoapp.backend.domain.enums.PostCategory;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostByCategory(PostCategory category);
}
