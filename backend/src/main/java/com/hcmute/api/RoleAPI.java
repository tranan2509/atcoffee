package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.RoleDTO;
import com.hcmute.service.RoleService;

@RestController
public class RoleAPI {
	@Autowired
	private RoleService roleService;
	
	@PostMapping("/api/admin/role")
	public ResponseEntity<RoleDTO> add(@RequestBody RoleDTO dto){
		dto = roleService.save(dto);
		return ResponseEntity.ok(dto);
	}
}
