package com.simple.community.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.mapper.BoardMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	public Map<String, Object> boardList(Map<String, Object> params){
		Map<String, Object> result = new HashMap<>();
		
		Integer cnt = boardMapper.boardListCnt();
		log.info("\n\n{}\n\n", cnt);
		
		return result;
	}
}




