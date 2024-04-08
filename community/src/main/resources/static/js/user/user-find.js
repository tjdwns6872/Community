$(function(){
	$(".serial_btn").click(find);
	
	$("input[name=find_btn]").change(function(){
		if($(this).data("find") == "pw"){
			$("#id_input").show();
		}else{
			$("#id_input").hide();
		}
	});
});

function find(){
	var data = {
		"userEmail":$("#find").find('#userEmail').val(),
		"userName":$("#find").find('#userName').val(),
		"type":$("input[name=find_btn]:checked").data("find")
	}
	if(data.type != undefined && data.type != "id"){
		data['userId']= $("#find").find('#userId').val();
	}
	var json = JSON.stringify(data);
	$.ajax({
		url:"/rest/serial/insert",
		type:"PUT",
		contentType: 'application/json',
		dataType: 'json',
		data:json,
		success:function(resp){
			if(resp < 0){
				console.log("존재하지 않은 회원");
			}else{
				console.log("인증코드 전송");
			}
		}
	});
	
	console.log();
}