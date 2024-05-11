package com.simple.community.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.CategoryDto;

@Mapper
public interface CategoryMapper {

	List<CategoryDto> categoryList();
}
