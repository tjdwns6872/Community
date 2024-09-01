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

function toastMessage(text, background) {
	var temp = background.replace("#", "");
	var dec = parseInt(temp, 16);
	//0~16777215
	$("main").append("<div id='snackbar'></div>")
	var div = $("#snackbar");  
	div.addClass("show");
	div.text(text);
	div.css("background-color", background);
	div.css("color", "#FFFFFF");
	setTimeout(
		function(){
			div.removeClass("show");
			div.remove();
		},
	2000);
  }

