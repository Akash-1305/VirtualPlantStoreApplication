package com.example.VirtualPlantStoreAPI.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.VirtualPlantStoreAPI.Entity.Cart;
import com.example.VirtualPlantStoreAPI.Entity.Product;
import com.example.VirtualPlantStoreAPI.Entity.User;
import com.example.VirtualPlantStoreAPI.Repository.CartRepo;
import com.example.VirtualPlantStoreAPI.Repository.ProductRepo;
import com.example.VirtualPlantStoreAPI.Repository.UserRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/Cart")
public class CartController {
	
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	
	@PostMapping("/AddUpdateCart/{userid}/{productid}")
	public ResponseEntity<?> createorUpadateCart(@PathVariable String userid, @PathVariable Integer productid){
		User user= userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User Not Found"));
		Product product= productRepo.findById(productid).orElseThrow(() -> new RuntimeException("Product Not Found"));
		Optional<Cart> optionalCart= cartRepo.findByUserAndProduct(user, product);
		if (optionalCart.isPresent()) {
			Cart cart= optionalCart.get();
			cart.setQuantity(cart.getQuantity() + 1);
			cartRepo.save(cart);
			return new ResponseEntity<>("Quntity Incresed", HttpStatus.OK);
		}else {
			Cart cart= new Cart();
			cart.setUser(user);
			cart.setProduct(product);
			cart.setQuantity(1);
			cartRepo.save(cart);
			return new ResponseEntity<>("Product Added to Cart", HttpStatus.OK);
		}
	}
	
	@GetMapping("/getCartByUser/{userid}")
	public ResponseEntity<?> GetCartByUser(@PathVariable String userid){
		User user= userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User Not Found"));
		return new ResponseEntity<>(cartRepo.findByUser(user), HttpStatus.OK);
	}
	
	@PutMapping("/DecreaseProduct/{userid}/{productid}")
	public ResponseEntity<?> DecreaseProduct(@PathVariable String userid, @PathVariable Integer productid){
		User user= userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User Not Found"));
		Product product= productRepo.findById(productid).orElseThrow(() -> new RuntimeException("Product Not Found"));
		Optional<Cart> optionalCart= cartRepo.findByUserAndProduct(user, product);
		if (optionalCart.isPresent()) {
			Cart cart= optionalCart.get();
			cart.setQuantity(cart.getQuantity() - 1);
			cartRepo.save(cart);
			return new ResponseEntity<>("Quntity Decresed", HttpStatus.OK);
		}else {
			cartRepo.delete(optionalCart.get());
			return new ResponseEntity<>("Item deleted from Cart", HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/DeleteItem/{userid}/{productid}")
	public ResponseEntity<?> DeleteItem(@PathVariable String userid, @PathVariable Integer productid){
		User user= userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User Not Found"));
		Product product= productRepo.findById(productid).orElseThrow(() -> new RuntimeException("Product Not Found"));
		Cart optionalCart= cartRepo.findByUserAndProduct(user, product).orElseThrow(() -> new RuntimeException("Item Not Found"));;
		cartRepo.delete(optionalCart);
		return new ResponseEntity<>("Item deleted from Cart", HttpStatus.OK);
	}
	
	@DeleteMapping("/DeleteCart/{userid}")
	public ResponseEntity<?> DeleteCart(@PathVariable String userid){
		User user= userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User Not Found"));
		List<Cart> cart= cartRepo.findByUser(user);
		cartRepo.deleteAll(cart);
		return new ResponseEntity<>("Cart Cleared", HttpStatus.OK);
	}
	

}
