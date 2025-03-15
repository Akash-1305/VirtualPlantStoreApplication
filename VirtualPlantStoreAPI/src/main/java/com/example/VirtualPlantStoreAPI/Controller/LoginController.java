package com.example.VirtualPlantStoreAPI.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.VirtualPlantStoreAPI.Dto.LoginDTO;
import com.example.VirtualPlantStoreAPI.Repository.AdminRepo;
import com.example.VirtualPlantStoreAPI.Repository.UserRepo;

@RestController
@CrossOrigin("*")

public class LoginController {
	@Autowired
	public UserRepo userRepo;

	@Autowired
	public AdminRepo adminRepo;

	@PostMapping("/LoginVerify")
	public ResponseEntity<?> loginVerify(@RequestBody LoginDTO obj) {
		if (obj.getUserType().equals("admin")) {
			var admin = adminRepo.findByEmail(obj.getEmail()).orElseThrow(() -> new RuntimeException("Admin Not Found"));
			if (admin.getPassword().equals(obj.getPassword())) {
				return new ResponseEntity<>("admin", HttpStatus.OK);
			} else {
				throw new RuntimeException("Invalid Password");
			}
		} else if (obj.getUserType().equals("user")) {
			var user = userRepo.findByEmail(obj.getEmail()).orElseThrow(() -> new RuntimeException("User Not Found"));
			if (user.getStatus().equals("Blocked")) {
				throw new RuntimeException("User Blocked");
			} else if (user.getPassword().equals(obj.getPassword())) {
				return new ResponseEntity<>("user", HttpStatus.OK);
			}

			else {
				throw new RuntimeException("Invalid Password");
			}
		} else {
			throw new RuntimeException("Invalid User Type");
		}
	}
}

