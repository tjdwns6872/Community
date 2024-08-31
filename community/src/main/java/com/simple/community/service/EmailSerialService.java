package com.simple.community.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.AuthCode;
import com.simple.community.commons.EmailSendMessage;
import com.simple.community.entity.EmailDto;
import com.simple.community.entity.UserDto;
import com.simple.community.mapper.SerialMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailSerialService {
	
	@Autowired
	private EmailSendMessage emailSendMessage;
	
	@Autowired
	private SerialMapper serialMapper;
	
	@Autowired
	private UserService userService;

	@Transactional
	public int insert(EmailDto emailDto) throws Exception {
		AuthCode authCode = new AuthCode();
		String code = authCode.excuteGenerate();
		emailDto.setSerial(code);
		if(emailDto.getType().equals("id")) {
			emailDto.setTitle("아이디 찾기 인증코드");
		}else if(emailDto.getType().equals("pw")) {
			emailDto.setTitle("비밀번호 찾기 인증코드");
		}
		int userCheck = userCheck(emailDto);
		
		EmailDto checkSerial = new EmailDto(); 
		checkSerial.setUserEmail(emailDto.getUserEmail());
		int  check = checkSerial(checkSerial);
		if(check > 0) {
			deleteSerial(checkSerial);
		}
		
		log.info("\n\n\n\n{}\n\n",emailDto.toString());
		if(userCheck > 0) {
			int cnt = serialMapper.insertSerial(emailDto);
			int cnt1 = emailSendMessage.sendMessage(emailDto);
			if(cnt <= 0) {
				throw new Exception("DB 저장 실패");
			}
			if(cnt1 <= 0) {
				throw new Exception("이메일 전송 실패");
			}else {
				int serialNo = emailDto.getSerialNo();
				return serialNo;
			}
		}else {
			return -1;
		}
	}
	
	public UserDto findData(EmailDto emailDto) throws Exception {
		UserDto userDto = new UserDto();
		int cnt = checkSerial(emailDto);
		userDto.setUserEmail(emailDto.getUserEmail());
		deleteSerial(emailDto);
		if(emailDto.getType().equals("pw")) {
			userDto.setUserId(emailDto.getUserId());
			String change = userService.changePw(userDto, null, null);
			if(change == null) {
				throw new Exception("비밀번호 변경 실패");
			}else {
				userDto.setUserPw(change);
			}
		}else {
			userDto = (UserDto) userService.getOne(userDto, null, null).get("userData");
		}
		return userDto;
	}
	
	@Transactional
	public int deleteSerial(EmailDto emailDto) {
		return serialMapper.deleteSerial(emailDto);
	}
	
	public Integer checkSerial(EmailDto emailDto) {
		Integer cnt = serialMapper.checkSerial(emailDto);
		log.info("\n{}\n", cnt);
		if(cnt != null && cnt != 0) {
			serialMapper.UpdateSerial(cnt);
		}else {
			cnt = 0;
		}
		return cnt;
	}
	
	public int userCheck(EmailDto emailDto) {
		UserDto userDto = new UserDto();
		if(emailDto.getType() != "pw") {
			userDto.setUserId(emailDto.getUserId());
		}
		userDto.setUserEmail(emailDto.getUserEmail());
		userDto.setUserName(emailDto.getUserName());
		int cnt = userService.userCheck(userDto);
		return cnt;
	}
}



