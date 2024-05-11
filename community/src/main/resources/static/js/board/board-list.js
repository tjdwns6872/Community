$(function(){
	listLoad();
});

$(document).on("click", "#moveDetails", function(){
	
	if($("#userNo").text() != $(this).data("uno")){		
		location.href="/board/details?boardNo="+$(this).data("no");
	}else{
		//console.log("수정칸");
		location.href="/board/details?boardNo="+$(this).data("no");
	}
});

function listLoad(page=0, keyword="", categroy=""){
	
	var data = {"page":page, "keyword":keyword, "categroy":categroy}
	
	$.ajax({
		url:"/rest/board/list",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data,
		success:function(resp){
			listData(resp);
		}
	});
}

function listData(data){
	var list = data.boardList;
	
	
	var html = "";
	$.each(list, function(index, item){
		console.log(item);
		html += "<td>"+item.boardNo+"</td>";
		html += "<td>"+item.categoryName+"</td>";
		html += "<td><a href='#' id='moveDetails' data-no="+item.boardNo+" data-uno="+item.userNo+">"+item.boardTitle+"</a></td>";
		html += "<td>"+item.userId+"</td>";
		html += "<td>"+item.modDate+"</td>";
	});
	$("#boardDataList").html(html);
}




