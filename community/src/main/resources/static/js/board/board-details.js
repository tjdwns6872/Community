$(function(){
	
	// 답글 버튼 클릭 시 답글 입력창 표시
    $('.reply-button').on('click', function() {
        $(this).siblings('.reply-form').toggleClass('hidden');
    });

    // 댓글 작성 버튼 클릭 처리 (여기에 서버로 전송 로직 추가 가능)
    $('.submit-comment-button').on('click', function() {
        // 댓글 작성 처리 로직
        alert('댓글이 작성되었습니다.');
    });

    // 답글 작성 버튼 클릭 처리 (여기에 서버로 전송 로직 추가 가능)
    $('.submit-reply-button').on('click', function() {
        // 답글 작성 처리 로직
        alert('답글이 작성되었습니다.');
    });

    // 목록으로 이동 버튼 클릭
    $('.go-list-button').on('click', function() {
        window.location.href = '/board'; // 목록 페이지로 이동
    });

    // 좋아요 버튼 클릭 처리
    $('.like-button').on('click', function() {
        alert('이 게시글을 좋아합니다.');
    });
	
	var boardNo = $("#boardNo").text();
	dataLoad(boardNo);
	
	$("#editBtn").click(function(){
		location.href="/board/edit?boardNo="+boardNo;
	});
	
	$("#listBtn").click(function(){
		location.href="/board/list";
	});
	
	$("#likeBtn").click(likeFunc);
	
	$("#deleteBtn").click(function(){
		
		var data = {"boardNo":boardNo}
		
		$.ajax({
			url:"/rest/board/delete",
			type:"DELETE",
			contentType: 'application/json',
			dataType: 'json',
			data:JSON.stringify(data),
			success:function(resp){
				if(resp > 0){
					console.log("삭제 완료");
					location.href="/board/list";
				}else{
					console.log("실패");
				}
			}
		});
	});
	
});

function likeFunc(){
	var data = {}
	var boardNo = $("#boardNo").text();
	data["boardNo"] = boardNo;
	
	$.ajax({
		url:"/rest/board/like",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success:function(resp){
			//하트 버튼 색상 변경 예정
			dataLoad(boardNo);
		}
	});
}

function dataLoad(boardNo){
	
	var data = {"boardNo":boardNo}
	
	$.ajax({
		url:"/rest/board/details",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		async:false,
		success:function(resp){
			dataInfo(resp);
		}
	});
}

function dataInfo(resp){
	var data = resp.data;
	var reply = resp.reply;
	
	if(data.userNo == $("#userNo").text()){
		$("#editBtn").removeClass('hidden');
		$("#deleteBtn").removeClass('hidden');
	}
	
	$(".post-category").html("카테고리: <strong>"+data.categoryName+"</strong>");
	$(".post-content").html(data.boardContent);
	$(".post-author").html("작성자: <strong>작성자명</strong>");
	
	if(data.fileNo != null){		
		$(".post-attachments").html("<p>첨부파일: <a href='javascript:fileDownload("+data.fileNo+")'>"+data.fileName+"</a></p>");
	}
	 replyList(reply);
}

function fileDownload(fileNo){
	var data = {"fileNo":fileNo};
	
	$.ajax({
		url:"/rest/file/download",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			base64ToFile(resp);
		}
	});
}

function base64ToFile(data){
	var base64 = data.data;
	
	var byteString = atob(base64);
	
	var byteNumbers = new Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
   	var blob = new Blob([byteArray]);
    	
    var file = new File([blob], data.fileName);
    
    var url = URL.createObjectURL(file);

    var a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}


