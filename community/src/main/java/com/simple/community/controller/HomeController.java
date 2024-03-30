package com.simple.community.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.simple.community.service.TestService;

@Controller
public class HomeController {
	
	@Autowired
	public TestService testService;
	
	@RequestMapping("/")
	public String home(Model model) {
		Map<String, Object> map = testService.testMybatis();
		model.addAttribute("map", map);
		return "home";
	}
	
	@GetMapping("/test")
	@ResponseBody
	public Map<String, Object> test(){
		Map<String, Object> map = testService.testMybatis();
		System.out.println(map);
		return map;
	}
}
