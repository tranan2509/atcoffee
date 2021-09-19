package com.hcmute.dto;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class UserDTO extends BaseDTO<UserDTO>{
	private String username; 
	private String password;
	private String name;
	private String phone;
	private String gender;
	private String email;
	//Staff 
	@Temporal(TemporalType.TIMESTAMP)
	private Date dob;
	private String indentityCard;
	private Long storeId;
//	Customer
	private int accumulatedPoints;
	private int currentPoints;
	private Long typeId;
	
	private String roleName;
	
	public UserDTO() {
		super();
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getIndentityCard() {
		return indentityCard;
	}
	public void setIndentityCard(String indentityCard) {
		this.indentityCard = indentityCard;
	}
	public Long getStoreId() {
		return storeId;
	}
	public void setStoreId(Long storeId) {
		this.storeId = storeId;
	}
	public int getAccumulatedPoints() {
		return accumulatedPoints;
	}
	public void setAccumulatedPoints(int accumulatedPoints) {
		this.accumulatedPoints = accumulatedPoints;
	}
	public int getCurrentPoints() {
		return currentPoints;
	}
	public void setCurrentPoints(int currentPoints) {
		this.currentPoints = currentPoints;
	}

	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
}
