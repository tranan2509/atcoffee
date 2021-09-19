package com.hcmute.dto;

public class PaymentDTO extends BaseDTO<PaymentDTO>{
	private String name;

	public PaymentDTO() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
