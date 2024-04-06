package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.service.TestService;

@RestController
public class TestController {

	@Autowired
	public TestService testService;
	
	@GetMapping("/test1")
	public Map<String, Object> test(){
		Map<String, Object> map = testService.testMybatis();
		System.out.println(map);
		return map;
	}
}
