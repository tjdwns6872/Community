package com.simple.community.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class BoardDto {

	private Integer boardNo;
	private Integer categoryNo;
	private Integer userNo;
	private String boardTitle;
	private String boardContent;
	private Integer regId;
	private Date regDate;
	private Integer modId;
	private Date modDate;
	private String delFg;
	
	//카테고리
	private String categoryName;
	
	//유저 아이디
	private String userId;
}
