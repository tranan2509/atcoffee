package com.hcmute.service;

import java.util.List;

import com.hcmute.dto.CartDTO;

public interface CartService {
	CartDTO save(CartDTO cartDTO);
	List<CartDTO> findByCustomerId(Long id);
	void delete(Long id);
	boolean deleteByUserId(Long userId);
}
