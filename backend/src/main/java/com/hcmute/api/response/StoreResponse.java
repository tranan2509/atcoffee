package com.hcmute.api.response;

import com.hcmute.dto.StoreDTO;
import com.hcmute.dto.UserDTO;

public class StoreResponse {
	private StoreDTO store;
	private UserDTO user;
	
	public StoreResponse(StoreDTO store, UserDTO user) {
		super();
		this.store = store;
		this.user = user;
	}

	public StoreDTO getStore() {
		return store;
	}

	public void setStore(StoreDTO store) {
		this.store = store;
	}

	public UserDTO getUser() {
		return user;
	}

	public void setUser(UserDTO user) {
		this.user = user;
	}
	
}
