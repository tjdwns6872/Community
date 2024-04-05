package com.simple.community.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.EmailSendMessage;
import com.simple.community.commons.ShaUtil;
import com.simple.community.mapper.UserMapper;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private EmailSendMessage SendMessage;
	
	public Map<String, Object> getOne(Map<String, Object> params, HttpSession session){
		Map<String, Object> map = userMapper.getOne(params);
		if(params.get("type").equals("login")) {
			params.put("map", map);
			boolean result = login(params);
			map.put("result", 0);
			if(result) {
				map.put("result", 1);
				session.setAttribute("user_no", map.get("USER_NO"));
			}
		}
		return map;
	}
	
	public boolean login(Map<String, Object> params) {
		boolean check = false;
		try {
			Map<String, Object> map = (Map<String, Object>) params.get("map");
			String password = ShaUtil.sha256Encode(params.get("user_pw").toString());
			if(map.get("USER_ID").equals(params.get("user_id")) && map.get("USER_PW").equals(password)) { 
				check = true; 
			}
			 
		}catch (Exception e) {
			check = false;
		}
		return check;
	}
	
	public void logout(HttpSession session) {
		session.removeAttribute("user_no");
	}
	
	public void find() {
		SendMessage.sendMessage(null);
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
