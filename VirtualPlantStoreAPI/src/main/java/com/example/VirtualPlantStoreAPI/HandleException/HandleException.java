package com.example.VirtualPlantStoreAPI.HandleException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HandleException {
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleException(RuntimeException runtimeException){
		return new ResponseEntity<>(runtimeException.getMessage(), HttpStatus.BAD_REQUEST);
	}

}
