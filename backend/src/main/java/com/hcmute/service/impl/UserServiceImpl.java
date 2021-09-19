package com.hcmute.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hcmute.dto.UserDTO;
import com.hcmute.entity.RoleEntity;
import com.hcmute.entity.StoreEntity;
import com.hcmute.entity.TypeEntity;
import com.hcmute.entity.UserEntity;
import com.hcmute.repository.RoleRepository;
import com.hcmute.repository.StoreRepository;
import com.hcmute.repository.TypeRepository;
import com.hcmute.repository.UserRepository;
import com.hcmute.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private StoreRepository storeRepository;
	@Autowired
	private TypeRepository typeRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findOneByUsername(username);
		 if (userEntity == null){
	            throw new UsernameNotFoundException("User does not exist!!!");
	        }
		Set<GrantedAuthority> auth = new HashSet<>();
		auth.add(new SimpleGrantedAuthority(userEntity.getRole().getCode()));
		return new User(userEntity.getUsername(), userEntity.getPassword(), auth);
	}

	@Override
	public UserDTO save(UserDTO userDTO) {
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		StoreEntity storeEntity = new StoreEntity();
		TypeEntity typeEntity = new TypeEntity();
		if (userDTO.getStoreId() != null) {
			storeEntity = storeRepository.findOne(userDTO.getStoreId());
			typeEntity = null;
		}else {
			if (userDTO.getTypeId() != null) {
				typeEntity = typeRepository.findOne(userDTO.getId());
				storeEntity = null;
			}
		}
		
		RoleEntity roleEntity = roleRepository.findOneByName(userDTO.getRoleName());
		UserEntity userEntity = mapper.map(userDTO, UserEntity.class);
		userEntity.setRole(roleEntity);
		if (storeEntity != null)
			userEntity.setStore(storeEntity);
		if (typeEntity != null)
			userEntity.setType(typeEntity);
		userRepository.save(userEntity);
		return mapper.map(userEntity, UserDTO.class);
	}

	@Override
	public UserDTO findOneByUsername(String username) {
		return mapper.map(userRepository.findOneByUsername(username), UserDTO.class);
	}

}
