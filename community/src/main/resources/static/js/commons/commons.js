$(function(){
	
	$("#logout").click(logout);
	
	$("#mail").click(emailSend);
});

function logout(){
	$.ajax({
		url:"/rest/user/logout",
		type:"GET",
		success:function(){
			location.reload();
		}
	});
}

function emailSend(){
	$.ajax({
		url:"/rest/user/find",
		type:"POST",
		success:function(){
		}
	});
}



