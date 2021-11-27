package com.hcmute.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.hcmute.api.response.RewardResponse;
import com.hcmute.dto.RewardDTO;

public interface RewardService {
	
	RewardDTO save(RewardDTO rewardDTO);
	List<RewardDTO> findAll();
	RewardDTO findOneByCode(String code);
	RewardResponse findAll(Pageable pageable);
}
