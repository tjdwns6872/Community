package com.simple.community.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.mapper.LikeMapper;

@Service
public class LikeService {
	
	@Autowired
	private LikeMapper likeMapper;

}
