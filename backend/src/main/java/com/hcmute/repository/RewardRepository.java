package com.hcmute.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.RewardEntity;

public interface RewardRepository extends JpaRepository<RewardEntity, Long>{
	RewardEntity findOneByCode(String code);
	Page<RewardEntity>findByNameContainingOrCodeContainingAndState(String name, String code, Boolean state, Pageable pageable);
}
