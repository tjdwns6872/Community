package com.simple.community.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.BoardDto;

@Mapper
public interface BoardMapper {

	Integer boardListCnt(Map<String, Object> params);
	List<BoardDto> boardList(Map<String, Object> params);
	int boardInsert(Map<String, Object> params);
	BoardDto boardDetiles(Map<String, Object> params);
	int boardDelete(Map<String, Object> params);
	int boardUpdate(Map<String, Object> params);
}
