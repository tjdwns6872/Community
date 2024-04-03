$(function(){
	$("#join_btn").click(join);
	
	$("input[name=user_id]").blur(idCheck);
});

function idCheck(){
	if($("input[name=user_id]").val() == ""){
		//수정 예정
		console.log("아이디 입력");
		return;
	}
	$.ajax({
		url:"/rest/user/getOne",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:{
			"user_id": $("input[name=user_id]").val(),
			"type": "check"
		},
		success:function(resp){
			console.log(resp.result);
		}
	});
}

function join(){
	//수정 예정
	if($("#join_checkbox").val() == ""){
		console.log("동의");
		return;
	}
	if($("input[name=user_id]").val() == ""){
		console.log("아이디를 입력하세요.");
		return;
	}
	if($("input[name=user_pw]").val() == ""){
		console.log("비밀번호를 입력하세요.");
		return;
	}
	if($("input[name=user_pw_check]").val() == ""){
		console.log("비밀번호 확인을 입력하세요.");
		return;
	}
	if($("input[name=user_name]").val() == ""){
		console.log("이름을 입력하세요.");
		return;
	}
	if($("input[name=user_email]").val() == ""){
		console.log("이메일을 입력하세요.");
		return;
	}
	if($("input[name=user_phone]").val() == ""){
		console.log("전화번호를 입력하세요.");
		return;
	}
	if($("input[name=user_gender]").val() == ""){
		console.log("성별 선택");
		return;
	}
	if($("input[name=user_pw_check]").val() != $("input[name=user_pw_check]").val()){
		console.log("비밀번호 확인하세요.");
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
			console.log(resp);
		}
	});
}


