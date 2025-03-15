package com.example.VirtualPlantStoreAPI.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.VirtualPlantStoreAPI.Entity.Orders;
import com.example.VirtualPlantStoreAPI.Entity.User;

public interface OrdersRepo extends JpaRepository<Orders, String> {

	List<Orders> findByUser(User user);
}

