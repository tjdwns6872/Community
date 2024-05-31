package com.simple.community.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.EmailSendMessage;
import com.simple.community.commons.ShaUtil;
import com.simple.community.entity.UserDto;
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
	
	public Map<String, Object> getOne(UserDto userDto, String type, HttpSession session){
		log.info("\n\n\n{}\n\n\n", userDto.toString());
		UserDto map = userMapper.getOne(userDto);
		Map<String, Object> params = new HashMap<>();
		if(type.equals("login")) {
			boolean result = login(userDto, map.getUserPw(), map.getUserId());
			params.put("result", 0);
			if(result) {
				params.put("result", 1);
				session.setAttribute("user_no", map.getUserNo());
				session.setAttribute("user_rank", map.getUserRank());
			}
		}
		return params;
	}
	
	public UserDto getOne(HttpSession session){
		UserDto userDto = new UserDto();
		UserDto map = userMapper.getOne(userDto);
		return map;
	}
	
	public String changePw(UserDto userDto) {
		String changePw = ShaUtil.randomString();
		log.info("\n\n{}\n\n", changePw);
		String pw = ShaUtil.sha256Encode(changePw);
		userDto.setUserPw(pw);
		int cnt = userMapper.changePw(userDto);
		if(cnt > 0) {			
			return changePw;
		}else {
			return null;
		}
	}
	
	public int deleteUser(Integer userNo, HttpSession session) {
		int cnt = userMapper.deleteUser(userNo);
		if(cnt > 0) {
			session.removeAttribute("user_no");
		}
		return cnt;
	}
	
	public boolean login(UserDto userDto, String password, String id) {
		boolean check = false;
		try {
			String checkPw = ShaUtil.sha256Encode(userDto.getUserPw());
			if(id.equals(userDto.getUserId()) && password.equals(checkPw)) { 
				check = true; 
			}
			 
		}catch (Exception e) {
			check = false;
		}
		return check;
	}
	
	public void logout(HttpSession session) {
		session.invalidate();
	}
	
	public void find() {
		SendMessage.sendMessage(null);
	}
	
	public int userCheck(UserDto userDto) {
		return userMapper.userCheck(userDto);
	}
	
	@Transactional
	public int userJoin(UserDto userDto){
		try {
			String password = ShaUtil.sha256Encode(userDto.getUserPw());
			userDto.setUserPw(password);
			int check = userMapper.userJoin(userDto);
			return check;
		} catch (Exception e) {
			return -1;
		}
	}
}
