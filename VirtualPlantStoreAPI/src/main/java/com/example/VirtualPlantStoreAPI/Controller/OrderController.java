package com.example.VirtualPlantStoreAPI.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.VirtualPlantStoreAPI.Entity.Orders;
import com.example.VirtualPlantStoreAPI.Entity.Product;
import com.example.VirtualPlantStoreAPI.Entity.User;
import com.example.VirtualPlantStoreAPI.Repository.OrdersRepo;
import com.example.VirtualPlantStoreAPI.Repository.UserRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/Orders")

public class OrderController {
	@Autowired
	private UserRepo userRepo;

	@Autowired
	private OrdersRepo ordersRepo;

	@PostMapping("/CreateOrder/{userid}")
	public ResponseEntity<?> CreateOrder(@RequestBody Orders orders, @PathVariable String userid) {
		User user = userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User not found"));
		orders.setId(UUID.randomUUID().toString().split("-")[0].toUpperCase());
		orders.setUser(user);
		orders.setDate(LocalDate.now());
		orders.setStatus("Placed");
		List<Product> product = new ArrayList<>();
		orders.getCart().forEach(cart -> {
			product.add(cart.getProduct());
		});
		orders.setProduct(product);
		Orders savedOrder = ordersRepo.save(orders);
		System.out.println(savedOrder);
		return new ResponseEntity<>("Success", HttpStatus.OK);
	}

	@GetMapping("/GetAllOrdersByUser/{userid}")
	public ResponseEntity<?> getAllOrdersByUser(@PathVariable String userid) {
		User user = userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User not found"));
		return new ResponseEntity<>(ordersRepo.findByUser(user), HttpStatus.OK);
	}

	@GetMapping("/GetAllOrders")
	public ResponseEntity<?> getAllOrders() {
		return new ResponseEntity<>(ordersRepo.findAll(), HttpStatus.OK);
	}

	@PutMapping("/UpdateStatus/{id}")
	public ResponseEntity<?> updateStatus(@RequestBody Orders orders, @PathVariable String id) {
		Orders order = ordersRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		if (order.getStatus().equals("Cancelled")) {
			throw new RuntimeException("Order already cancelled");
		} else {
			order.setStatus(orders.getStatus());
			ordersRepo.save(order);
			return new ResponseEntity<>("Order " + orders.getStatus() + " successfully", HttpStatus.OK);
		}
	}

	@PutMapping("/AddRatings/{id}/{rating}")
	public ResponseEntity<?> updateStatus(@PathVariable String id, @PathVariable Integer rating) {
		Orders order = ordersRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
		order.setRating(rating);
		ordersRepo.save(order);
		return new ResponseEntity<>("Order rated successfully", HttpStatus.OK);
	}
}
