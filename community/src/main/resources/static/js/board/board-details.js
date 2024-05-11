$(function(){
	
	var boardNo = $("#boardNo").text();
	dataLoad(boardNo);
	
	$("#deleteBtn").click(function(){
		
		var data = {"boardNo":boardNo}
		
		console.log(data);
		
		$.ajax({
			url:"/rest/board/delete",
			type:"DELETE",
			contentType: 'application/json',
			dataType: 'json',
			data:JSON.stringify(data),
			success:function(resp){
				console.log(resp);
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
	console.log(data)
	if(data.userNo == $("#userNo").text()){
		$("#editBtn").show();
		$("#deleteBtn").show();
	}
	$("#boardTitle").text(data.boardTitle);
	$("#categoryName").text(data.categoryName);
	$("#boardContent").html(data.boardContent);
}



