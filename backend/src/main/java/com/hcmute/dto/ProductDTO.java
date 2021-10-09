package com.hcmute.dto;

public class ProductDTO extends BaseDTO<ProductDTO>{
	private String name;
	private String image;
	private String description; 
	private int discount;
	private float rate;
	private int numberReviewers;
	public ProductDTO() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public float getRate() {
		return rate;
	}
	public void setRate(float rate) {
		this.rate = rate;
	}
	public int getNumberReviewers() {
		return numberReviewers;
	}
	public void setNumberReviewers(int numberReviewers) {
		this.numberReviewers = numberReviewers;
	}
	
}
