$(function(){
	
	var boardNo = $("#boardNo").text();
	dataLoad(boardNo);
	
	$("#editBtn").click(function(){
		location.href="/board/edit?boardNo="+boardNo;
	});
	
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

function dataLoad(boardNo){
	
	var data = {"boardNo":boardNo}
	
	$.ajax({
		url:"/rest/board/details",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			dataInfo(resp);
		}
	});
}

function dataInfo(data){
	console.log(data);
	if(data.userNo == $("#userNo").text()){
		$("#editBtn").show();
		$("#deleteBtn").show();
	}
	$("#boardTitle").text(data.boardTitle);
	$("#categoryName").text(data.categoryName);
	$("#boardContent").html(data.boardContent);
	$("#fileName").text(data.fileName);
}



