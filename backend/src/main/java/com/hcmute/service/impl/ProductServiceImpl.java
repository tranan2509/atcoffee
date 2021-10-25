package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.ProductDTO;
import com.hcmute.entity.ProductEntity;
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
//		List<StoreEntity> stores = entity.getStores();
//		entity.setStores(null);
//		for (StoreEntity store : stores) {
//			entity.getStores().add(store);
//			store.getProducts().add(entity);
//		}
//		
		entity = productRepository.save(entity);
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
