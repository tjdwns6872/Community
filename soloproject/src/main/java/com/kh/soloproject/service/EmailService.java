package com.kh.soloproject.service;

import com.kh.soloproject.entity.CertDto;

public interface EmailService {
	void sendCertMail(String userEmail);
	boolean checkCert(CertDto certDto);
}
