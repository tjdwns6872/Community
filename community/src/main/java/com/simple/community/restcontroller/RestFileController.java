package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.commons.FileUtil;

@RestController
@RequestMapping("/rest/file")
public class RestFileController {

	@Autowired
	private FileUtil fileUtil;
	
	@GetMapping("/download")
	public Map<String, Object> fileDownload(@RequestParam Map<String, Object> params) {
		return fileUtil.fileDownload(params);
	}
}
