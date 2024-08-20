$(function(){
	
	$("#addReplyBtn").click(function(){
		replyFunc(0)
	});
	
	$(document).on("click", "#replyEditBtn", replyUpdate);
});

function replyUpdate(){
	var data = {}
	var boardNo = $("#boardNo").text();
	var replyContent = $("#editText").val();
	var div = $("#editText").parent()[0];
	var replyNo = $(div).data('comment-id');
	data['replyContent'] = replyContent;	
	data['replyNo'] = replyNo;	
	$.ajax({
		url:"/rest/reply/update",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success:function(resp){
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
	var div = $("#reply"+seatNo+"_"+no);
	$(".reply-form").empty();
	var html = "";
	html += '	<textarea id=replyContent placeholder="답글을 입력하세요..."></textarea>'
    html += '	<button class="submit-reply-button" onclick="replyFunc('+upperNo+', '+subupperNo+', '+seatNo+')">답글 작성</button>'
	div.append(html);
	
	
}

function replyFunc(upperNo=0, subupperNo=0 ,seatNo=0){
	
	var data = {};
	var content = $("#replyContent").val();
	var boardNo = $("#boardNo").text();
	if(upperNo != 0){
		data["upperNo"] = upperNo;
		data["seatNo"] = seatNo;
		if(subupperNo != 0){
			data["subupperNo"] = subupperNo;
		}
	}
	
	data["replyContent"] = content;
	data["boardNo"] = boardNo;
	console.log(data);
	$.ajax({
		url:"/rest/reply/reg",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success:function(resp){
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
		html += '<div class="comment" data-comment-id='+item.replyNo+'>'
		html += '		<div class="comment-meta">'
        html += '			<span class="comment-author">'+item.userId+'</span>'
        html += '			<span class="comment-date">'+item.modDate+'</span>'
        html += '		</div>'
        html += '		<div class="comment-content">'
        html += item.replyContent
        html += '		</div>'
        html += '		<button class="reply-button" onclick="reply2('+item.replyNo+')">답글</button>'
        html += ' 	 <button class="reply-button" onclick="replyEdit('+item.replyNo+')">수정</button>'
        html += ' 	 <button class="reply-button" onclick=replyDelete('+item.replyNo+')>삭제</button>'
        html += '		<div class="reply-form" id=reply1_'+item.replyNo+'>'
        html += '		</div>'
        html += '	</div>'
		$.each(data, function(index2, item2){
			if(item2.upperNo == item.replyNo){
				html += '<div class="comment reply" data-comment-id='+item2.replyNo+' style="margin-left: '+30*(1+item2.seatNo)+'px;">'
				html += '		<div class="comment-meta">'
				html += '			<span class="comment-author">'+item2.userId+'</span>'
				html +='			<span class="comment-date">'+item2.modDate+'</span>'
				html += '		</div>'
                html += '		<div class="comment-content">'
                html += item2.replyContent
                html += '		</div>'
                html += '		<button class="reply-button" onclick="reply2('+item.replyNo+','+item2.replyNo+','+(item2.seatNo+1)+')">답글</button>'
                html += ' 	 <button class="reply-button" onclick="replyEdit('+item2.replyNo+')">수정</button>'
        		html += ' 	 <button class="reply-button" onclick=replyDelete('+item2.replyNo+')>삭제</button>'
        		html += '		<div class="reply-form" id=reply'+(item2.seatNo+1)+'_'+item2.replyNo+'>'
        		html += '		</div>'
				html += '</div>'
			}
		});
	});
	$(".comments-section").html(html);
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
			var div = $("div[data-comment-id="+replyNo+"]");
			div.empty();
	
			var html = "";
			html += "<div class=reply-form data-comment-id="+replyNo+">"
			html += '	<textarea id=editText placeholder="답글을 입력하세요...">'+resp.replyContent+'</textarea>'
    		html += '	<button class="submit-reply-button" id=replyEditBtn>답글 수정</button>'
    		html += "</div>"
	
			div.html(html);
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




