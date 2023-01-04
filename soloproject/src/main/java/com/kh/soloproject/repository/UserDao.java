package com.kh.soloproject.repository;

import com.kh.soloproject.entity.UserDto;

public interface UserDao {
	
	String userIdConfirm(String userId); // 아이디가 존재하는지 확인하는 메소드
	
	void join(UserDto userDto); // 회원가입 메소드(insert)
	
	UserDto login(UserDto userDto); // 로그인 메소드
	
	boolean passwordChange(UserDto userDto);
}
