$(function(){
	var data = {
		"type": "mypage"
	}
	$.ajax({
		url:"/rest/user/getUserData",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			console.log(resp);
		}
	});
});