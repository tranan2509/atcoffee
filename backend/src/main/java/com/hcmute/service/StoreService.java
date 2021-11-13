package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hcmute.api.response.StoreResponse;
import com.hcmute.dto.StoreDTO;


public interface StoreService {
	StoreDTO save(StoreDTO storeDTO);
	StoreDTO findOne(Long id);
	StoreDTO findOneByCode(String code);
	List<StoreDTO> findAll();
	StoreResponse findAll(Pageable pageable);
}
