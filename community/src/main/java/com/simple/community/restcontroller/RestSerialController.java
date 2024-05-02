package com.simple.community.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.entity.EmailDto;
import com.simple.community.entity.UserDto;
import com.simple.community.service.EmailSerialService;


@RestController
@RequestMapping("/rest/serial")
public class RestSerialController {

	@Autowired
	private EmailSerialService emailSerialService;
	
	@PutMapping("/insert")
	public int inser(@RequestBody EmailDto emailDto) throws Exception {
		return emailSerialService.insert(emailDto);
	}
	
	@GetMapping("/findData")
	public UserDto findData(EmailDto emailDto) throws Exception {
		return emailSerialService.findData(emailDto);
	}
	
	@GetMapping("/checkSerial")
	public int checkSerial(@ModelAttribute EmailDto emailDto) {
		return emailSerialService.checkSerial(emailDto);
	}
}
