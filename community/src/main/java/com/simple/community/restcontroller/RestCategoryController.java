package com.simple.community.restcontroller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.service.CategoryService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/category")
public class RestCategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping("/list")
	public Map<String, Object> list(HttpSession session){
		Map<String, Object> result = new HashMap<>();
		result.put("category", categoryService.categoryList(session));
		return result;
	}

}




