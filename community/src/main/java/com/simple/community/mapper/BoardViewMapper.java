package com.simple.community.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardViewMapper {
    void boardViewInsert(Map<String, Object> params);
    Integer viewUserCheck(Map<String, Object> params);
}
