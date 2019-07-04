package com.yash.ppmtool.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class MapValidationService {
	
	public ResponseEntity<?> errorMapValidation(BindingResult result){
		if (result.hasErrors()) {
			
			Map<String, String> errormap= new HashMap<>();
			for (FieldError fieldError : result.getFieldErrors()) {
				errormap.put(fieldError.getField(), fieldError.getDefaultMessage());
				
			}
			return new ResponseEntity<Map<String,String>>(errormap,HttpStatus.BAD_REQUEST);
		}
		return null;
	}
	

}
