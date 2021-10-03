package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.UserDTO;
import com.hcmute.service.UserService;
import com.hcmute.util.ConstantsUtil;

@RestController
public class UserAPI {
	@Autowired
	private UserService userService;
	
	@GetMapping("/api/user/authenticate")
	public ResponseEntity<UserDTO> authenticate(){
		UserDTO user = ConstantsUtil.userDTO;
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/api/login/user")
	public ResponseEntity<UserDTO> signUp(@RequestBody UserDTO userDTO){
		userDTO.setRoleName("USER");
		userDTO = userService.save(userDTO);
		return ResponseEntity.ok(userDTO);
	}
	
	@PostMapping("/api/admin/user")
	public ResponseEntity<UserDTO> add(@RequestBody UserDTO userDTO){
		userDTO = userService.save(userDTO);
		return ResponseEntity.ok(userDTO);
	}
}
