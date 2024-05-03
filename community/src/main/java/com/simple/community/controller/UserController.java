package com.simple.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/user")
public class UserController {

	@RequestMapping("/login")
	public String login() {
		return "user/login";
	}
	
	@RequestMapping("/join")
	public String userJoin() {
		return "user/join";
	}
	
	@RequestMapping("/find")
	public String find() {
		return "user/find";
	}
	
	@RequestMapping("/mypage")
	public String mypage(HttpSession session, Model model) {
		model.addAttribute("user_no", session.getAttribute("user_no"));
		return "user/mypage";
	}
}
