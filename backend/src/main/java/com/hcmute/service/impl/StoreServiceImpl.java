package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.StoreDTO;
import com.hcmute.entity.StoreEntity;
import com.hcmute.repository.StoreRepository;
import com.hcmute.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService {

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private StoreRepository storeRepository;

	@Override
	public StoreDTO save(StoreDTO storeDTO) {
		StoreEntity entity = mapper.map(storeDTO, StoreEntity.class);
		entity = storeRepository.save(entity);
		return mapper.map(entity, StoreDTO.class);
	}

	@Override
	public StoreDTO findOne(Long id) {
		return mapper.map(storeRepository.findOne(id), StoreDTO.class);
	}

	@Override
	public List<StoreDTO> findAll() {
		List<StoreDTO> dtos = new ArrayList<StoreDTO>();
		List<StoreEntity> entities = storeRepository.findAll();
		entities.forEach(entity -> dtos.add(mapper.map(entity, StoreDTO.class)));
		return dtos;
	}

}
