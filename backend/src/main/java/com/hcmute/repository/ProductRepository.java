package com.hcmute.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>{

}
