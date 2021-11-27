package com.hcmute.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.api.response.RewardResponse;
import com.hcmute.dto.RewardDTO;
import com.hcmute.service.RewardService;

@RestController
public class RewardAPI {
	
	@Autowired
	private RewardService rewardService;
	
	@PostMapping("/api/admin/reward")
	public ResponseEntity<RewardDTO> save(@RequestBody RewardDTO rewardDTO) {
		return ResponseEntity.ok(rewardService.save(rewardDTO));
	}
	
	@GetMapping(value = "/api/info/reward")
	public ResponseEntity<List<RewardDTO>> findAll() {
		return ResponseEntity.ok(rewardService.findAll());
	}
	
	@GetMapping(value = "/api/info/reward", params = "code")
	public ResponseEntity<RewardDTO> findOneByCode(@RequestParam(name = "code") String code) {
		return ResponseEntity.ok(rewardService.findOneByCode(code));
	}
	
	@GetMapping("/api/staff/reward")
	public ResponseEntity<RewardResponse> findAll(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size", required = false, defaultValue = "10000") int size) {
		Pageable pageable = new PageRequest(page - 1, size);
		return ResponseEntity.ok(rewardService.findAll(pageable));
	}
	
}
