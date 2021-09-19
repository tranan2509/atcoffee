package com.hcmute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.StoreEntity;

public interface StoreRepository extends JpaRepository<StoreEntity, Long>{
	
}
