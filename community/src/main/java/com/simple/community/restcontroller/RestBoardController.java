package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.entity.BoardDto;
import com.simple.community.service.BoardService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/board")
public class RestBoardController {

	@Autowired
	private BoardService boardService;
	
	@GetMapping("/list")
	public Map<String, Object> list(@RequestParam Map<String, Object> params){
		return boardService.boardList(params);
	}
	
	@PutMapping("/reg")
	public int boardReg(@RequestBody Map<String, Object> params, HttpSession session) {
		return boardService.boardReg(params, session);
	}
	
	@GetMapping("/details")
	public BoardDto details(@RequestParam Map<String, Object> params) {
		return boardService.boardDetiles(params);
	}
	
	@DeleteMapping("/delete")
	public int delete(@RequestBody Map<String, Object> params, HttpSession session) {
		return boardService.boardDelete(params, session);
	}
	
	@PutMapping("/update")
	public int update(@RequestBody Map<String, Object> params, HttpSession session) {
		return boardService.boardUpdate(params, session);
	}
}







