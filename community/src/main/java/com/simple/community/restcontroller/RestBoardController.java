package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.service.BoardService;

@RestController
@RequestMapping("/rest/board")
public class RestBoardController {

	@Autowired
	private BoardService boardService;
	
	@GetMapping("/list")
	public Map<String, Object> list(@RequestParam Map<String, Object> params){
		return boardService.boardList(params);
	}
}







