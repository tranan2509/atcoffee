package com.hcmute.dto;

public class CategoryDTO extends BaseDTO<CategoryDTO>{
	private String code;
	private String name;
	public CategoryDTO() {
		super();
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
