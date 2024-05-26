package com.simple.community.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
	
	Integer fileInsert(Map<String, Object> params);

}
