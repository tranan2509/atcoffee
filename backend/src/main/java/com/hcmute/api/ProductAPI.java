package com.hcmute.api;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmute.api.response.ProductResponse;
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
	public ResponseEntity<ProductDTO> save(@RequestParam(value="file", required=false) MultipartFile multipartFile, @RequestParam("product") String productJson) {
		try {
			ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);	
			if (multipartFile != null) {
				Map r = this.cloudinary.uploader().upload(multipartFile.getBytes(),
		                  ObjectUtils.asMap("resource_type", "auto"));
				String img = (String) r.get("secure_url");
		        product.setImage(img);
			}
	        product = productService.save(product);
			return ResponseEntity.ok(product);
		} catch (Exception e) {
			return ResponseEntity.ok(null);
		}
	}
	
	@GetMapping("/api/info/product/{id}")
	public ResponseEntity<ProductDTO> findOne(@PathVariable(name = "id") long id) {
		return ResponseEntity.ok(productService.findOne(id));
	}
	
	@GetMapping(value = "/api/info/product", params = "code")
	public ResponseEntity<ProductDTO> findOneByCode(@RequestParam(name = "code") String code) {
		return ResponseEntity.ok(productService.findOneByCode(code));
	}
	
	@GetMapping(value = "/api/info/product/count", params = "category")
	public ResponseEntity<Integer> countByCategoryCode(@RequestParam(name = "category") String categoryCode) {
		return ResponseEntity.ok(productService.countByCategoryCode(categoryCode));
	}
	
	@GetMapping("/api/info/product") 
	public ResponseEntity<ProductResponse> findAll(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size") int size, @RequestParam(name = "store", required = false) String storeCode,
			@RequestParam(name="category", required = false) String categoryCode,
			@RequestParam(name = "keyword", required = false) String keyword) {
		
		ProductResponse result  = new ProductResponse();
		Pageable pageable = new PageRequest(page - 1, size);
		if (storeCode == "" && categoryCode == "" && keyword == "") {
			result = productService.findAll(pageable);
		} else {
			if (storeCode != "" && categoryCode != "") {
				result = productService.findByStoreCodeAndCategoryCodeAndKeyword(storeCode, categoryCode, keyword, pageable);
			} else if (storeCode != "") {
				result = productService.findByStoreCodeAndKeyword(storeCode, keyword, pageable);
			} else if (categoryCode != "") {
				result = productService.findByCategoryCodeAndKeyword(categoryCode, keyword, pageable);
			} else {
				result = productService.findByKeyword(keyword, pageable);
			}
		}
		return ResponseEntity.ok(result);
	}
}
