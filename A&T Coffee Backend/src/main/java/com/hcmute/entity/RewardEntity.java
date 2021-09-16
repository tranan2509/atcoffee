package com.hcmute.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "reward")
public class RewardEntity extends BaseEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String name;
	private int condition;
	private int redution;
	private boolean state;
	
	public RewardEntity() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCondition() {
		return condition;
	}

	public void setCondition(int condition) {
		this.condition = condition;
	}

	public int getRedution() {
		return redution;
	}

	public void setRedution(int redution) {
		this.redution = redution;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
	
}
