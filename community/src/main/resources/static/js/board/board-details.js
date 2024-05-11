$(function(){
	dataLoad($("#boardNo").text());
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
}



