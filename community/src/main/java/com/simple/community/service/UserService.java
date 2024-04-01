package com.simple.community.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.ShaUtil;
import com.simple.community.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	public Map<String, Object> getOne(Map<String, Object> params){
		return userMapper.getOne(params);
	}
	
	@Transactional
	public int userJoin(Map<String, Object> params){
		log.info("\n\nparams: {}",params.toString());
		try {
			String password = ShaUtil.sha256Encode(params.get("user_pw").toString());
			params.put("user_pw", password);
			int check = userMapper.userJoin(params);
			return check;
		} catch (Exception e) {
			return -1;
		}
	}
}
