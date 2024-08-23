$(function(){
	$.ajax({
		url:"/rest/user/getUserData",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			dataInfo(resp);
		}
	});
	
	$("#deleteUser").click(deleteUser);
	$("#changeUser").click(changeUser);
});

function changeUser(){
	var title = "개인정보 수정";
	var inputList = [];
	var inputitem = {"title":"비밀번호 확인", "name":"password_check"};
	inputList[0] = inputitem;
	popup.openPopup(title, null, inputList);
}

function dataInfo(resp){
	console.log(resp);
	$("#userId").text(resp.userId);
	$("#userName").text(resp.userName);
	$("#userEmail").text(resp.userEmail);
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


