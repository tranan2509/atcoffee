package com.hcmute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity, Long>{

}
