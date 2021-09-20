package com.hcmute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.UserEntity;

public interface UserReposity extends JpaRepository<UserEntity, Long>{
	
}
