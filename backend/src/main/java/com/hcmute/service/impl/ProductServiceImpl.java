package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.CategoryDTO;
import com.hcmute.dto.ProductDTO;
import com.hcmute.dto.StoreDTO;
import com.hcmute.entity.CategoryEntity;
import com.hcmute.entity.ProductEntity;
import com.hcmute.entity.StoreEntity;
import com.hcmute.repository.CategoryRepository;
import com.hcmute.repository.ProductRepository;
import com.hcmute.repository.StoreRepository;
import com.hcmute.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StoreRepository storeRepository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	
	@Override
	public ProductDTO save(ProductDTO dto) {
		ProductEntity entity = mapper.map(dto, ProductEntity.class);
		entity = productRepository.save(entity);
		for (StoreDTO storeDTO : dto.getStores()) {
			StoreEntity storeEntity = storeRepository.findOne(storeDTO.getId());
			storeEntity.getProducts().add(entity);
			storeRepository.save(storeEntity);
		}
		for (CategoryDTO categoryDTO : dto.getCategories()) {
			CategoryEntity categoryEntity = categoryRepository.findOne(categoryDTO.getId());
			categoryEntity.getProducts().add(entity);
			categoryRepository.save(categoryEntity);
		}
		return mapper.map(entity, ProductDTO.class);
	}

	@Override
	public ProductDTO findOne(long id) {
		return mapper.map(productRepository.findOne(id), ProductDTO.class);
	}

	@Override
	public List<ProductDTO> findAll() {
		List<ProductEntity> entities = productRepository.findAll();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

}
