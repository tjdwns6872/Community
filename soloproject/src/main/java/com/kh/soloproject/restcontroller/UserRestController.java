package com.kh.soloproject.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.soloproject.entity.UserDto;
import com.kh.soloproject.repository.UserDao;

@RestController
@CrossOrigin
@RequestMapping("/rest")
public class UserRestController {

	@Autowired
	private UserDao userDao;
	
	@GetMapping("/test")
	public List<UserDto> list(){
		return userDao.userList();
	}
	
	@GetMapping("/idConfirm/{userId}")
	public String idConfirm(@PathVariable String userId){
		return userDao.userIdConfirm(userId);
	}
}







