package com.hcmute.api;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hcmute.dto.CategoryDTO;
import com.hcmute.dto.RoleDTO;
import com.hcmute.dto.StoreDTO;
import com.hcmute.dto.TypeDTO;
import com.hcmute.dto.UserDTO;
import com.hcmute.service.CategoryService;
import com.hcmute.service.RoleService;
import com.hcmute.service.StoreService;
import com.hcmute.service.TypeService;
import com.hcmute.service.UserService;

@RestController
public class InitializationAPI {
	
	@Autowired 
	private StoreService storeService;
	@Autowired
	private TypeService typeService;
	@Autowired
	private RoleService roleService;
	@Autowired
	private UserService userService;
	@Autowired 
	private CategoryService categoryService;
	
	
	@PostMapping("/api/initialization")
	public ResponseEntity<Boolean> initialization(){
		boolean flag = true;
		try {
			if (storeService.findAll().isEmpty()) {
				StoreDTO store = new StoreDTO("A&T Coffee", "Thủ Đức, Hồ Chí Minh", "8:00", "23:00");
				storeService.save(store);
				store = new StoreDTO("A&T Coffee", "Quận 2, Hồ Chí Minh", "8:00", "23:00");
				storeService.save(store);
			}
			if (typeService.findAll().isEmpty()) {
				TypeDTO type = new TypeDTO("Đồng", 10000);
				typeService.save(type);
				type = new TypeDTO("Vàng", 50000);
				typeService.save(type);
				type = new TypeDTO("Bạch Kim", 125000);
				typeService.save(type);
			}
			if (roleService.findAll().isEmpty()) {
				RoleDTO role = new RoleDTO("ROLE_ADMIN", "ADMIN");
				roleService.save(role);
				role = new RoleDTO("ROLE_STAFF", "STAFF");
				roleService.save(role);
				role = new RoleDTO("ROLE_USER", "USER");
				roleService.save(role);
			}
			if(categoryService.findAll().isEmpty()) {
				CategoryDTO category = new CategoryDTO("COFFEE", "Cà phê");
				categoryService.save(category);
				category = new CategoryDTO("MILKTEA", "Trà sữa");
				categoryService.save(category);
				category = new CategoryDTO("DRINK", "Đồ uống");
				categoryService.save(category);
			}
			if (userService.findAll().isEmpty()) {
				Date dob = new Date();
				UserDTO user = new UserDTO("admin", "admin", "https://res.cloudinary.com/tranan2509/image/upload/v1635433632/logo_hvnmwc.png", "Admin", "01692889894", "Name",
						"admin@gmail.com", "9 Trình Hoài Đức, Quận 9", dob, "215523098", 1L, "ADMIN");
				userService.save(user);
			}
		}catch (Exception e) {
			flag = false;
		}
		return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
	}
}
