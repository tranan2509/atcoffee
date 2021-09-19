package com.hcmute.dto;

import java.time.LocalTime;

public class StoreDTO extends BaseDTO<StoreDTO>{
	private String name;
	private String address;
	private LocalTime timeOpen;
	private LocalTime timeClose;
	
	public StoreDTO() {
		super();
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public LocalTime getTimeOpen() {
		return timeOpen;
	}
	public void setTimeOpen(LocalTime timeOpen) {
		this.timeOpen = timeOpen;
	}
	public LocalTime getTimeClose() {
		return timeClose;
	}
	public void setTimeClose(LocalTime timeClose) {
		this.timeClose = timeClose;
	}
	
}
