package com.hcmute.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, Long>{
	
	List<BillEntity> findByCreatedDateBetweenAndStatus(Date start, Date end, String status);
	List<BillEntity> findByCreatedDateGreaterThanEqualAndCreatedDateLessThanEqualAndStatus(Date start, Date end, String status);
}
