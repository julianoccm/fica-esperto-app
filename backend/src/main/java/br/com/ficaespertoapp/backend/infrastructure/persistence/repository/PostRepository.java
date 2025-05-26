package br.com.ficaespertoapp.backend.infrastructure.persistence.repository;

import br.com.ficaespertoapp.backend.domain.enums.PostCategory;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Post;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findPostByCategory(PostCategory category);
}
