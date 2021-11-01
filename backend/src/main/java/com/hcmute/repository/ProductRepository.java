package com.hcmute.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hcmute.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>{
	Page<ProductEntity> findByNameContainingOrCodeContaining(String name, String code,  Pageable pageable);
	@Query("select p from ProductEntity p left join p.stores as s where s.id = ?1 AND (p.name like %?2% OR p.code LIKE %?2%)")
	Page<ProductEntity> findByStoreIdAndKeyword(Long storeId, String keyword, Pageable pageable);
	@Query("select p from ProductEntity p left join p.categories as c where c.id = ?1 AND (p.name LIKE %?2% OR p.code LIKE %?2%)")
	Page<ProductEntity> findByCategoryIdAndKeyword(Long categoryId, String keyword, Pageable pageable);
	@Query("select p from ProductEntity p left join p.stores as s left join p.categories as c where s.id = ?1 AND c.id = ?2 AND (p.name LIKE %?3% OR p.code LIKE %?3%)")
	Page<ProductEntity> findByStoreIdAndCategoryIdAndKeyword(Long storeId, Long categoryId, String keyword, Pageable pageable);
}
