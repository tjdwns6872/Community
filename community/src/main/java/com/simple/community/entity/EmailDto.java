package com.simple.community.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class EmailDto {
	private String userId; //수신자 아이디
	private String userEmail; //수신자 이메일
    private String title; //메일 제목
    private String message; //메일 내용
    private String serial; //인증코드
    private Date regDate; //인증 시간
}
