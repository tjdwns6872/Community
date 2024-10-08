$(function(){
	$("#join_btn").click(join);
	
	$("input[name=userId]").focusout(idCheck);
	
	$("input[name=userPw]").focusout(pwCheck);
	
	$("input[name=user_pw_check]").focusout(pwComCheck);

	$("input[name=userName]").focusout(nameCheck);

	$("#phone1, #phone2, #phone3").keyup(function(){
		var regex = /[^0-9]/g;
		var idNum = 2;
		var n = 3;
		if($(this).attr("id") != "phone1"){
			var result = $(this).attr("id").replace(regex, "");
			idNum = parseInt(result)+1;
			n = 4;
		}
		if($(this).val().length == n){
			if(idNum == 4){
				return;
			}
			$("#phone"+idNum).focus();
		}
	});
	
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
	var reg = /^[가-힣]+$/;
	var result = 1;
	$('#userName-error').fadeOut();
	if($("input[name=userName]").val() == ""){
		$("#userName-error").text("이름을 입력하세요.").fadeIn();
	}else if(!reg.test($("input[name=userName]").val())){
		$("#userName-error").text("한글만 입력하세요.").fadeIn();
	}else{
		result = 0;
	}
	return result
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

function phoneCheck(){
	var reg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
	var phone ="";
	var result = 1;
	$("#userPhone-error").fadeOut();
	phone += $("#phone1").val()
	phone += $("#phone2").val();
	phone += $("#phone3").val();

	if(!reg.test(phone)){
		$("#userPhone-error").text("잘못된 형식의 전화번호입니다.").fadeIn();
	}else{
		result = 0;
		$("#join-form").append("<input type=hidden name=userPhone>");
		$("input[name=userPhone]").val(phone);
	}
	return result;
}
function emailCheck(){
	var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
	var email = "";
	var result = 1;
	$("#userEmail-error").fadeOut();
	email += $("#email-user").val();
	email += "@";
	email += $("#email-domain").val();
	if(!reg.test(email)){
		$("#userEmail-error").text("잘못된 형식의 이메일입니다.").fadeIn();
	}else{
		result = 0;
		$("#join-form").append("<input type=hidden name=userEmail>");
		$("input[name=userEmail]").val(email);
	}
	return result;
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
	if(genderCheck() == 1){
		$("#gender-agreement").attr("tabindex", -1).focus();
		return;
	}
	if(emailCheck() == 1){
		$("#email-input-group").attr("tabindex", -1).focus();
		return;
	}
	if(phoneCheck() == 1){
		$("#phone-input-group").attr("tabindex", -1).focus();
		return;
	}
	
	var formSerializeArray = $('#join-form').serializeArray();
	var object = {};
	for (var i = 0; i < formSerializeArray.length; i++){
    	object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
	}
	
	var json = JSON.stringify(object);

	$.ajax({
		url:"/rest/user/join",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:json,
		success:function(resp){
			result = resp.result;
			if(resp.result.code == 200){
				location.href="/user/login";
			}else{
				toastMessage("입력하신 정보를 확인해주세요.", "#CD0C22", "#FFFFFF");
			}
		}
	});
}


