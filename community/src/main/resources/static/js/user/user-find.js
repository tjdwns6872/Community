$(function(){
	$(".serial_btn").click(find);
	
	$(".find_btn").click(check);
	
	$(".check_btn").click(serialCheck);
	
	// 초기화: 기본 선택된 박스에 스타일 적용
    $('#select-id-box').addClass('selected');

   $('.tab-link').on('click', function() {
        const targetTab = $(this).data('tab');
        $('.tab-link').removeClass('active');
        $(this).addClass('active');
        $("#find-id-code-group").addClass("hidden");
        $("#find-password-code-group").addClass("hidden");
        $("#check_btn").addClass("hidden");
        $(".check_btn").removeClass("hidden");

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
				$(".check_btn").addClass("hidden");
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
		async: false,
		success:function(resp){
			resultData(type, resp);
		}
	});
}

function resultData(type, resp){
	var html = "";
	$('.find-account-container').hide(); // 폼 숨김
  	$('#result-div').removeClass('hidden'); // 결과 표시
	console.log(type);
	if(type == "id"){				
	  	html += "<h3>아이디 찾기 완료</h3>"
	  	html += "<p>고객님의 아이디는 <strong>"+resp.userId+"</strong> 입니다.</p>"
	  	html +="<button class='go-find-button' onclick=location.href='/user/find'>비밀번호 찾기</button><br>"
	}else if(type == "pw"){
		console.log("??");
		html += "<h3>비밀번호 찾기 완료</h3>"
		html += "<p>초기비밀번호는 <strong>"+resp.userPw+"</strong> 입니다.</p>"
	}
	html +="<button class='go-login-button' onclick=location.href='/user/login'>로그인</button>"
	$("#result-div").html(html);
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