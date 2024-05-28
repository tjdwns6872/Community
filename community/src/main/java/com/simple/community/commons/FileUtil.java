package com.simple.community.commons;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.simple.community.mapper.FileMapper;

import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileUtil {
	
	@Autowired
	private FileMapper fileMapper;

	public int fileChange(String base64String, String fileName, int category) {
		byte[] data = DatatypeConverter.parseBase64Binary(base64String);
		
		String fileType = fileName.substring(fileName.indexOf("."));
		
		String fileId = UUID.randomUUID().toString();
		
		String path = "C:/data/";
		File file = new File(path+fileId+fileType);
		
		fileUpload(file, data);
		
		Map<String, Object> params = new HashMap<>();
		params.put("fileName", fileName);
		params.put("fileType", fileType);
		params.put("fileId", fileId);
		params.put("filePath", path);
		
		int cnt = fileMapper.fileInsert(params);
		log.info("\ncnt==>{}", cnt);
		if(cnt > 0) {
			return Integer.parseInt(params.get("fileNo").toString());
		}else {
			return cnt;			
		}
	}
	
	public static void fileUpload(File file, byte[] data) {
		try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))){
			outputStream.write(data);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
