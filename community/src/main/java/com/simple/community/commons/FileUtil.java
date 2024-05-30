package com.simple.community.commons;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

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
	
	public void fileDownload(Map<String, Object> params) {
		FileDto result = fileMapper.selectFile(params);
		log.info("\n\n{}\n\n", result.toString());
		String fileName = result.getFileName();
		String fileId = result.getFileId();
		String filePath = result.getFilePath()+fileId;
		log.info("\n\n{}\n\n", filePath);
		
		try {
			Resource resource = new UrlResource(Paths.get(filePath).toUri());
			log.info("\n\n{}\n\n", resource);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		log.info("\n\n{}\n\n", ResourceUtils.CLASSPATH_URL_PREFIX+"static/file/"+result.getFileId());
	}
}






