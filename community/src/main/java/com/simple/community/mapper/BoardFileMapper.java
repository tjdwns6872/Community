package com.simple.community.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardFileMapper {

	Integer boardFileInsert(Map<String, Object> params);
}
