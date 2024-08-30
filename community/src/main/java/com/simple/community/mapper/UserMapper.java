package com.simple.community.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.UserDto;

@Mapper
public interface UserMapper {
	
	UserDto getOne(UserDto userDto);
	int userJoin(UserDto userDto);
	int userCheck(UserDto userDto);
	int changePw(UserDto userDto);
	int deleteUser(Integer UserNo);
	int userDataChange(UserDto userDto);
}
