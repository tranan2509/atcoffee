package com.hcmute.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.RoleDTO;
import com.hcmute.entity.RoleEntity;
import com.hcmute.repository.RoleRepository;
import com.hcmute.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService{

	@Autowired
	private ModelMapper mapper;
	@Autowired RoleRepository roleReponsitory;
	
	@Override
	public RoleDTO findOne(Long id) {
		return mapper.map(roleReponsitory.findOne(id), RoleDTO.class);
	}

	@Override
	public RoleDTO save(RoleDTO roleDTO) {
		RoleEntity entity = mapper.map(roleDTO, RoleEntity.class);
		return mapper.map(roleReponsitory.save(entity), RoleDTO.class);
	}

}
