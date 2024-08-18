$(function(){
	$(".serial_btn").click(find);
	
	$("#check_btn").click(check);
	
	$(".check_btn").click(serialCheck);
	
	// 초기화: 기본 선택된 박스에 스타일 적용
    $('#select-id-box').addClass('selected');

   $('.tab-link').on('click', function() {
        const targetTab = $(this).data('tab');
        $('.tab-link').removeClass('active');
        $(this).addClass('active');
        $("#check_btn").attr("disabled", true);
        $("#find-id-code-group").addClass("hidden");
        $("#find-password-code-group").addClass("hidden");
        $("#check_btn").addClass("hidden");

        $('.tab-content').removeClass('active');
        $('#' + targetTab).addClass('active');
    });
    
    // 인증번호 전송 버튼 클릭 처리
    $('.send-code-button').on('click', function() {
        const formType = $(this).data('form');
        $('#'+formType+'-code-group').removeClass('hidden');
    });
});

function serialCheck(){
	var type = $(".tab-link").filter(".active").data("find");
	var tabId = "find-"+type+"-tab";
	var serialNo = $("#"+tabId+"-serialNo").val();
	var serial = $("#"+tabId+"-serial").val();
	
	var data = {
		serialNo : serialNo,
		serial : serial
	}
	$.ajax({
		url:"/rest/serial/checkSerial",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			if(resp > 0){
				$(serial).attr("disabled", true);
				$("#check_btn").removeClass("hidden");
			}
		}
	})
}

function check(){
	var type = $(".tab-link").filter(".active").data("find");
	var tabId = "find-"+type+"-tab";
	var serialNo = $("#"+tabId+"-serialNo").val();
	var serial = $("#"+tabId+"-serial").val();
	var userEmail = $("#"+tabId).find('#userEmail').val();
	var userId = $("#"+tabId).find('#userId').val();
	var userName = $("#"+tabId).find('#userName').val();
	
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
				$('.find-account-container').hide(); // 폼 숨김
        		$('#result-id').removeClass('hidden'); // 결과 표시
				$("#found-id").text(resp.userId);
			}else if(type == "pw"){
				console.log("초기비밀번호는"+resp.userPw);
			}
		}
	});
}

function find(){
	var type = $(".tab-link").filter(".active").data("find");
	var tabId = "find-"+type+"-tab";
	var data = {
		"userEmail":$("#"+tabId).find('#userEmail').val(),
		"userName":$("#"+tabId).find('#userName').val(),
		"type":type
	}
	if(data.type != undefined && data.type != "id"){
		data['userId']= $("#"+tabId).find('#userId').val();
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