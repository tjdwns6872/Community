package com.simple.community.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.mapper.TestMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TestService {

	@Autowired
	public TestMapper testMapper;
	
	public Map<String, Object> testMybatis(){
		return testMapper.testMybatis();
	}
}
