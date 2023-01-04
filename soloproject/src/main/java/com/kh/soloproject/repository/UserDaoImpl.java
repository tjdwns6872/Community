package com.kh.soloproject.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.kh.soloproject.entity.UserDto;

@Repository
public class UserDaoImpl implements UserDao{
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public List<UserDto> userList() {
		return sqlSession.selectList("user.selectList");
	}

	@Override
	public String userIdConfirm(String userId) {
		return sqlSession.selectOne("user.selectIdConfirm", userId);
	}
	@Override
	public void join(UserDto userDto) {
		String pw = userDto.getUserPw();
		if(userDto.getUserBlurb() == null) {
			userDto.setUserBlurb("off");
		}
		String enc = encoder.encode(pw);
		userDto.setUserPw(enc);
		sqlSession.insert("user.join", userDto);
	}

	@Override
	public boolean login(UserDto userDto) {
		UserDto findDto = sqlSession.selectOne("user.login", userDto.getUserId());
		if(findDto == null) return false;
		boolean judge = encoder.matches(userDto.getUserPw(), findDto.getUserPw());
		return judge;
	}
}
