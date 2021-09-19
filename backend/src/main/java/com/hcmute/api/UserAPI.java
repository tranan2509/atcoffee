package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.UserDTO;
import com.hcmute.service.UserService;

@RestController
public class UserAPI {
	@Autowired
	private UserService userService;
	
	@PostMapping("api/login/user")
	public ResponseEntity<UserDTO> signUp(UserDTO userDTO){
		userDTO = userService.save(userDTO);
		return ResponseEntity.ok(userDTO);
	}
}
