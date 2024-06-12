package com.simple.community.admin.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.admin.mapper.AdminUserMapper;
import com.simple.community.admin.service.AdminUserService;

@Service
public class AdminUserServiceImpl implements AdminUserService{

	@Autowired
	private AdminUserMapper UserMapper;

	@Override
	public String testSql() {
		return UserMapper.testSql();
	}
}
