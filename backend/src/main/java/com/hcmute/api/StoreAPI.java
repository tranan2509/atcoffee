package com.hcmute.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.StoreDTO;
import com.hcmute.service.StoreService;

@RestController
public class StoreAPI {

	@Autowired
	private StoreService storeService;
	
	
	@GetMapping("/api/info/store/{id}")
	public ResponseEntity<StoreDTO> findOne(@PathVariable(name = "id") long id){
		return ResponseEntity.ok(storeService.findOne(id));
	}
	
	@GetMapping("/api/info/store")
	public ResponseEntity<List<StoreDTO>> findAll(){
		return ResponseEntity.ok(storeService.findAll());
	}
	
	@PostMapping("/api/admin/store")
	public ResponseEntity<StoreDTO> save(@RequestBody StoreDTO dto){
		dto = storeService.save(dto);
		return ResponseEntity.ok(dto);
	}
}
