package com.simple.community.admin.restcontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.admin.service.AdminUserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/adm/user")
public class AdminUserController {

	@Autowired
	private AdminUserService UserService;
	
	@GetMapping("/login")
	public Map<String, Object> login(@RequestParam Map<String, Object> params, HttpSession session){
		params.put("session", session);
		return UserService.getOne(params);
	}
	
	@GetMapping("/test")
	public Map<String, Object> test(HttpSession session){
		Map<String, Object> test = new HashMap<>();
		test.put("userNo", session.getAttribute("userNo"));
		return test;
	}
}
