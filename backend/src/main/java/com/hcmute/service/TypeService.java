package com.hcmute.service;

import com.hcmute.dto.TypeDTO;

public interface TypeService {
	TypeDTO save(TypeDTO typeDTO);
	TypeDTO findOne(Long id);
}
