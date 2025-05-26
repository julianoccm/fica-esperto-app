package br.com.ficaespertoapp.backend.application;

import br.com.ficaespertoapp.backend.domain.dto.PostDTO;
import br.com.ficaespertoapp.backend.domain.enums.PostCategory;
import br.com.ficaespertoapp.backend.domain.service.PostService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Post;
import br.com.ficaespertoapp.backend.infrastructure.persistence.repository.PostRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Post> findAllPostsByCategory(PostCategory category) {
        return postRepository.findPostByCategory(category);
    }

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public Post saveDto(PostDTO post) {
        Post entity = new Post();
        entity.setTitle(post.getTitle());
        entity.setDescription(post.getDescription());
        entity.setContent(post.getContent());
        entity.setCategory(PostCategory.valueOf(post.getCategory()));
        entity.setAuthor(post.getAuthor());
        entity.setImageUrl(post.getImageUrl());

        return save(entity);
    }

    @Override
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}
