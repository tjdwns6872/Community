package com.simple.community.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class BoardDto {

	private Integer rowNum;
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
	
	//좋아요 수
	private Integer likeCnt;

	//조회수
	private Integer boardView;
	
	//카테고리
	private String categoryName;
	
	//유저 아이디
	private String userId;
	
	//파일 정보
	private Integer fileNo;
	private String fileName;
	private String filePath;
}
