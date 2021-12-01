package com.hcmute.service;

import java.sql.Date;
import java.util.List;

import com.hcmute.dto.BillDTO;

public interface BillService {
	BillDTO save(BillDTO billDTO);
	BillDTO updateStatus(BillDTO billDTO);
	List<BillDTO> findByBetweenDate(Date start, Date end, String status);
}
