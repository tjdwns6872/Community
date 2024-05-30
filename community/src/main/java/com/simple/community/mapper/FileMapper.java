package com.simple.community.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.FileDto;

@Mapper
public interface FileMapper {
	
	Integer fileInsert(Map<String, Object> params);

	FileDto selectFile(Map<String, Object> params);
}
