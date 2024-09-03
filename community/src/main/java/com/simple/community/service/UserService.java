package com.simple.community.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.javassist.NotFoundException;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.AjaxResult;
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

	private AjaxResult ajaxResult = new AjaxResult();
	
	public Map<String, Object> getOne(UserDto userDto, String type, HttpSession session){
		log.info("\n\n\n{}\n\n\n", userDto.toString());
		UserDto map = userMapper.getOne(userDto);
		Map<String, Object> params = new HashMap<>();
		try{
			if(type == null || type.isBlank() || type.equals("check")) {
				ajaxResult.createSuccess(map);
			}else if(type.equals("login")) {
				boolean result = login(userDto, map.getUserPw(), map.getUserId());
				if(result) {
					session.setAttribute("user_no", map.getUserNo());
					session.setAttribute("user_rank", map.getUserRank());
					ajaxResult.createSuccessWithNoContent();
				}else{
					throw new MyBatisSystemException(null);
				}
			}else{
				throw new NotFoundException(null);
			}
		}catch(MyBatisSystemException e){
			ajaxResult.createError("아이디 혹은 비밀번호가 틀렸습니다.");
		}catch (NotFoundException e){
			ajaxResult.createError("잘못된 접근입니다.");
		}catch(Exception e) {
			ajaxResult.createFail(e);
		}finally{
			params.put("result", ajaxResult.getResult());
		}
		return params;
	}

	@Transactional
	public Map<String, Object> userJoin(UserDto userDto){
		Map<String, Object> params = new HashMap<>();
		try {
			log.info("\n\nuserDto===>{}", userDto);
			String password = ShaUtil.sha256Encode(userDto.getUserPw());
			userDto.setUserPw(password);
			int check = userMapper.userJoin(userDto);
			log.info("\n\n{}\n\n", check);
			if(check > 0){
				ajaxResult.createSuccessWithNoContent();
			}else{
				throw new MyBatisSystemException(null);
			}
		} catch(MyBatisSystemException e){
			log.error("{}", e);
			ajaxResult.createError("입력하신 정보를 확인해주세요.");
		} catch (Exception e) {
			log.error("{}", e);
			ajaxResult.createFail(e);
		}
		params.put("result", ajaxResult.getResult());
		return params;
	}
	
	public UserDto getOne(HttpSession session){
		UserDto userDto = new UserDto();
		userDto.setUserNo((int) session.getAttribute("user_no"));
		UserDto map = userMapper.getOne(userDto);
		return map;
	}
	
	public String changePw(UserDto userDto, String type, HttpSession session) {
		String changePw;
		if(type.equals("pwedit")){
			userDto.setUserNo((int) session.getAttribute("user_no"));
			changePw = userDto.getUserPw();
		}else{
			changePw = ShaUtil.randomString();
		}
		log.info("\n\n{}\n\n", changePw);
		String pw = ShaUtil.sha256Encode(changePw);
		userDto.setUserPw(pw);
		int cnt = userMapper.changePw(userDto);
		if(cnt > 0) {		
			session.invalidate();	
			return changePw;
		}else {
			return null;
		}
	}
	
	public int deleteUser(Integer userNo, HttpSession session) {
		int cnt = userMapper.deleteUser(userNo);
		if(cnt > 0) {
			session.invalidate();
			// session.removeAttribute("user_no");
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

	public Map<String, Object> userDataChange(UserDto userDto, HttpSession session){
		log.info("\n\n{}", userDto.toString());
		Map<String, Object> params = new HashMap<>();
		userDto.setUserNo((int) session.getAttribute("user_no"));
		try{
			int check = userMapper.userDataChange(userDto);
			if(check > 0){
				ajaxResult.createSuccessWithNoContent();
			}else{
				throw new MyBatisSystemException(null);
			}
		}catch(MyBatisSystemException e){
			ajaxResult.createError(null);
		}catch(Exception e){
			ajaxResult.createFail(e);
		}finally{
			params.put("result", ajaxResult.getResult());
		}
		return params;
	}

	public boolean passwordCheck(Map<String, Object> params, HttpSession session){
		UserDto userDto = new UserDto();
		UserDto result = new UserDto();

		result.setUserNo((int) session.getAttribute("user_no"));
		result = userMapper.getOne(result);
		userDto.setUserPw(params.get("userPw").toString());
		userDto.setUserId(result.getUserId());

		boolean check = login(userDto, result.getUserPw(), result.getUserId());
		return check;
	}
}
