package com.simple.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;



@Controller
@Slf4j
public class ErrorController {
    
    @GetMapping("/error")
    public String errorPage(HttpServletRequest request,
                            HttpServletResponse response,
                            Model model) {
        return "error";
    }
    
}
