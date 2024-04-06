package com.simple.community.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.AuthCode;
import com.simple.community.commons.EmailSendMessage;
import com.simple.community.entity.EmailDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailSerialService {
	
	@Autowired
	private EmailSendMessage emailSendMessage;

	@Transactional
	public int insert(EmailDto emilDto) {
		AuthCode authCode = new AuthCode();
		String code = authCode.excuteGenerate();
		emilDto.setSerial(code);
		emilDto.setTitle("인증코드 테스트");
//		emilDto.setUserEmail("tjdwns6872@gmail.com");
		int cnt = emailSendMessage.sendMessage(emilDto);
		log.info("\n\n\n{}\n", cnt);
		return 0;
//		return cnt;
	}
}



