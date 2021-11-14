package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hcmute.api.response.ProductResponse;
import com.hcmute.dto.ProductDTO;

public interface ProductService {
	ProductDTO save(ProductDTO dto);
	ProductDTO findOne(long id);
	ProductDTO findOneByCode(String code);
	int countByCategoryCode(String categoryCode);
	List<ProductDTO> findAll();
	ProductResponse  findAll(Pageable pageable);
	ProductResponse  findByKeyword(String keyword, Pageable pageable);
	ProductResponse findByStoreCodeAndKeyword(String storeCode, String keyword , Pageable pageable);	
	ProductResponse findByCategoryCodeAndKeyword(String categoryCode, String keyword , Pageable pageable);
	ProductResponse findByStoreCodeAndCategoryCodeAndKeyword(String storeCode, String categoryCode, String keyword, Pageable pageable);
	int countItem();
}
