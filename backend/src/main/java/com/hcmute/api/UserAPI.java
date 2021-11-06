package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.api.request.PasswordRequest;
import com.hcmute.api.response.UserResponse;
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
	
	@GetMapping("/api/info/reset-password")
	public ResponseEntity<Boolean> resetPassowrd(@RequestParam(value = "email") String email){
		return ResponseEntity.ok(userService.resetPassword(email));
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
	
	@GetMapping("/api/admin/user") 
	public ResponseEntity<UserResponse> findAll(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size") int size, @RequestParam(name = "store", required = false) String storeCode,
			@RequestParam(name="role", required = false) String roleName,
			@RequestParam(name="state", required=false) String stateString,
			@RequestParam(name = "keyword", required = false) String keyword) {
		
		UserResponse result  = new UserResponse();
		Pageable pageable = new PageRequest(page - 1, size);
		if (storeCode == "" && roleName == "" && keyword == "") {
			result = userService.findByKeyword(keyword, pageable);
		} else {
			if (storeCode != "" && roleName != "" && stateString != "") {
				Boolean state = stateString.equalsIgnoreCase("true");
				result = userService.findByStoreCodeAndRoleNameAndStateAndKeyword(storeCode, roleName, state, keyword, pageable);
			}	
			else if (storeCode != "" && roleName != "") {
				result = userService.findByStoreCodeAndRoleNameAndKeyword(storeCode, roleName, keyword, pageable);
			} else if (storeCode != "") {
				result = userService.findByStoreCodeAndKeyword(storeCode, keyword, pageable);
			} else if (roleName != "") {
				result = userService.findByRoleNameAndKeyword(roleName, keyword, pageable);
			} else {
				result = userService.findByKeyword(keyword, pageable);
			}
		}
		return ResponseEntity.ok(result);
	}
}
