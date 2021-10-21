package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.CategoryDTO;
import com.hcmute.entity.CategoryEntity;
import com.hcmute.repository.CategoryRepository;
import com.hcmute.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Override
	public CategoryDTO save(CategoryDTO dto) {
		CategoryEntity entity = mapper.map(dto, CategoryEntity.class);
		entity = categoryRepository.save(entity);
		return mapper.map(entity, CategoryDTO.class);
	}

	@Override
	public CategoryDTO findOne(Long id) {
		return mapper.map(categoryRepository.findOne(id), CategoryDTO.class);
	}

	@Override
	public List<CategoryDTO> findAll() {
		List<CategoryDTO> dtos = new ArrayList<CategoryDTO>();
		List<CategoryEntity> entities = categoryRepository.findAll();
		entities.forEach(entity -> dtos.add(mapper.map(entity, CategoryDTO.class)));
		return dtos;
	}
}
