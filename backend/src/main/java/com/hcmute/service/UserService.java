package com.hcmute.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.hcmute.dto.UserDTO;

public interface UserService extends UserDetailsService{
	UserDTO save(UserDTO userDTO);
	UserDTO findOneByUsername(String username);
}
