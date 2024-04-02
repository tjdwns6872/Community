package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.service.UserService;

@RestController
@RequestMapping("/rest/user")
public class RestUserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/getOne")
	public Map<String, Object> getOne(@RequestParam Map<String, Object> params){
		return userService.getOne(params);
	}
	
	@PutMapping("/join")
	public int userJoin(@RequestBody Map<String, Object> params) {
		return userService.userJoin(params);
	}
}
