package com.hcmute.service;

import java.util.List;

import com.hcmute.dto.CategoryDTO;

public interface CategoryService {
	CategoryDTO save(CategoryDTO dto);
	CategoryDTO findOne(Long id);
	List<CategoryDTO> findAll();
}
