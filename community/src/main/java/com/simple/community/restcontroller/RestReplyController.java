package com.simple.community.restcontroller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.entity.ReplyDto;
import com.simple.community.service.ReplyService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/rest/reply")
public class RestReplyController {
	
	@Autowired
	private ReplyService replyService;

	@PutMapping("/reg")
	public int replyReg(@RequestBody Map<String, Object> params, HttpSession session) {
		return replyService.replyReg(params, session);
	}
	
	@GetMapping("/list")
	public List<ReplyDto> replyList(@RequestParam Map<String, Object> params){
		return replyService.replyList(params);
	}
	
	@DeleteMapping("/delete")
	public int replyDelete(@RequestBody Map<String, Object> params, HttpSession session) {
		return replyService.replyDelete(params, session);
	}
	
	@GetMapping("/detile")
	public ReplyDto replyDetiles(@RequestParam Map<String, Object> params) {
		return replyService.replyDetiles(params);
	}
}





