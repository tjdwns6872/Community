package com.simple.community.commons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.simple.community.entity.EmailDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmailSendMessage {
	
	@Autowired
	private JavaMailSender emailSender;
	
	public int sendMessage(EmailDto emailDto) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
        	message.setFrom("noreply@community.com");
        	message.setTo(emailDto.getUserEmail());
        	message.setSubject(emailDto.getTitle());
        	message.setText(emailDto.getSerial());
        	emailSender.send(message);
        	return 1;
		}catch (Exception e) {		
			log.debug("\n{}\n", e);
			return -1;
		}
    }
}


