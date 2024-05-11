package com.simple.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.entity.CategoryDto;
import com.simple.community.mapper.CategoryMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CategoryService {

	@Autowired
	private CategoryMapper categoryMapper;
	
	public List<CategoryDto> categoryList(HttpSession session) {
		
		Integer rank = (Integer) session.getAttribute("user_rank");
		log.info("\n\n{}\n\n", rank);
		return categoryMapper.categoryList(rank);
	}
	
}





