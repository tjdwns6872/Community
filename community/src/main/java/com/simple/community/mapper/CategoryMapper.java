package com.simple.community.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.CategoryDto;

@Mapper
public interface CategoryMapper {

	CategoryDto categoryList();
}
