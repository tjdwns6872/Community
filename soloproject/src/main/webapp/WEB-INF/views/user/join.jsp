<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.6.1.js"></script>
	<script type="text/javascript">
		$(function() {
			$("#input-user-id").blur(function() {
				$.ajax({
					url:"http://localhost:8888/rest/idConfirm/"+$(this).val(),
					method:"get",
					success:function(resp){
						console.log(resp);
					}
				});
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
	<div class="container">
		<h1>회원가입</h1>
		<form action="">
			<label class="form-label">아이디</label>
			<input id="input-user-id" class="form-control mb-3" type="text" name="userId" required>
			<label class="form-label">비밀번호</label>
			<input class="form-control mb-3" type="password" name="userPw" required>
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




