package com.hcmute.api;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hcmute.dto.ProductDTO;

@RestController
public class ProductAPI {
	
	@Autowired
	private Cloudinary cloudinary;
	
	
	@PostMapping("/api/admin/product")
	public ResponseEntity<Boolean> saveProduct(@RequestBody ProductDTO product) {
		MultipartFile uploadFile = product.getFile();
		try {
            Map r = this.cloudinary.uploader().upload(product.getFile().getBytes(),
                    ObjectUtils.asMap("resource_type", "auto"));
            String img = (String) r.get("secure_url");
            product.setImage(img);
        } catch (IOException ex) {
            System.err.println("Add product error " + ex.getMessage());
            ex.printStackTrace();
        }
		return ResponseEntity.ok(true);
	}
}
