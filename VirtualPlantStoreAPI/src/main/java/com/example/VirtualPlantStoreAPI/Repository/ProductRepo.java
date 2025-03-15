package com.example.VirtualPlantStoreAPI.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.VirtualPlantStoreAPI.Entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{

	List<Product> findByAvailability(String availability);
	
}
