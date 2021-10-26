package com.hcmute.service;

import java.util.List;

import com.hcmute.dto.ProductDTO;

public interface ProductService {
	ProductDTO save(ProductDTO dto);
	ProductDTO findOne(long id);
	List<ProductDTO> findAll();
}
