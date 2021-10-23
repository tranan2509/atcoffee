package com.hcmute.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.ProductDTO;
import com.hcmute.entity.ProductEntity;
import com.hcmute.repository.ProductRepository;
import com.hcmute.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public ProductDTO save(ProductDTO dto) {
		ProductEntity entity = mapper.map(dto, ProductEntity.class);
		entity = productRepository.save(entity);
		return mapper.map(entity, ProductDTO.class);
	}

}
