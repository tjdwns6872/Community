$(function(){
	listLoad();
	
	$("#insertBtn").click(boardInsert);
});

function boardInsert(){
	var data = {};
	var form = $("#insertForm").serializeArray();
	$.each(form, function(){
		data[this.name]= this.value;
	});
	
	$.ajax({
		url:"/rest/board/reg",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			console.log(resp);
		}
	});
}

function listLoad(){
	$.ajax({
		url:"/rest/category/list",
		type:"GET",
		success:function(resp){
			categoryList(resp.category);
		}
	});
}

function categoryList(data){
	var html = "";
	html += "<option>선택</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}




