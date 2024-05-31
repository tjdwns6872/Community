$(function(){
	
	$("#addReplyBtn").click(replyFunc);
	
});

function replyFunc(){
	
	var data = {};
	var content = $("input[name=replyContent]").val();
	var boardNo = $("#boardNo").text();
	
	data["replyContent"] = content;
	data["boardNo"] = boardNo;

	$.ajax({
		url:"/rest/reply/reg",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success:function(resp){
			console.log(resp);
			dataLoad(boardNo);
		}
	});
}

function replyList(data){
	var html ="";
	
	$.each(data, function(index, item){
		html += "<tr id=reply_"+item.replyNo+">";
		html += "<td>"+item.userId+"</td>";
		html += "<td>"+item.replyContent+"</td>";
		html += "<td>"+item.modDate+"</td>";
		html += "<td><a href=javascript:replyDelete("+item.replyNo+")>삭제</a></td>"; //아이콘 넣을 예정
		html += "<td><a href=javascript:replyEdit("+item.replyNo+")>수정</a></td>"; //아이콘 넣을 예정
		html += "</tr>";
	});
	
	$("#replyDataList").html(html);
}

function replyEdit(replyNo){
	
	var data = {"replyNo":replyNo};
	
	$.ajax({
		url:"/rest/reply/detile",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			console.log(resp);
		}
	});
	
	//데이터 가져오기
	$("#reply_"+replyNo).empty();
	
	var html = "";
	html += "<td><input type=text id=editText></td>";
	html += "<td><button>수정</button></td>";
	
	$("#reply_"+replyNo).html(html);
}

function replyDelete(replyNo){
	var data = {"replyNo":replyNo}
	var boardNo = $("#boardNo").text();
	$.ajax({
		url:"/rest/reply/delete",
		type:"DELETE",
		contentType: 'application/json',
		dataType: 'json',
		data:JSON.stringify(data),
		success:function(resp){
			if(resp > 0){
				console.log("삭제 완료");
				dataLoad(boardNo);
			}else{
				console.log("실패");
			}
		}
	});
}




