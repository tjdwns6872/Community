$(function(){
	
	$("#logout").click(logout);
});

function logout(){
	$.ajax({
		url:"/rest/user/logout",
		type:"GET",
		success:function(){
			location.href='/';
		}
	});
}



