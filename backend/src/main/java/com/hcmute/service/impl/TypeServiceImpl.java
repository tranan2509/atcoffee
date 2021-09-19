package com.hcmute.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.TypeDTO;
import com.hcmute.entity.TypeEntity;
import com.hcmute.repository.TypeRepository;
import com.hcmute.service.TypeService;

@Service
public class TypeServiceImpl implements TypeService{

	@Autowired
	private ModelMapper mapper;
	@Autowired
	private TypeRepository typeRepository;
	
	@Override
	public TypeDTO save(TypeDTO typeDTO) {
		TypeEntity entity = mapper.map(typeDTO, TypeEntity.class);
		entity = typeRepository.save(entity);
		return mapper.map(entity, TypeDTO.class);
	}

	@Override
	public TypeDTO findOne(Long id) {
		// TODO Auto-generated method stub
		return mapper.map(typeRepository.findOne(id), TypeDTO.class);
	}

}
