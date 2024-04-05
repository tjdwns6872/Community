package com.simple.community.commons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.simple.community.entity.EmailDto;

@Service
public class EmailSendMessage {
	
	@Autowired
	private JavaMailSender emailSender;
	
	public void sendMessage(EmailDto emailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@community.com");
        message.setTo("tjdwns6872@gmail.com");
        message.setSubject("test1");
        message.setText("test");
        emailSender.send(message);
    }
}
