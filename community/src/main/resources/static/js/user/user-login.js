$(function(){
	$("#login_btn").click(idCheck);
});

function idCheck(){
	if($("input[name=userId]").val() == ""){
		//수정 예정
		console.log("아이디 입력");
		return;
	}
	if($("input[name=userPw]").val() == ""){
		//수정 예정
		console.log("비밀번호 입력");
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
			console.log(resp);
		}
	});
}