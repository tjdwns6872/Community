package com.simple.community.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class ReplyDto {
	
	private Integer replyNo;
	private Integer boardNo;
	private Integer userNo;
	private String replyContent;
	private Integer regId;
	private Date regDate;
	private Integer modId;
	private Date modDate;
	private Integer upperNo;
	private Integer subupperNo;
	private Integer seatNo;
	private Integer delFg;

	//유저 아이디
	private String userId;
}
