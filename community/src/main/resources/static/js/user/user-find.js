$(function(){
	$("#serial_btn").click(idFine);
});

function idFine(){
	var data = {
		"userEmail":$("#id_find").find('#userEmail').val()
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