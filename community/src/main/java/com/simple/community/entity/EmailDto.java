package com.simple.community.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class EmailDto {
	private String to; //수신자
    private String title; //메일 제목
    private String message; //메일 내용
}
