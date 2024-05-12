$(function(){
	
	var boardNo = $("#boardNo").val();
	dataLoad(boardNo);
	
	$("#updateBtn").click(boardUpdate);
});

function boardUpdate(){
	var data = {};
	var form = $("#updateForm").serializeArray();
	$.each(form, function(){
		data[this.name]= this.value;
	});
	
	$.ajax({
		url:"/rest/board/update",
		type:"PUT",
		data:JSON.stringify(data),
		contentType: 'application/json',
		dataType: 'json',
		success:function(resp){
			if(resp > 0){
				location.href="/board/details?boardNo="+$("#boardNo").val();
			}
		}
	});
}

function dataLoad(boardNo){
	
	$.ajax({
		url:"/rest/category/list",
		type:"GET",
		async: false,
		success:function(resp){
			categoryList(resp.category);
		}
	});
	
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
	$("#boardTitle").val(data.boardTitle);
	$("#categoryName").val(data.categoryName);
	$("#boardContent").html(data.boardContent);
	
	$("#categoryList").val(data.categoryNo).prop("selected", true);
}

function categoryList(data){
	var html = "";
	html += "<option>선택</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}


