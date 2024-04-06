$(function(){
	$("#pw_serial_btn").click(pwFine);
});

function pwFine(){
	var data = {
		"userId":$("#pw_find").find('#userId').val(),
		"userEmail":$("#pw_find").find('#userEmail').val()
	}
	var json = JSON.stringify(data);
	
	$.ajax({
		url:"/rest/serial/insert",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:json,
		success:function(resp){
			console.log(resp);
		}
	});
	
	console.log();
}