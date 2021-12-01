package com.hcmute.api;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@PutMapping(value = "/api/staff/bill", params = "status") 
	public ResponseEntity<BillDTO> updateStatus(@RequestBody BillDTO billDTO) {
		return ResponseEntity.ok(billService.updateStatus(billDTO));
	}
	
	@GetMapping(value = "/api/staff/bill/statistics", params = {"startDate", "endDate"})
	public ResponseEntity<List<BillDTO>> findByDate(@RequestParam(name = "startDate") Date startDate, 
			@RequestParam(name = "endDate") Date endDate,
			@RequestParam(name = "status", required = false, defaultValue = "COMPLETED") String status) {
		return ResponseEntity.ok(billService.findByBetweenDate(startDate, endDate, status));
	}
}
