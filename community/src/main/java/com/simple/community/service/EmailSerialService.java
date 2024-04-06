package com.simple.community.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.simple.community.commons.AuthCode;
import com.simple.community.commons.EmailSendMessage;
import com.simple.community.entity.EmailDto;
import com.simple.community.mapper.SerialMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailSerialService {
	
	@Autowired
	private EmailSendMessage emailSendMessage;
	
	@Autowired
	private SerialMapper serialMapper;

	@Transactional
	public int insert(EmailDto emailDto) throws Exception {
		AuthCode authCode = new AuthCode();
		String code = authCode.excuteGenerate();
		emailDto.setSerial(code);
		emailDto.setTitle("인증코드 테스트");
		log.info("\n\n\n\n{}\n\n",emailDto.toString());
		int cnt = serialMapper.insertSerial(emailDto);
		int cnt1 = emailSendMessage.sendMessage(emailDto);
		if(cnt <= 0) {
			throw new Exception("DB 저장 실패");
		}
		if(cnt1 <= 0) {
			throw new Exception("이메일 전송 실패");
		}else {
			return 1;
		}
	}
}



