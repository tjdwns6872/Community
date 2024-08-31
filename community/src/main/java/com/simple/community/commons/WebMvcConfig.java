package com.simple.community.commons;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.simple.community.interceptor.CommInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
    @Autowired
    private CommInterceptor commInterceptor;

	//로그인이 필요한 페이지
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(commInterceptor)
				.addPathPatterns("/board/reg")
				.addPathPatterns("/board/edit")
				.addPathPatterns("/rest/board/reg")
				.addPathPatterns("/rest/board/update")
				.addPathPatterns("/rest/board/file/*")
				.addPathPatterns("/rest/reply/reg")
				.addPathPatterns("/rest/reply/delete")
				.addPathPatterns("/rest/reply/update")
				.addPathPatterns("/rest/user/logout")
				.addPathPatterns("/rest/user/delete")
				.addPathPatterns("/rest/user/edit")
				.addPathPatterns("/user/mypage/*");
	}
}
