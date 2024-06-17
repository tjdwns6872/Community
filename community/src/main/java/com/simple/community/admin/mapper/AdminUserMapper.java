package com.simple.community.admin.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.UserDto;

@Mapper
public interface AdminUserMapper {
	UserDto getOne(Map<String, Object> params);
}
