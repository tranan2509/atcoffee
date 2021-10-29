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
	
//	@GetMapping("/api/info/product")
//	public ResponseEntity<List<ProductDTO>> findAll() {
//		return ResponseEntity.ok(productService.findAll());
//	}
	
	@GetMapping("/api/info/product") 
	public ResponseEntity<ProductResponse> findAll(@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size") int size) {
		ProductResponse result  = new ProductResponse();
		Pageable pageable = new PageRequest(page - 1, size);
		result.setProducts(productService.findAll(pageable));
		result.setPage(page);
		result.setSize(size);
		int totalPage = (int)Math.ceil((double) productService.countItem() / size);
		result.setTotalPage(totalPage);
		return ResponseEntity.ok(result);
	}
}
