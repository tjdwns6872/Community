package com.simple.community.admin.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.admin.service.AdminUserService;

@RestController
@RequestMapping("/rest/adm/user")
public class AdminUserController {

	@Autowired
	private AdminUserService UserService;
	
	@GetMapping("/list")
	public String list(){
		return UserService.testSql();
	}
}
