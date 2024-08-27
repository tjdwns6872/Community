$(function(){
	listLoad();
	
	$.ajax({
		url:"/rest/category/list",
		type:"GET",
		async: false,
		success:function(resp){
			categoryList(resp.category);
		}
	});
	
	$("#searchBtn").click(function(){
		var keyword = $("input[name=keyword]").val();
		var category = $("select[name=category]").val()
		listLoad(1, keyword, category);
	});
});

$(document).on("click", "#moveDetails", function(){
	
	location.href="/board/details?boardNo="+$(this).data("no");
});

function listLoad(page=1, keyword="", category=""){
	
	var data = {"page":page, "keyword":keyword, "category":category}
	
	$.ajax({
		url:"/rest/board/list",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			paging(resp.paging, "listLoad");
			listData(resp);
		}
	});
}

function listData(data){
	var list = data.boardList;
	if(list.length > 0 && list != undefined){
		$("#boardDataList").empty();		
	}
	var html = "";
	$.each(list, function(index, item){
		html += "<tr>";
		html += "<td>"+item.rowNum+"</td>";
		html += "<td>"+item.categoryName+"</td>";
		html += "<td><a href='#' id='moveDetails' data-no="+item.boardNo+">"+item.boardTitle+"</a></td>";
		html += "<td>"+item.userId+"</td>";
		html += "<td>"+item.modDate+"</td>";
		html += "<td>"+item.boardView+"</td>";
		html += "</tr>";
	});
	$("#boardDataList").html(html);
}

function categoryList(data){
	var html = "";
	html += "<option value>전체</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}



