package com.hcmute.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name = "product")
public class ProductEntity extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	private String name;
	private String image;
	private float price;
	private int discount;
	
	@ManyToMany(mappedBy = "products", fetch = FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<CategoryEntity> categories = new ArrayList<>();

	@ManyToMany(mappedBy = "products", fetch = FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	private List<StoreEntity> stores = new ArrayList<>();

	@OneToMany(mappedBy = "product")
	private List<BillDetailEntity> billDetails = new ArrayList<BillDetailEntity>();
	
	@OneToMany(mappedBy = "product")
	private List<RateEntity> rates = new ArrayList<>();

	public ProductEntity() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public List<CategoryEntity> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryEntity> categories) {
		this.categories = categories;
	}

	public List<BillDetailEntity> getBillDetails() {
		return billDetails;
	}

	public void setBillDetails(List<BillDetailEntity> billDetails) {
		this.billDetails = billDetails;
	}

	public List<StoreEntity> getStores() {
		return stores;
	}

	public void setStores(List<StoreEntity> stores) {
		this.stores = stores;
	}

	public List<RateEntity> getRates() {
		return rates;
	}

	public void setRates(List<RateEntity> rates) {
		this.rates = rates;
	}

	
}
