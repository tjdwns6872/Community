$(function(){
	$("#login_btn").click(idCheck);

	$(document).keyup(function(key){
		if(key.keyCode==13) {
			idCheck();
		}
	});
});

function idCheck(){
	if($("input[name=userId]").val() == ""){
		toastMessage("아이디를 입력하세요.", "#CD0C22", "#FFFFFF");
		return;
	}
	if($("input[name=userPw]").val() == ""){
		toastMessage("비밀번호를 입력하세요.", "#CD0C22", "#FFFFFF");
		return;
	}
	var data = {
		"userId": $("input[name=userId]").val(),
		"userPw": $("input[name=userPw]").val(),
		"type": "login"
	}
	$.ajax({
		url:"/rest/user/getOne",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			result = resp.result;
			console.log(resp);
			if(result.code == 200){
				location.href="/";
			}else{
				toastMessage("아이디 혹은 비밀번호가 틀렸습니다.", "#CD0C22", "#FFFFFF");
			}
		}
	});
}