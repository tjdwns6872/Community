$(function(){

	var urlParams = new URL(location.href).searchParams;
	var page = urlParams.get('page');
	listLoad(page);
	
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
	var page = $("#currentPage").val();
	location.href="/board/details?boardNo="+$(this).data("no")+"&page="+page;
});

function listLoad(page=1, keyword="", category=""){
	if(page == undefined){
		page = 1;
	}
	var data = {"page":page, "keyword":keyword, "category":category}
	
	$.ajax({
		url:"/rest/board/list",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			history.replaceState({}, null, location.pathname);
			var result = resp.result;
			if(result.code == 200){
				paging(result.data.paging, "listLoad");
				listData(result.data);
			}			
		}
	});
}

function listData(data){
	var list = data.boardList;
	var paging = data.paging;

	if(list.length > 0 && list != undefined){
		$("#boardDataList").empty();		
	}
	var html = "";
	html += "<input type=hidden id=currentPage value="+paging.currentPage+">"
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



