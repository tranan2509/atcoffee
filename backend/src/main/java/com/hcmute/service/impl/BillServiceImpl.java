package com.hcmute.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hcmute.dto.BillDTO;
import com.hcmute.dto.BillDetailDTO;
import com.hcmute.entity.BillDetailEntity;
import com.hcmute.entity.BillEntity;
import com.hcmute.entity.PaymentEntity;
import com.hcmute.entity.ProductEntity;
import com.hcmute.entity.PromotionEntity;
import com.hcmute.entity.RewardEntity;
import com.hcmute.entity.StoreEntity;
import com.hcmute.entity.UserEntity;
import com.hcmute.repository.BillDetailRepository;
import com.hcmute.repository.BillRepository;
import com.hcmute.repository.PaymentRepository;
import com.hcmute.repository.ProductRepository;
import com.hcmute.repository.PromotionRepository;
import com.hcmute.repository.RewardRepository;
import com.hcmute.repository.StoreRepository;
import com.hcmute.repository.UserRepository;
import com.hcmute.service.BillService;

@Service
public class BillServiceImpl implements BillService{
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private BillRepository billRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StoreRepository storeRepository;
	@Autowired
	private RewardRepository rewardRepository;
	@Autowired
	private PromotionRepository promotionRepository;
	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private BillDetailRepository billDetailRepository;

	@Override
	public BillDTO save(BillDTO billDTO) {
		List<BillDetailDTO> billDetailDTOs = billDTO.getBillDetails();
		billDTO.setBillDetails(new ArrayList<BillDetailDTO>());
		BillEntity entity = mapper.map(billDTO, BillEntity.class);
		UserEntity staff = userRepository.findOne(billDTO.getStaffId());
		UserEntity customer = userRepository.findOne(billDTO.getCustomerId());
		RewardEntity reward = rewardRepository.findOne(billDTO.getRewardId());
		PromotionEntity promotion = promotionRepository.findOne(billDTO.getPromotionId());
		PaymentEntity payment = paymentRepository.findOne(billDTO.getPaymentId());
		StoreEntity store = storeRepository.findOne(billDTO.getStoreId());
		entity.setStaff(staff);
		entity.setCustomer(customer);
		entity.setReward(reward);
		entity.setPromotion(promotion);
		entity.setPayment(payment);
		entity.setStore(store);
		entity = billRepository.save(entity);
		List<BillDetailEntity> billDetailEntities = new ArrayList<BillDetailEntity>();
		for (int i = 0; i < billDetailDTOs.size(); i++) {
			BillDetailDTO billDetailDTO = billDetailDTOs.get(i);
			BillDetailEntity billDetailEntity = mapper.map(billDetailDTO, BillDetailEntity.class);
			ProductEntity productEntity = productRepository.findOne(billDetailDTO.getProductId());
			billDetailEntity.setBill(entity);
			billDetailEntity.setState(true);
			billDetailEntity.setProduct(productEntity);
			billDetailEntities.add(billDetailEntity);
		}
		billDetailEntities = billDetailRepository.save(billDetailEntities);
		entity.setBillDetails(billDetailEntities);
		return mapper.map(entity, BillDTO.class);
	}

}
