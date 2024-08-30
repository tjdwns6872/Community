package com.simple.community.restcontroller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simple.community.entity.UserDto;
import com.simple.community.service.UserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/rest/user")
public class RestUserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/getOne")
	public Map<String, Object> getOne(@ModelAttribute UserDto userDto, @RequestParam(name="type") String type, HttpSession session){
		return userService.getOne(userDto, type, session);
	}
	
	@GetMapping("/getUserData")
	public UserDto getOne(HttpSession session){
		return userService.getOne(session);
	}
	
	@PutMapping("/join")
	public int userJoin(@RequestBody UserDto userDto) {
		return userService.userJoin(userDto);
	}
	
	@GetMapping("/logout")
	public void logout(HttpSession session) {
		userService.logout(session);
	}
	
	@PostMapping("/find")
	public void find() {
		userService.find();
	}
	
	@GetMapping("/delete")
	public int deleteUser(@RequestParam Integer userNo, HttpSession session) {
		return userService.deleteUser(userNo, session);
	}

	@GetMapping("/password/check")
	public boolean passwordCheck(@RequestParam Map<String, Object> params, HttpSession session) {
		return userService.passwordCheck(params, session);
	}

	@PutMapping("/edit")
	public int userDataChange(@RequestBody UserDto userDto, HttpSession session) {
		return userService.userDataChange(userDto, session);
	}
	
}

