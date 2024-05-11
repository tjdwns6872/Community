package com.simple.community.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.entity.BoardDto;
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
		
		Integer cnt = boardMapper.boardListCnt(params);
		List<BoardDto> boardList = boardMapper.boardList(params);
		result.put("cnt", cnt);
		result.put("boardList", boardList);
		
		log.info("\n\n{}\n\n", result.toString());
		
		return result;
	}
	
	@Transactional
	public int boardReg(Map<String, Object> params, HttpSession session) {
		
		params.put("userNo", session.getAttribute("user_no"));
		int cnt = boardMapper.boardInsert(params);
		
		return cnt;
	}
	
	public BoardDto boardDetiles(Map<String, Object> params) {
		return boardMapper.boardDetiles(params);
	}
	
	@Transactional
	public int boardDelete(Map<String, Object> params) {
		log.info("\n\n{}\n\n", params.toString());
		return boardMapper.boardDelete(params);
	}
}




