package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.api.request.PasswordRequest;
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
	
	@GetMapping("/api/info/user")
	public ResponseEntity<UserDTO> findOneByUsername(@RequestParam(name = "username") String username){
		return ResponseEntity.ok(userService.findOneByUsername(username));
	}
	
	@PutMapping("/api/user/change-password")
	public ResponseEntity<UserDTO> changePassword(@RequestBody PasswordRequest passwordRequest){
		return ResponseEntity.ok(userService.updatePassword(passwordRequest));
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
