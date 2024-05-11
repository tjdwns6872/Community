package com.simple.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.entity.CategoryDto;
import com.simple.community.mapper.CategoryMapper;

@Service
public class CategoryService {

	@Autowired
	private CategoryMapper categoryMapper;
	
	public List<CategoryDto> categoryList() {
		return categoryMapper.categoryList();
	}
	
}





