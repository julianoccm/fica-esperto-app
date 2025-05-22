package br.com.ficaespertoapp.backend.infrastructure.webapi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts/v1")
public class PostsController {

    @GetMapping
    public ResponseEntity<String> getAllPosts() {
        return ResponseEntity.ok("OK");
    }
}
