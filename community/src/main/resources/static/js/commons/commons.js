$(function(){
	
	$("#logout").click(logout);

	$(".openPopup").click(popup);
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



