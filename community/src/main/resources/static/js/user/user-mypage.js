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
			}else{
				dataInfo(resp);
			}
		}
	});


	$("#deleteUser").click(deleteUser);
	$("#changeUser").click(changeUser);
	$(document).on("click", "#dataChange", dataChange);
});

function dataChange(){
	var data = {};
	$.each($(".content input"), function(index, item){
		data[$(this).attr('id')] = $(this).val();
		console.log(data);
	});

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

function changeUser(){
	var title = "개인정보 수정";
	var inputList = [
		{
			"title":"비밀번호 확인", "type":"password", "name":"userPw"
		}
	];
	var buttonItem = {"type":"get", "url":"/rest/user/password/check", "afUrl":"/user/mypage/edit"}
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


