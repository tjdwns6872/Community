package com.simple.community.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.simple.community.entity.ReplyDto;

@Mapper
public interface ReplyMapper {

	Integer replyReg(Map<String, Object> params);
	
	List<ReplyDto> replyList(Map<String, Object> params);
	
	Integer replyDelete(Map<String, Object> params);
	
	ReplyDto replyDetiles(Map<String, Object> params);
	
	Integer replyUpdate(Map<String, Object> params);
}
