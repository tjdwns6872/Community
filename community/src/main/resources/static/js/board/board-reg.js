$(function(){
	listLoad();
});

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
		html += "<option data-no="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}




