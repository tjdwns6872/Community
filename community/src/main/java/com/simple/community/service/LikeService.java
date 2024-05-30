package com.simple.community.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.mapper.LikeMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LikeService {
	
	@Autowired
	private LikeMapper likeMapper;

	@Transactional
	public int likeUpdate(Map<String, Object> params, HttpSession session) {
		params.put("userNo", session.getAttribute("user_no"));
		log.info("\n\n{}\n\n", params.toString());
		int cnt = likeMapper.likeUpdate(params);
		log.info("\n\n{}\n\n", params.toString());
		log.info("\n\n{}\n\n", cnt);
		return cnt;
	}
}
