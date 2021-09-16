package com.hcmute.entity;

import java.io.Serializable;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "store")
public class StoreEntity extends BaseEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String name;
	private String address;
	private LocalTime timeOpen;
	private LocalTime timeClose;
	
	public StoreEntity() {
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
