$(function(){
	var path = $(location).attr('pathname').split("/")[3];
	$(".content").empty();
	$.ajax({
		url:"/rest/user/getUserData",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			if(path == "edit"){
				dataEdit(resp);
			}else if(path == "pwedit"){
				pwEdit();
			}else{
				dataInfo(resp);
			}
		}
	});


	$("#deleteUser").click(deleteUser);
	$("#changeUser").click(function(){
		changeUser('data');
	});
	$("#changePw").click(function(){
		changeUser('pw');
	});
	$(document).on("click", "#dataChange", dataChange);
	$(document).on("click", "#pwChange", pwChange);
});

function dataChange(){
	var regEmail = /^[a-zA-Z0-9._-]+@+[a-zA-Z0-9.-]+\.[a-zA-Z]$/;
	var regName = /[ㄱ-힣]/;
	var data = {};
	$.each($(".content input"), function(index, item){
		data[$(this).attr('id')] = $(this).val();
	});
	if(!regEmail.test(data['userEmail'])){
		return;
	}
	if(!regName.test(data['userName'])){
		return;
	}

	$.ajax({
		url:"/rest/user/edit",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(resp){
			if(resp == 1){
				window.location.reload();
			}
		}
	});
}

function pwChange(){
	var reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	var data = {};
	$.each($(".content input"), function(index, item){
		data[$(this).attr('id')] = $(this).val();
	});
	if(!reg.test(data['userPw'])){
		return;
	}
	if(data['userPwCheck'] != data['userPw']){
		return;
	}

	$.ajax({
		url:"/rest/user/password/change",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(resp){
			if(resp == 1){
				window.location.reload();
			}
		}
	});
}

function changeUser(type){
	var title;
	var afUrl;
	if(type == 'data'){
		title = '개인정보 수정';
		afUrl = '/user/mypage/edit';
	}if(type == 'pw'){
		title = '비밀번호 변경'
		afUrl = '/user/mypage/pwedit';
	}
	var inputList = [
		{
			"title":"비밀번호 확인", "type":"password", "name":"userPw"
		}
	];
	var buttonItem = {"type":"get", "url":"/rest/user/password/check", "afUrl":afUrl}
	popup.openPopup(title=title, context=null, inputList=inputList, buttonItem=buttonItem);
}

function dataInfo(resp){
	var html = "";
	html += "<div class='info-group'>";
	html += "<label>아이디:</label>";
    html += "<span id='userId'>"+resp.userId+"</span>"            
    html += "</div>";
	html += "<div class='info-group'>";
	html += "<label>이름:</label>";
    html += "<span id='userName'>"+resp.userName+"</span>"            
    html += "</div>";
	html += "<div class='info-group'>";
	html += "<label>이메일:</label>";
    html += "<span id='userEmail'>"+resp.userEmail+"</span>"            
    html += "</div>";

	$(".content").append(html);
}

function pwEdit(){
	var html = "";
	html += "<div class='info-group'>";
	html += "<label>새 비밀번호</label>";
    html += "<input type=password id='userPw'>"            
    html += "</div>";
	html += "<div class='info-group'>";
	html += "<label>새 비밀번호 확인</label>";
    html += "<input type=password id='userPwCheck'>"            
    html += "</div>";
	html += "<div class='edit-buttons'>";
	html += "<button type='button' id='pwChange' class='submit-button'>비밀번호 수정</button>"
	html += "</div>"
	
	$(".content").append(html);
}

function dataEdit(resp){
	var html = "";
	html += "<div class='info-group'>";
	html += "<label>아이디:</label>";
    html += "<span id='userId'>"+resp.userId+"</span>"            
    html += "</div>";
	html += "<div class='info-group'>";
	html += "<label>이름</label>";
    html += "<input type=text id='userName' value='"+resp.userName+"'>"            
    html += "</div>";
	html += "<div class='info-group'>";
	html += "<label>이메일</label>";
    html += "<input type=text id='userEmail' value='"+resp.userEmail+"'>"            
    html += "</div>";
	html += "<div class='edit-buttons'>";
	html += "<button type='button' id='dataChange' class='submit-button'>정보수정</button>"
	html += "</div>"
	
	$(".content").append(html);
}

function deleteUser(){
	var data = {
		"userNo": $("#userNo").text()
	}
	$.ajax({
		url:"/rest/user/delete",
		type:"GET",
		data:data,
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			console.log(resp);
			if(resp > 0){
				location.href="/";
			}
		}
	});
}


