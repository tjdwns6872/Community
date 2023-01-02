package com.kh.soloproject.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class UserDto {
	private String userId;
	private String userPw;
	private String userName;
	private Date userBirth;
	private String userGender;
	private String userEmail;
	private String userTel;
	private String userBlurb;
	private String userRank;
	private Date userStartDate;
}








