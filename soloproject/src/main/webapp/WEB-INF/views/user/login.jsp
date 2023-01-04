<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/commons.css">
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
        /* div{
            border: 1px solid gray;
        } */
        html,
        body {
        height: 100%;
        }
        
        body {
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
        }
        
        .form-signin {
        width: 100%;
        max-width: 360px;
        padding: 15px;
        margin: auto;
        }
        
        .form-signin .checkbox {
        font-weight: 400;
        }
        
        .form-signin .form-floating:focus-within {
        z-index: 2;
        }
        
        .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        }
        
        .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        }
    </style>
</head>
<body class="text-center">
    <main class="form-signin">
       <form action="" method="post">
          <h1 class="h3 mb-3 fw-normal">로그인</h1>
          
          <div class="form-floating">
             <input type="text" class="form-control" name="userId" placeholder="아이디">
             <label for="id">아이디</label>
          </div>
          <div class="form-floating">
             <input type="password" class="form-control" name="userPw" placeholder="비밀번호">
             <label for="pwd">비밀번호</label>
          </div>
          
          <div class="checkbox mb-3">
             <label>
                <input type="checkbox"> 아이디 저장
             </label>
          </div>
          <c:if test="${param.error != null}">
              <div class="mb-2">
                  <span style="color:red;">아이디 또는 비밀번호를 잘못 입력했습니다.</span>
              </div>
          </c:if>
          <button class="w-100 btn btn-lg btn-primary" type="submit">로그인</button>
          <a class="btn" href="">아이디찾기</a>/<a class="btn" href="">비밀번호찾기</a>
       </form>
    </main>
 </body>
</html>