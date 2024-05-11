package com.simple.community.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.mapper.BoardMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	public Map<String, Object> boardList(Map<String, Object> params){
		Map<String, Object> result = new HashMap<>();
		
		Integer cnt = boardMapper.boardListCnt();
		result.put("cnt", cnt);
		
		return result;
	}
	
	@Transactional
	public int boardReg(Map<String, Object> params, HttpSession session) {
		
		params.put("userNo", session.getAttribute("user_no"));
		int cnt = boardMapper.boardInsert(params);
		
		return cnt;
	}
}




