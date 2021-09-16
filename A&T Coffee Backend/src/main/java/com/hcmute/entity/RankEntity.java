package com.hcmute.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "rank")
public class RankEntity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String name;
	private int point;
	private boolean state;
	
	public RankEntity() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPoint() {
		return point;
	}

	public void setPoint(int point) {
		this.point = point;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
	
}
