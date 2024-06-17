package com.simple.community.admin.serviceimpl;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.admin.mapper.AdminUserMapper;
import com.simple.community.admin.service.AdminUserService;
import com.simple.community.commons.AjaxResult;
import com.simple.community.commons.ShaUtil;
import com.simple.community.entity.UserDto;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AdminUserServiceImpl implements AdminUserService{

	@Autowired
	private AdminUserMapper adminUserMapper;
	
	private AjaxResult ajaxResult = new AjaxResult();
	
	@Override
	public Map<String, Object> getOne(Map<String, Object> params) {
		
		Map<String, Object> result = new HashMap<>();
		HttpSession session = (HttpSession) params.get("session");
		try {
			UserDto data = adminUserMapper.getOne(params);
			ajaxResult.createError("아이디 혹은 비밀번호가 틀렸습니다.");
			if(!Objects.isNull(data)) {
				boolean check = login(data, params.get("password").toString(), params.get("userId").toString());
				if(check) {
					ajaxResult.createSuccess(data);
					session.setAttribute("userNo", data.getUserNo());
					session.setAttribute("userNo", data.getUserRank());
				}
			}
		}catch (Exception e) {
			//Exception 처리 조금 더 공부하고 진행
			log.error("{}", e);
			ajaxResult.createFail(e);
		}
		result.put("result", ajaxResult.getResult());
		return result;
	}
	
	public boolean login(UserDto userDto, String password, String id) {
		String checkPw = ShaUtil.sha256Encode(password);
		boolean check = id.equals(userDto.getUserId()) && checkPw.equals(userDto.getUserPw());
		
		return check;
	}
}
