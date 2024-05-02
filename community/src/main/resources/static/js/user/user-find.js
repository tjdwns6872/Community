$(function(){
	$(".serial_btn").click(find);
	
	$("input[name=find_btn]").change(function(){
		if($(this).data("find") == "pw"){
			$("#id_input").show();
		}else{
			$("#id_input").hide();
		}
	});
	
	$("#check_btn").click(check);
});

function check(){
	var serial = $("input[name=serial]").val();
	var serialNo = $("input[name=serialNo]").val();
	var userEmail = $("#find").find('#userEmail').val();
	var userId = $("#find").find('#userId').val();
	var userName = $("#find").find('#userName').val();
	
	var type = $("input[name=find_btn]:checked").data("find");
	
	var data = {
		"serialNo":serialNo,
		"serial":serial,
		"userEmail":userEmail,
		"userId":userId,
		"userName":userName,
		"type": type
	}
	$.ajax({
		url:"/rest/serial/findData",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			if(type == "id"){				
				console.log(resp.userId);
			}else if(type == "pw"){
				console.log("초기비밀번호는"+resp.userPw);
			}
		}
	});
}

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
				$("input[name=serialNo]").val(resp);
			}
		}
	});
}