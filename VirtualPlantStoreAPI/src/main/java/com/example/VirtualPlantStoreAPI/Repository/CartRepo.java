package com.example.VirtualPlantStoreAPI.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.VirtualPlantStoreAPI.Entity.Cart;
import com.example.VirtualPlantStoreAPI.Entity.Product;
import com.example.VirtualPlantStoreAPI.Entity.User;

public interface CartRepo extends JpaRepository<Cart, Integer>{
	Optional<Cart> findByUserAndProduct(User user, Product product); 
	
	List<Cart> findByUser(User users);
	
	@Override
	void deleteAll(Iterable<? extends Cart> entities);
}
