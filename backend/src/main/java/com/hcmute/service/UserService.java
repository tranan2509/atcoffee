package com.hcmute.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.hcmute.dto.UserDTO;

public interface UserService extends UserDetailsService{
	UserDTO save(UserDTO userDTO);
	UserDTO findOneByUsername(String username);
	UserDTO findOne(Long id);
	List<UserDTO> findAll();
}
