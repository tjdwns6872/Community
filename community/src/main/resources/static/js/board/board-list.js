$(function(){
	listLoad();
});

function listLoad(page=0, keyword=""){
	
	var data = {"page":page, "keyword":keyword}
	
	$.ajax({
		url:"/rest/board/list",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			
		}
	});
}