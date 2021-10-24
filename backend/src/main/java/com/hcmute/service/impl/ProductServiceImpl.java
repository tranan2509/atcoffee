package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.ProductDTO;
import com.hcmute.dto.SizeDTO;
import com.hcmute.entity.CategoryEntity;
import com.hcmute.entity.ProductEntity;
import com.hcmute.entity.SizeEntity;
import com.hcmute.repository.ProductRepository;
import com.hcmute.repository.SizeRepository;
import com.hcmute.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private SizeRepository sizeRepository;
	
	@Override
	public ProductDTO save(ProductDTO dto) {
		ProductEntity entity = mapper.map(dto, ProductEntity.class);
		List<CategoryEntity> categories = new ArrayList<CategoryEntity>();
		dto.getCategories().forEach(category -> mapper.map(category, CategoryEntity.class));
		entity.setCategories(categories);
//		List<StoreEntity> stores = new ArrayList<StoreEntity>();
//		for (StoreDTO store: dto.getStores()) {
//			
//		}
//		entity.setStores(stores);
		entity = productRepository.save(entity);
		List<SizeEntity> sizes = new ArrayList<SizeEntity>();
		for (SizeDTO size: dto.getSizes()){
			SizeEntity sizeEntity = mapper.map(size, SizeEntity.class);
			sizeEntity.setProduct(entity);
			sizeEntity.setState(true);
			sizes.add(sizeEntity);
		};
		sizes = sizeRepository.save(sizes);
		entity.setSizes(sizes);
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
		entities.forEach(entity -> dtos.add(mapper.map(entities, ProductDTO.class)));
		return dtos;
	}

}
