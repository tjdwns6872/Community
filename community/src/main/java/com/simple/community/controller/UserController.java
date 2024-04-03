package com.simple.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

	@RequestMapping("login")
	public String login() {
		return "user/login";
	}
	
	@RequestMapping("join")
	public String userJoin() {
		return "user/join";
	}
}
