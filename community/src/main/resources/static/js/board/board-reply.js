$(function(){
	
	//$("#addReplyBtn").click(replyFunc(0));
	
	$("#addReplyBtn").click(function(){
		replyFunc(0)
	});
	
	$(document).on("click", "#replyEditBtn", replyUpdate);
});

function replyUpdate(){
	
	var data = {}
	var boardNo = $("#boardNo").text();
	var replyContent = $("#editText").val();
	var tr = $("#editText").parent().parent()[0];
	var replyNo = tr.id.substring(tr.id.indexOf('_')+1, tr.id.length);

	data['replyContent'] = replyContent;	
	data['replyNo'] = replyNo;	
	
	$.ajax({
		url:"/rest/reply/update",
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

function reply2(upperNo, subupperNo=0, seatNo=1){
	var no = 0
	if(subupperNo == 0){
		no = upperNo;
	}else{
		no = subupperNo;
	}
	var tr = $("#reply"+seatNo+"_"+no);
	
	var html = "";
	html += "<td><input type=text id=reply2Content value=''></td>";
	html += "<td><button id=addReply2Btn onclick='replyFunc("+upperNo+", "+subupperNo+", "+seatNo+")'>등록</button></td>";
	tr.append(html);
}

function replyFunc(upperNo=0, subupperNo=0 ,seatNo=0){
	
	var data = {};
	var content = $("input[name=replyContent]").val();
	var boardNo = $("#boardNo").text();
	if(upperNo != 0){
		data["upperNo"] = upperNo;
		data["replyContent2"] = $("#reply2Content").val();
		data["seatNo"] = seatNo;
		if(subupperNo != 0){
			data["subupperNo"] = subupperNo;
		}
	}
	
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
	$("#replyContent").val(" ");
	var html ="";
	var mainReply = [];
	
	for(var i = 0; i < data.length; i++){
		if(data[i].upperNo == 0){
			mainReply.push(data[i]);
			data.splice(i, 1);
			i--;
		}
	}
	
	$.each(mainReply, function(index, item){
		html += "<tr id=reply1_"+item.replyNo+">";
		html += "<td>"+item.userId+"</td>";
		html += "<td>"+item.replyContent+"</td>";
		html += "<td>"+item.modDate+"</td>";
		html += "<td><a href=javascript:replyDelete("+item.replyNo+")>삭제</a></td>"; //아이콘 넣을 예정
		html += "<td><a href=javascript:replyEdit("+item.replyNo+")>수정</a></td>"; //아이콘 넣을 예정
		html += "<td><a href=javascript:reply2("+item.replyNo+")>답글</a></td>"; //아이콘 넣을 예정
		html += "</tr>";
		$.each(data, function(index2, item2){
			if(item2.upperNo == item.replyNo){
				html += "<tr id=reply"+(item2.seatNo+1)+"_"+item2.replyNo+">";
				html += "<td>"
				for(var i = 0; i < item2.seatNo; i++){
					html += "==="
				}
				html += item2.userId+"</td>";
				html += "<td>"+item2.replyContent+"</td>";
				html += "<td>"+item2.modDate+"</td>";
				html += "<td><a href=javascript:replyDelete("+item2.replyNo+")>삭제</a></td>"; //아이콘 넣을 예정
				html += "<td><a href=javascript:replyEdit("+item2.replyNo+")>수정</a></td>"; //아이콘 넣을 예정
				html += "<td><a href=javascript:reply2("+item.replyNo+","+item2.replyNo+","+(item2.seatNo+1)+")>답글</a></td>"; //아이콘 넣을 예정
				html += "</tr>";
			}
		});
	});
	
	$("#replyDataList").html(html);
}

function replyEdit(replyNo){
	var boardNo = $("#boardNo").text();
	dataLoad(boardNo);
	
	var data = {"replyNo":replyNo};
	$.ajax({
		url:"/rest/reply/detile",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			//데이터 가져오기
			$("#reply_"+replyNo).empty();
	
			var html = "";
			html += "<td><input type=text id=editText value='"+resp.replyContent+"'></td>";
			html += "<td><button id=replyEditBtn>수정</button></td>";
	
			$("#reply_"+replyNo).html(html);
		}
	});
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




