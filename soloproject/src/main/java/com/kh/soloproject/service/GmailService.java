package com.kh.soloproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.kh.soloproject.component.RandomGenerator;
import com.kh.soloproject.entity.CertDto;
import com.kh.soloproject.repository.CertDao;

@Service
public class GmailService implements EmailService{

	@Autowired
	private RandomGenerator randomGenerator;
	
	@Autowired
	private CertDao certDao;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Override
	public void sendCertMail(String userEmail) {
		String serial = randomGenerator.generateSerial(6);
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(userEmail);
		message.setSubject("인증번호 테스트");
		message.setText(serial);
		javaMailSender.send(message);
		
		certDao.delete(userEmail);
		CertDto certDto = null;
		certDao.insert(certDto);
	}

	@Override
	public boolean checkCert(CertDto certDto) {
		if(certDao.check(certDto)) {//인증 성공
			certDao.delete(certDto.getWho());
			return true;
		}
		return false;
	}
}
