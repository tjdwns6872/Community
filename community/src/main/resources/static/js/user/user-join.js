$(function(){
	$("#join_btn").click(join);
	
	$("input[name=userId]").blur(idCheck);
	
	$("input[name=userPw]").blur(pwCheck);
	
	$("input[name=user_pw_check]").blur(pwComCheck);
	
});

function pwCheck(){
	var reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	var password = $("input[name=userPw]").val();
	var result = 1;
	$('#userPw-error').fadeOut();
	if(password == ""){
		$('#userPw-error').text("비밀번호를 입력하세요.").fadeIn();
	}else if(!reg.test(password)){
		$('#userPw-error').text("비밀번호는 8~16자, 영문자, 숫자 및 특수 문자를 포함해야 합니다.").fadeIn();
	}else{
		result = 0;
	}
	return result;
}
function pwComCheck(){
	$('#userPw-check-error').fadeOut();
	var password = $("input[name=user_pw_check]").val();
	var password1 = $("input[name=userPw]").val();
	var result = 1;
	if(password == ""){
		$('#userPw-check-error').text("비밀번호확인을 입력하세요.").fadeIn();
	}else if(password != password1){
		$('#userPw-check-error').text("비밀번호가 일치하지 않습니다.").fadeIn();
	}else{
		result = 0;
	}
	return result;
}

function idCheck(){
	var reg = /^[a-z]+[a-z0-9]{5,19}$/g;
	var result = 1;
	$('#userId-error').fadeOut();
	if($("input[name=userId]").val().length <= 0){
		$('#userId-error').text("아이디를 입력하세요.").fadeIn();
	}else if(!reg.test($("input[name=userId]").val())){
		$('#userId-error').text("사용할 수 없는 아이디입니다.").fadeIn();
	}else{
		$('#userId-error').fadeOut();
		$.ajax({
			url:"/rest/user/getOne",
			type:"GET",
			contentType: 'application/json',
			dataType: 'json',
			async:false,
			data:{
				"userId": $("input[name=userId]").val(),
				"type": "check"
			},
			success:function(resp){
				if(resp.userData != null){
					$('#userId-error').text("중복된 아이디입니다.").fadeIn();	
				}else{
					result = 0
				}
			}
		});
	}
	return result;
}
function nameCheck(){
	var reg = /[ㄱ-힣]/;
	var result = 1;
	$('#userName-error').fadeOut();
	if($("input[name=userName]").val() == ""){
		$("#userName-error").text("이름을 입력하세요.").fadeIn();
	}else if(reg.test($("input[name=userName]").val())){
		$("#userName-error").text("한글만 입력하세요.").fadeIn();
	}else{
		result = 0;
	}
}

function genderCheck(){
	var result = 1;
	$('#userGender-error').fadeOut();
	if(!$("input[name=userGender]").is(":checked")){
		$("#userGender-error").text("성별을 선택하세요.").fadeIn();
	}else{
		result = 0;
	}
	return result;
}

function emailCheck(){
	
}
function phoneCheck(){
	
}

function join(){
	if(!$("#join_checkbox").is(":checked")){
		$("#privacy").attr("tabindex", -1).focus();
		return;
	}
	if(idCheck() == 1){
		$("input[name=userId]").focus();
		return;
	}
	if(pwCheck() == 1){
		$("input[name=userPw]").focus();
		return;
	}
	if(pwComCheck() == 1){
		$("input[name=user_pw_check]").focus();
		return;
	}
	if(nameCheck() == 1){
		$("input[name=userName]").focus();
		return;
	}
	if($("input[name=userEmail]").val() == ""){
		return;
	}
	if($("input[name=userPhone]").val() == ""){
		return;
	}
	if(genderCheck() == 1){
		$("#gender-agreement").attr("tabindex", -1).focus();
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


