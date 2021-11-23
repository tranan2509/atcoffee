package com.hcmute.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.StoreEntity;

public interface StoreRepository extends JpaRepository<StoreEntity, Long>{
	StoreEntity findOneByCode(String code);
	List<StoreEntity> findByState(Boolean state);
	Page<StoreEntity> findByState(Boolean state, Pageable pageable);
}
