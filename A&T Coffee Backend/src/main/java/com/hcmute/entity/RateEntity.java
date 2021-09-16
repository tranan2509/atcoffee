package com.hcmute.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "rate")
public class RateEntity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(columnDefinition = "TEXT")
	private String comment;
	private int star;
	private boolean state;
	
	public RateEntity() {
		super();
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getStar() {
		return star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
	
}
