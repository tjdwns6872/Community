package com.simple.community.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.entity.ReplyDto;
import com.simple.community.mapper.ReplyMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ReplyService {
	
	@Autowired
	private ReplyMapper replyMapper;

	@Transactional
	public int replyReg(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		log.info("replyReg/params====>{}", params.toString());
		return replyMapper.replyReg(params);
	}
	
	public List<ReplyDto> replyList(Map<String, Object> params){
		return replyMapper.replyList(params);
	}
	
	@Transactional
	public int replyDelete(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		return replyMapper.replyDelete(params);
	}
	
	public ReplyDto replyDetiles(Map<String, Object> params) {
		return replyMapper.replyDetiles(params);
	}
}




