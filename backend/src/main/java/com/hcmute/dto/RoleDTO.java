package com.hcmute.dto;

public class RoleDTO extends BaseDTO<RoleDTO>{
	
	private String code;
	private String name;
	
	public RoleDTO() {
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
