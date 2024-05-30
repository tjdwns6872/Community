package com.simple.community.commons;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.simple.community.entity.FileDto;
import com.simple.community.mapper.FileMapper;

import jakarta.xml.bind.DatatypeConverter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileUtil {
	
	@Autowired
	private FileMapper fileMapper;

	@Value("${boardfile.path}")
	private String PATH;
	
	public int fileChange(String base64String, String fileName, int category) {
		byte[] data = DatatypeConverter.parseBase64Binary(base64String);
		
		String fileType = fileName.substring(fileName.indexOf("."));
		
		String fileId = UUID.randomUUID().toString();
		
		String path = PATH;
		File file = new File(path+fileId);
		
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
	
	public Map<String, Object> fileDownload(Map<String, Object> params) {
		FileDto result = fileMapper.selectFile(params);
		log.info("\n\n{}\n\n", result.toString());
		String fileId = result.getFileId();
		String filePath = result.getFilePath()+fileId;
		byte[] binary = getFileBinary(filePath);
		
		String base64data = Base64.getEncoder().encodeToString(binary);
		log.info("\n\nbase64data ===> {}\n\n", base64data);
		Map<String, Object> result1 = new HashMap<>();
		result1.put("data", base64data);
		result1.put("fileName", result.getFileName());
		
		return result1;
	}
	
	private static byte[] getFileBinary(String filePath) {
		File file = new File(filePath);
		byte[] data = new byte[(int) file.length()];
		try(FileInputStream stream = new FileInputStream(file)){
			stream.read(data, 0, data.length);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return data;
	}
}






