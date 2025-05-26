package br.com.ficaespertoapp.backend.web.controller;

import br.com.ficaespertoapp.backend.domain.dto.PostDTO;
import br.com.ficaespertoapp.backend.domain.enums.PostCategory;
import br.com.ficaespertoapp.backend.domain.service.PostService;
import br.com.ficaespertoapp.backend.infrastructure.persistence.entity.Post;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post/v1")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getPostsByCategory(@PathVariable String category) {
        try {
            PostCategory postCategory = PostCategory.valueOf(category.toUpperCase());
            List<Post> posts = postService.findAllPostsByCategory(postCategory);
            return ResponseEntity.ok(posts);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid category: " + category);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
        try {
            List<Post> posts = postService.findAllPosts();
            return ResponseEntity.ok(posts);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        try {
            return postService.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Post deleted successfully");
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> savePost(@RequestBody PostDTO post) {
        try {
            Post savedPost = postService.saveDto(post);
            return ResponseEntity.ok(savedPost);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(exception.getMessage());
        }
    }
}
