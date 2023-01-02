<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/commons.css">
	<script type="text/javascript">
		$(function() {
			$("#input-user-id").blur(function() {
				var userId = $(this);
				var regex = /^[a-z][a-z0-9]{5,20}$/;
				if(userId.val() == 0){
					userId.addClass("is-invalid");
					return;
				}
				userId.removeClass("is-valid is-invalid");
				
				if(regex.test(userId.val())){		
					$.ajax({
						url:"http://localhost:8888/rest/idConfirm/"+userId.val(),
						method:"get",
						success:function(resp){
							if(resp == 0){
								userId.addClass("is-valid");
							}else{
								userId.addClass("is-invalid");
							}
						}
					});
				}else{
					userId.addClass("is-invalid");
				}
			});
			$("#input-user-pw").blur(function(){
				var regex = /^(?=.*[!@#$])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$]{8,16}$/;
				var userPw = $(this);
				userPw.removeClass("is-valid is-invalid");
				if(regex.test(userPw.val())){
					userPw.addClass("is-valid");
				}else{
					userPw.addClass("is-invalid");
				}
			});
			$("#user-pw-confirm").blur(function(){
				if($(this).val() != $("[name=userPw]").val()){
					$(this).removeClass("is-valid");
					$(this).addClass("is-invalid");
				}else if($(this).val() == $("[name=userPw]").val()){
					$(this).removeClass("is-invalid");
					$(this).addClass("is-valid");
				}
			});
		});
	</script>
	<!--<style type="text/css">
		div{
			border: 1px solid gray;
		}
	</style>-->
<title>회원가입</title>
</head>
<body>
	<div class="container-500">
		<h1>회원가입</h1>
		<form class="mb-3" action="join" method="post">
			<label class="form-label">아이디</label>
			<input id="input-user-id" class="form-control mb-3" type="text" name="userId" required>
			<label class="form-label">비밀번호</label>
			<input id="input-user-pw" class="form-control mb-3" type="password" name="userPw" required>
			<label class="form-label">비밀번호 확인</label>
			<input id="user-pw-confirm" class="form-control mb-3" type="password" required>
			<label class="form-label">이름</label>
			<input class="form-control mb-3" type="text" name="userName" required>
			<label class="form-label">생년월일</label>
			<input class="form-control mb-3" type="date" name="userBirth" required>
			<div class="text-center mb-3 row">
				<label class="form-label col-6">
					<input type="radio" name="userGender" value="남자">
				남자 </label>
				<label class="form-label col-5">
					<input type="radio" name="userGender" value="여자">
				여자 </label>
			</div>
			<label class="form-label">이메일</label>
			<input class="form-control mb-3" type="text" name="userEmail" required>
			<label class="form-label">전화번호</label>
			<input class="form-control mb-3" type="tel" name="userTel" required>
			<button class="btn btn-secondary" type="button">뒤로가기</button>
			<button class="btn btn-primary" type="submit">회원가입</button>
		</form>
	</div>
</body>
</html>




