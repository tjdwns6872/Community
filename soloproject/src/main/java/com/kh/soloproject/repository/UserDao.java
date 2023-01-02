package com.kh.soloproject.repository;

import java.util.List;

import com.kh.soloproject.entity.UserDto;

public interface UserDao {
	List<UserDto> userList();
	String userIdConfirm(String userId);
	void join(UserDto userDto);
}
