package com.simple.community.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.mapper.UserMapper;

@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	public Map<String, Object> getOne(Map<String, Object> params){
		return userMapper.getOne(params);
	}
}
