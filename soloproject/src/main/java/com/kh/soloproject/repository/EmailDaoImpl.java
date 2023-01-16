package com.kh.soloproject.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kh.soloproject.entity.EmailDto;

@Repository
public class EmailDaoImpl implements EmailDao{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void insert(EmailDto emailDto) {
		sqlSession.insert("");
	}

}
