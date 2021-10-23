package com.hcmute.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.CategoryDTO;
import com.hcmute.service.CategoryService;

@RestController
public class CategoryAPI {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/api/admin/category")
	public ResponseEntity<CategoryDTO> save(CategoryDTO category) {
		CategoryDTO dto = categoryService.save(category);
		return ResponseEntity.ok(dto);
	}
	
	@PutMapping("/api/admin/category")
	public ResponseEntity<CategoryDTO> update(CategoryDTO category) {
		CategoryDTO dto = categoryService.save(category);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/api/info/category/{id}")
	public ResponseEntity<CategoryDTO> findOne(@PathVariable(name = "id") Long id) {
		CategoryDTO dto = categoryService.findOne(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/api/info/category")
	public ResponseEntity<List<CategoryDTO>> findAll() {
		List<CategoryDTO> dtos = categoryService.findAll();
		return ResponseEntity.ok(dtos);
	}
}
