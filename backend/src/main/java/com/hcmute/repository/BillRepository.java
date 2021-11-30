package com.hcmute.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, Long>{
	List<BillEntity> findByCreatedDateBetween(Date start, Date end);
}
