package com.hcmute.service;

import java.util.List;

import com.hcmute.dto.StoreDTO;


public interface StoreService {
	StoreDTO save(StoreDTO storeDTO);
	StoreDTO findOne(Long id);
	List<StoreDTO> findAll();
}
