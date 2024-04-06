package com.simple.community.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.entity.EmailDto;
import com.simple.community.service.EmailSerialService;


@RestController
@RequestMapping("/rest/serial")
public class RestSerialController {

	@Autowired
	private EmailSerialService emailSerialService;
	
	@PutMapping("/insert")
	public int inser(@RequestBody EmailDto emilDto) {
		return emailSerialService.insert(emilDto);
	}
}
