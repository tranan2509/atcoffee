package com.hcmute.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmute.api.response.StoreResponse;
import com.hcmute.dto.StoreDTO;
import com.hcmute.service.StoreService;

@RestController
public class StoreAPI {

	@Autowired
	private StoreService storeService;
	@Autowired
	private ObjectMapper objectMapper;
	
	@GetMapping("/api/info/store/{id}")
	public ResponseEntity<StoreDTO> findOne(@PathVariable(name = "id") long id){
		return ResponseEntity.ok(storeService.findOne(id));
	}
	
	@RequestMapping(value = "/api/info/store", params = "code", method = RequestMethod.GET)
	public ResponseEntity<StoreDTO> findBy(@RequestParam(name = "code") String code){
		return ResponseEntity.ok(storeService.findOneByCode(code));
	}
	
	@GetMapping("/api/info/store")
	public ResponseEntity<List<StoreDTO>> findAll(){
		return ResponseEntity.ok(storeService.findAll());
	}
	
	@GetMapping("/api/user/store")
	public ResponseEntity<StoreResponse> findAll(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size") int size){
		Pageable pageable = new PageRequest(page - 1, size);
		return ResponseEntity.ok(storeService.findAll(pageable));
	}
	
	@PostMapping("/api/admin/store")
	public ResponseEntity<StoreDTO> save(@RequestParam("store") String storeJson){
		try {
			StoreDTO storeDTO = objectMapper.readValue(storeJson, StoreDTO.class);	
			return ResponseEntity.ok(storeService.save(storeDTO));
		} catch (Exception e) {
			return ResponseEntity.ok(null);
		}
	}
}
