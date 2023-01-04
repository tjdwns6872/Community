package com.kh.soloproject.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.soloproject.entity.UserDto;
import com.kh.soloproject.repository.UserDao;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private PasswordEncoder encoder;

	@GetMapping("/login")
	public String login() {
		return "user/login";
	}
	@PostMapping("/login")
	public String login(@ModelAttribute UserDto userDto,
			HttpSession session) {
		UserDto findDto = userDao.login(userDto);
		if(findDto == null) return "redirect:login?error";
		boolean judge = encoder.matches(userDto.getUserPw(), findDto.getUserPw());
		if(judge) {
			session.setAttribute("login", findDto.getUserId());
			session.setAttribute("rank", findDto.getUserRank());
			return "redirect:/";
		}else {
			return "redirect:login?error";
		}
	}
	
	@GetMapping("/join")
	public String join() {
		return "user/join";
	}	
	@PostMapping("/join")
	public String join(@ModelAttribute UserDto userDto) {
		userDao.join(userDto);
		return "redirect:login";
	}
}





