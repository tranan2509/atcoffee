package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
		entity.setState(true);
		entity = productRepository.save(entity);
		if (entity.getId() != null)
		{
			List<StoreEntity> stores = storeRepository.findAll();
			for (int i = 0; i < stores.size(); i++) {
				stores.get(i).getProducts().removeIf(product -> product.getId() == dto.getId());
			}
			storeRepository.save(stores);
			List<CategoryEntity> categories = categoryRepository.findAll();
			for (int j = 0; j < categories.size(); j++) {
				categories.get(j).getProducts().removeIf(product -> product.getId() == dto.getId());
			}
			categoryRepository.save(categories);
		}
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

	@Override
	public List<ProductDTO> findAll(Pageable pageable) {
		List<ProductEntity> entities = productRepository.findAll(pageable).getContent();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

	@Override
	public int countItem() {
		return (int)productRepository.count();
	}

	@Override
	public List<ProductDTO> findByStoreCodeAndKeyword(String storeCode, Pageable pageable) {
		StoreEntity store = storeRepository.findOneByCode(storeCode);
		List<ProductEntity> entities = productRepository.findByStoreIdAndKeyword(store.getId(), pageable).getContent();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

	@Override
	public List<ProductDTO> findByCategoryCodeAndKeyword(String categoryCode, Pageable pageable) {
		CategoryEntity category = categoryRepository.findOneByCode(categoryCode);
		List<ProductEntity> entities = productRepository.findByCategoryIdAndKeyword(category.getId(), pageable).getContent();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

	@Override
	public List<ProductDTO> findByStoreCodeAndCategoryCodeAndKeyword(String storeCode, String categoryCode, Pageable pageable) {
		StoreEntity store = storeRepository.findOneByCode(storeCode);
		CategoryEntity category = categoryRepository.findOneByCode(categoryCode);
		List<ProductEntity> entities = productRepository.findByStoreIdAndCategoryIdAndKeyword(store.getId(), category.getId(), pageable).getContent();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

	@Override
	public List<ProductDTO> findByKeyword(String keyword, Pageable pageable) {
		List<ProductEntity> entities = productRepository.findByNameContainingOrCodeContaining(keyword, keyword, pageable).getContent();
		List<ProductDTO> dtos = new ArrayList<ProductDTO>();
		entities.forEach(entity -> dtos.add(mapper.map(entity, ProductDTO.class)));
		return dtos;
	}

}
