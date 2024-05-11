package com.simple.community.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public String details(@RequestParam Map<String, Object> params, Model model) {
		model.addAttribute("params", params);
		return "board/details";
	}
	
}
