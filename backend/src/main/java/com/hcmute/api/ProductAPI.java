package com.hcmute.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmute.dto.ProductDTO;
import com.hcmute.service.ProductService;

@RestController
public class ProductAPI {
	
	@Autowired
	private Cloudinary cloudinary;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private ProductService productService;
	
	
	@PostMapping("/api/admin/product")
	public ResponseEntity<ProductDTO> testProduct(@RequestParam("file") MultipartFile multipartFile, @RequestParam("product") String productJson) {
		try {
			ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);	
			Map r = this.cloudinary.uploader().upload(multipartFile.getBytes(),
	                  ObjectUtils.asMap("resource_type", "auto"));
			String img = (String) r.get("secure_url");
	        product.setImage(img);
	        product = productService.save(product);
			return ResponseEntity.ok(product);
			
		} catch (Exception e) {
			return ResponseEntity.ok(null);
		}
	}
}
