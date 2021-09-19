package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.StoreDTO;
import com.hcmute.service.StoreService;

@RestController
public class StoreAPI {

	@Autowired
	private StoreService storeService;
	
	@PostMapping("api/info/store")
	public ResponseEntity<StoreDTO> add(StoreDTO dto){
		dto = storeService.save(dto);
		return ResponseEntity.ok(dto);
	}
}
