package com.simple.community.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

	Integer boardListCnt();
	int boardInsert(Map<String, Object> params);
}
