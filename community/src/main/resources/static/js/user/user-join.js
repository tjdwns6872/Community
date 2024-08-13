$(function(){
	$("#join_btn").click(join);
	
	$("input[name=userId]").blur(idCheck);
	
	$("input[name=userPw]").blur(pwCheck);
	
	$("input[name=user_pw_check]").blur(pwComCheck);
});

function pwCheck(){
	var reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	var password = $("input[name=userPw]").val();
	$('#userPw-error').fadeOut();
	if(password == ""){
		$('#userPw-error').text("비밀번호를 입력하세요.").fadeIn();
	}else if(!reg.test(password)){
		$('#userPw-error').text("비밀번호는 8~16자, 영문자, 숫자 및 특수 문자를 포함해야 합니다.").fadeIn();
	}
}
function pwComCheck(){
	$('#userPw-check-error').fadeOut();
	var password = $("input[name=user_pw_check]").val();
	var password1 = $("input[name=userPw]").val();
	if(password == ""){
		$('#userPw-check-error').text("비밀번호확인을 입력하세요.").fadeIn();
	}else if(password =! password1){
		$('#userPw-check-error').text("비밀번호가 일치하지 않습니다.").fadeIn();
	}
}

function idCheck(){
	if($("input[name=userId]").val() == ""){
		$('#userId-error').text("아이디를 입력하세요.").fadeIn();
	}else{
		$('#userId-error').fadeOut();
		$.ajax({
			url:"/rest/user/getOne",
			type:"GET",
			contentType: 'application/json',
			dataType: 'json',
			data:{
				"userId": $("input[name=userId]").val(),
				"type": "check"
			},
			success:function(resp){
				if(resp.userData != null){
					$('#userId-error').text("중복된 아이디입니다.").fadeIn();		
				}
			}
		});
	}
}

function join(){
	if($("#join_checkbox").val() == ""){
		return;
	}
	if($("input[name=userId]").val() == ""){
		return;
	}
	if($("input[name=userPw]").val() == ""){
		return;
	}
	if($("input[name=user_pw_check]").val() == ""){
		return;
	}
	if($("input[name=userName]").val() == ""){
		return;
	}
	if($("input[name=userEmail]").val() == ""){
		return;
	}
	if($("input[name=userPhone]").val() == ""){
		return;
	}
	if($("input[name=userGender]").val() == ""){
		return;
	}
	if($("input[name=userPw]").val() != $("#user_pw_check").val()){
		return;
	}
	
	var formSerializeArray = $('#join-form').serializeArray();
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++){
    	object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
	
	var json = JSON.stringify(object);
		
	/*$.ajax({
		url:"/rest/user/join",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:json,
		success:function(resp){
			console.log(resp);
		}
	});*/
}


