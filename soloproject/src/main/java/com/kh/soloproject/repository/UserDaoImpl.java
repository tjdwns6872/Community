package com.kh.soloproject.repository;

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
	public UserDto login(UserDto userDto) {
		UserDto findDto = sqlSession.selectOne("user.login", userDto.getUserId());
		return findDto;
	}
	@Override
	public boolean passwordChange(UserDto userDto) {
		return sqlSession.update("user.passwordChange", userDto) > 0;
	}
}
