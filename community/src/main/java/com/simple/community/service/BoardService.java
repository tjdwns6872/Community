package com.simple.community.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.FileUtil;
import com.simple.community.commons.PagingInfo;
import com.simple.community.entity.BoardDto;
import com.simple.community.mapper.BoardMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private FileUtil fileUtil;
	
	public Map<String, Object> boardList(Map<String, Object> params){
		Map<String, Object> result = new HashMap<>();
		
		Integer cnt = boardMapper.boardListCnt(params);
		PagingInfo pagination = new PagingInfo(Integer.parseInt(params.get("page").toString()));
		pagination.setTotalRecordCount(cnt);
		
		params.put("firstRecordIndex", pagination.getFirstRecordIndex());
		params.put("lastRecordIndex", pagination.getLastRecordIndex());
		log.info("\n\n{}\n\n", params.toString());
		List<BoardDto> boardList = boardMapper.boardList(params);
		
		result.put("cnt", cnt);
		result.put("boardList", boardList);
		result.put("paging", pagination);
		
		return result;
	}
	
	@Transactional
	public int boardReg(Map<String, Object> params, HttpSession session) {
		String base64File = params.get("uploadFile").toString();
		String fileName = params.get("fileName").toString();
		
		int fileNo = fileUtil.fileChange(base64File, fileName, 1);
		
		log.info("\n\n{}\n\n", fileNo);
		
		params.put("userNo", session.getAttribute("user_no"));
		params.put("fileNo", fileNo);
//		int cnt = boardMapper.boardInsert(params);
		int cnt = 1;
		return cnt;
	}
	
	public BoardDto boardDetiles(Map<String, Object> params) {
		return boardMapper.boardDetiles(params);
	}
	
	@Transactional
	public int boardDelete(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		return boardMapper.boardDelete(params);
	}
	
	@Transactional
	public int boardUpdate(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		int cnt = boardMapper.boardUpdate(params);
		return cnt;
	}
	
	
}




