package com.example.VirtualPlantStoreAPI.Controller;

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

import com.example.VirtualPlantStoreAPI.Entity.User;
import com.example.VirtualPlantStoreAPI.Repository.UserRepo;

@RestController
@RequestMapping("/Users")
@CrossOrigin("*")

public class UserController {
	@Autowired
	private UserRepo userRepo;

	@PostMapping("/AddUser")
	public String addUser(@RequestBody User obj) {
		if (userRepo.existsByEmail(obj.getEmail())) {
			return("Email id already registerd");
		} else if (userRepo.existsByMobile(obj.getMobile())) {
			return("Mobile number already registerd");
		} else {
			userRepo.save(obj);
			return("User Added successfully ");
		}
	}
	
	@GetMapping("/GetUser/{userid}")
	public ResponseEntity<?> getUser(@PathVariable String userid){
		User user = userRepo.findByEmail(userid).orElseThrow(() -> new RuntimeException("User not found"));
		return new ResponseEntity<>(user, HttpStatus.OK);
		
	}
	
	@GetMapping("/GetAllUsers")
	public ResponseEntity<?> getUsers (){
		return new ResponseEntity<>(userRepo.findAll(), HttpStatus.OK);
	}
	
	@PutMapping("/UpdateStatus/{id}")
	public String updateStatus(@PathVariable("id") Integer Id, @RequestBody User obj) {
		User user = userRepo.findById(Id).orElseThrow(() -> new RuntimeException("User Not Found"));
		user.setStatus(obj.getStatus());
		userRepo.save(user);
		return("Status Updated Successfully");	
	}
}