package com.kh.soloproject.repository;

import com.kh.soloproject.entity.CertDto;

public interface CertDao {
	void insert(CertDto certDto);
	boolean check(CertDto certDto);
	boolean delete(String who);
	void clear();
}
