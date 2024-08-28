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

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(commInterceptor)
				.addPathPatterns("/**/*")
                .addPathPatterns("/**/**/*");
	}
}
