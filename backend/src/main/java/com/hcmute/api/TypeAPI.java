package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.TypeDTO;
import com.hcmute.service.TypeService;

@RestController
public class TypeAPI {
	
	@Autowired
	private TypeService typeService;
	
	@PostMapping("api/info/type")
	public ResponseEntity<TypeDTO> add( @RequestBody TypeDTO dto){
		dto = typeService.save(dto);
		return ResponseEntity.ok(dto);
	}
}
