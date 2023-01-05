package com.kh.soloproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.kh.soloproject.repository.CertDao;

public class SchedulerServiceImpl implements SchedulerService{

	@Autowired
	private CertDao certDao;
	
	@Scheduled(cron = "0 0 * * * *")
	@Override
	public void clearCert() {
		certDao.clear();
	}

}
