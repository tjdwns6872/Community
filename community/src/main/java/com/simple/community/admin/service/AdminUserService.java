package com.simple.community.admin.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;

@Service
public interface AdminUserService {
	Map<String, Object> getOne(Map<String, Object> params);
}
