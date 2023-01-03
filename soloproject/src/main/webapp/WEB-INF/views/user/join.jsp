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
        	// 멀티 페이지(이용약관이랑 회원가입을 분리) 파트
	        $(".join-page").hide();
	        $(".join-page").first().show();

	        $(".next-btn").click(function(){
	            var target = $(this).parents(".join-page").next();
	            $(".join-page").hide();
	            target.show();
	        });
	
	        $(".prev-btn").click(function(){
	            var target = $(this).parents(".join-page").prev();
	            $(".join-page").hide();
	            target.show();
	        });
	
	        // 아이디 판별 파트
			$("#input-user-id").blur(function() {
				var userId = $(this);
				var regex = /^[a-z][a-z0-9]{5,20}$/;
	            userId.removeClass("is-valid is-invalid");
				if(userId.val().length == 0){
					userId.addClass("is-invalid");
					return;
				}
				if(regex.test(userId.val())){		
					$.ajax({
						url:"http://localhost:8888/rest/idConfirm/"+userId.val(),
						method:"get",
						success:function(resp){
	                        console.log(resp)
							if(resp.length == 0){
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
	
	        // 비밀번호 판별 파트
			$("#input-user-pw").blur(function(){
				var userPw = $(this);
				var regex = /^(?=.*[!@#$])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$]{8,16}$/;
	            userPw.removeClass("is-valid is-invalid");
	            if(userPw.val().length == 0){
	                userPw.addClass("is-invalid");
					return;
	            }
	            if(regex.test(userPw.val())){
	                userPw.addClass("is-valid");
	            }else{
	                userPw.addClass("is-invalid");
	            }
	        });
	
	        // 비밀번호 확인 판별 파트
			$("#user-pw-confirm").blur(function(){
	            pwConfirm = $(this);
	            pwConfirm.removeClass("is-valid is-invalid");
	            if(pwConfirm.val() == $("#input-user-pw").val()){
	                pwConfirm.addClass("is-valid");
	            }else{
	                pwConfirm.addClass("is-invalid");
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
        <form class="mb-2" action="" method="post">
            <div class="join-page">
            <h1>이용약관</h1>
            <button class="btn btn-primary next-btn" type="button">다음</button>
        </div>
	    <div class="join-page">
	    	<h1>회원가입</h1>
                <div>
                    <label class="form-label">아이디</label>
                    <input id="input-user-id" class="form-control" type="text" name="userId" required>
                    <span class="invalid-feedback">사용 불가한 아이디입니다.</span>
                    <span class="valid-feedback">사용 가능한 아이디입니다.</span>
                </div>
                <div>
                    <label class="form-label mt-2">비밀번호</label>
                    <input id="input-user-pw" class="form-control" type="password" name="userPw" required>
                    <span class="invalid-feedback">사용 불가한 비밀번호입니다.</span>
                    <span class="valid-feedback">사용 가능한 비밀번호입니다.</span>
                </div>
                <div>
                    <label class="form-label mt-2">비밀번호 확인</label>
                    <input id="user-pw-confirm" class="form-control" type="password" required>
                    <span class="invalid-feedback">비밀번호가 일치하지 않습니다.</span>
                    <span class="valid-feedback">비밀번호가 일치합니다.</span>
                </div>
	    		<label class="form-label mt-2">이름</label>
	    		<input class="form-control" type="text" name="userName" required>
	    		<label class="form-label mt-2">생년월일</label>
	    		<input class="form-control" type="date" name="userBirth" required>
	    		<label class="form-label mt-2">성별</label>
                <div class="text-center row">
	    			<label class="form-label col-6">
	    				<input type="radio" name="userGender" value="남자">
	    			남자 </label>
	    			<label class="form-label col-5">
	    				<input type="radio" name="userGender" value="여자">
	    			여자 </label>
	    		</div>
	    		<label class="form-label mt-2">이메일</label>
	    		<input class="form-control" type="text" name="userEmail" required>
	    		<label class="form-label mt-2">전화번호</label>
	    		<input class="form-control" type="tel" name="userTel" required>
	    		<button class="btn btn-secondary mt-2 prev-btn" type="button">뒤로가기</button>
	    		<button class="btn btn-primary mt-2" type="submit">회원가입</button>
            </div>
		</form>
	</div>
</body>
</html>




