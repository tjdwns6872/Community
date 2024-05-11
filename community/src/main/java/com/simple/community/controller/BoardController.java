package com.simple.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/board")
public class BoardController {

	@RequestMapping("/list")
	public String main() {
		return "board/list";
	}
	
	@RequestMapping("/reg")
	public String reg() {
		return "board/registration";
	}
	
	@RequestMapping("/details")
	public String details() {
		return "board/details";
	}
	
}
