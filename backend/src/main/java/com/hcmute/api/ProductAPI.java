package com.hcmute.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmute.dto.ProductDTO;

@RestController
public class ProductAPI {
	
	@Autowired
	private Cloudinary cloudinary;
	@Autowired
	private ObjectMapper objectMapper;
	
	
//	@PostMapping("/api/admin/product")
//	public ResponseEntity<Boolean> saveProduct(@RequestBody ProductDTO product) {
//		MultipartFile uploadFile = product.getFile();
//		try {
//            Map r = this.cloudinary.uploader().upload(product.getFile().getBytes(),
//                    ObjectUtils.asMap("resource_type", "auto"));
//            String img = (String) r.get("secure_url");
//            product.setImage(img);
//        } catch (IOException ex) {
//            System.err.println("Add product error " + ex.getMessage());
//            ex.printStackTrace();
//        }
//		return ResponseEntity.ok(true);
//	}
	
	@PostMapping("/api/info/product/test")
	public String testProduct(@RequestParam("file") MultipartFile multipartFile, @RequestParam("product") String productJson) {
		try {

			ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);
		} catch (Exception e) {
			return null;
		}
//		try {
//          Map r = this.cloudinary.uploader().upload(multipartFile.getBytes(),
//                  ObjectUtils.asMap("resource_type", "auto"));
//          String img = (String) r.get("secure_url");
//          return img;
//      } catch (IOException ex) {
//          System.err.println("Add product error " + ex.getMessage());
//          ex.printStackTrace();
//      }
		return String.format("File %s uploaded successfully", multipartFile.getOriginalFilename());
	}
}
