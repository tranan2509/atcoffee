package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hcmute.dto.ProductDTO;

public interface ProductService {
	ProductDTO save(ProductDTO dto);
	ProductDTO findOne(long id);
	List<ProductDTO> findAll();
	List<ProductDTO> findAll(Pageable pageable);
	List<ProductDTO> findByKeyword(String keyword, Pageable pageable);
	List<ProductDTO>findByStoreCodeAndKeyword(String storeCode , Pageable pageable);	
	List<ProductDTO>findByCategoryCodeAndKeyword(String categoryCode , Pageable pageable);
	List<ProductDTO>findByStoreCodeAndCategoryCodeAndKeyword(String storeCode, String categoryCode, Pageable pageable);
	int countItem();
}
