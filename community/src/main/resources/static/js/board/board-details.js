$(function(){
	
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
		$("#editBtn").show();
		$("#deleteBtn").show();
	}
	
	var html ="";
	html += "<tr>";
	html += "<td>"+data.boardTitle+"</td>";
	html += "<td>"+data.categoryName+"</td>";
	html += "<td>"+data.boardContent+"</td>";
	if(data.fileNo != null){		
		html += "<td><a href='javascript:fileDownload("+data.fileNo+")'>"+data.fileName+"</a></td>";
	}
	html += "</tr>";
	
	$("#boardDataDetails").html(html);
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


