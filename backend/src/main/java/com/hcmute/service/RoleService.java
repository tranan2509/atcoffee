package com.hcmute.service;

import com.hcmute.dto.RoleDTO;

public interface RoleService {
	RoleDTO findOne(Long id);
	RoleDTO save(RoleDTO roleDTO);
}
