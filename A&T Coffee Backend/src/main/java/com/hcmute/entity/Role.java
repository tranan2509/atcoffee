package com.hcmute.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role extends BaseEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false)
	private String code;
	private String name;
	
	@OneToMany(mappedBy = "role")
	List<UserEntity> users = new ArrayList<>();
	
	public Role() {
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
