$(function(){
	$.ajax({
		url:"/rest/user/getUserData",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			console.log(resp);
		}
	});
	
	$("#deleteUser").click(deleteUser);
});

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


