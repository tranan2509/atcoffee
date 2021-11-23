package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.BillDTO;
import com.hcmute.service.BillService;

@RestController
public class BillAPI {
	
	@Autowired
	private BillService billService;
	
	@PostMapping("/api/staff/bill")
	public ResponseEntity<BillDTO> save(@RequestBody BillDTO billDTO) {
		return ResponseEntity.ok(billService.save(billDTO));
	}
}
