package com.hcmute.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hcmute.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>{
	CategoryEntity findOneByCode(String code);
	Page<CategoryEntity> findByState(Boolean state, Pageable pageable);
	List<CategoryEntity> findByState(Boolean state);
}
