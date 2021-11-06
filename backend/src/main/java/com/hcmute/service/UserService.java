package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.hcmute.api.request.PasswordRequest;
import com.hcmute.api.response.UserResponse;
import com.hcmute.dto.UserDTO;

public interface UserService extends UserDetailsService{
	UserDTO save(UserDTO userDTO);
	UserDTO updatePassword(PasswordRequest passwordRequest);
	Boolean resetPassword(String email);
	UserDTO findOneByUsername(String username);
	UserDTO findOne(Long id);
	List<UserDTO> findAll();
	UserResponse findByKeyword(String keyword, Pageable pageable);
	UserResponse findByStoreCodeAndKeyword(String storeCode,  String keyword, Pageable pageable);
	UserResponse findByRoleNameAndKeyword(String roleName,  String keyword, Pageable pageable);
	UserResponse findByStoreCodeAndRoleNameAndKeyword(String storeCode, String roleName, String keyword, Pageable pageable);
	UserResponse findByStoreCodeAndRoleNameAndStateAndKeyword(String storeCode, String roleName, Boolean state, String keyword, Pageable pageable);
}
