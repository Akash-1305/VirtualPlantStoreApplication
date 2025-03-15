package com.example.VirtualPlantStoreAPI.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.VirtualPlantStoreAPI.Entity.Product;
import com.example.VirtualPlantStoreAPI.Repository.ProductRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/Products")
public class ProductController {

	@Autowired
	private ProductRepo productRepo;

	@PostMapping("/AddProducts")
	public ResponseEntity<?> addProducts(@RequestBody Product obj) {
		obj.setAvailability("In Stock");
		productRepo.save(obj);
		return new ResponseEntity<>("Products added successfully", HttpStatus.OK);

	}

	@GetMapping("/GetAllProducts")
	public ResponseEntity<?> getAllProducts() {
		return new ResponseEntity<>(productRepo.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/GetProducts")
	public ResponseEntity<?> getProducts(@RequestParam(required = false) String availability) {
	    if ("Out of Stock".equals(availability)) {
	        return null;
	    } else {
	        return new ResponseEntity<>(productRepo.findByAvailability("In Stock"), HttpStatus.OK);
	    }
	}

	@DeleteMapping("/DeleteProducts/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
		Product obj = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
		productRepo.delete(obj);
		return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
	}

	@PutMapping("/UpdateProduct/{id}")
	public ResponseEntity<?> updateProduct (@PathVariable Integer id,@RequestBody Product obj){
		Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product Not Found"));
		product.setName(obj.getName());
		product.setPrice(obj.getPrice());
		product.setAvailability(obj.getAvailability());
		product.setDescription(obj.getDescription());
		product.setCategory(obj.getCategory());
		if(!obj.getImage().isEmpty()) {
			product.setImage(obj.getImage());
		}
		productRepo.save(product);
		return new ResponseEntity<>("Product updated successfuly",HttpStatus.OK);
	}
}