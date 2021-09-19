package com.hcmute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, Long>{

}
