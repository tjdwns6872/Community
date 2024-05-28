package com.simple.community.restcontroller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/file")
public class RestFileController {

	@GetMapping("/download")
	public void fileDownload() {
		
	}
}
