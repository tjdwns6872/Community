package com.simple.community.entity;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class FileDto {
	
	private Integer fileNo;
	private String fileName;
	private String fileType;
	private Date fileTime;
	private String fileId;
	private String filePath;

}
