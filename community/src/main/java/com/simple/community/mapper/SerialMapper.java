package com.simple.community.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.EmailDto;

@Mapper
public interface SerialMapper {
	int insertSerial(EmailDto emailDto);
	int checkSerial(EmailDto emailDto);
	int deleteSerial(EmailDto emailDto);
}
