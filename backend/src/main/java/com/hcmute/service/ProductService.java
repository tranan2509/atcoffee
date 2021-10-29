package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hcmute.dto.ProductDTO;

public interface ProductService {
	ProductDTO save(ProductDTO dto);
	ProductDTO findOne(long id);
	List<ProductDTO> findAll();
	List<ProductDTO> findAll(Pageable pageable);
	int countItem();
}
