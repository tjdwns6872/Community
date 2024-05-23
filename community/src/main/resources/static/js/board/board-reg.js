$(function(){
	listLoad();
	
	$("#insertBtn").click(boardInsert);
});

function boardInsert(){
	var data = {};
	var form = $("#insertForm").serializeArray();
	var inputFile = $("input[name=boardFile]");
	var files = inputFile[0].files;
	var file = files[0];
	
	var reader = new FileReader();
	var base64String;
	reader.onload = function(e) {
		base64String = e.target.result.split(',')[1];
	};
	reader.readAsDataURL(file);
	
	$.each(form, function(){
		data[this.name]= this.value;
	});
	
	setTimeout(function() {
		data["uploadFile"] = base64String;
		insertAjax(data);
	}, 200);
}

function insertAjax(data){
	$.ajax({
		url:"/rest/board/reg",
		type:"PUT",
		data:JSON.stringify(data),
    	contentType: "application/json",
		dataType: 'json',
		success:function(resp){
			if(resp > 0){
				console.log("글 작성 성공");
			}
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

function fileToBase64(file){
	var reader = new FileReader();
	var base64String;
	reader.onload = function(e) {
		base64String = e.target.result.split(',')[1];
	};
	reader.readAsDataURL(file);
	return base64String;
}

function categoryList(data){
	var html = "";
	html += "<option>선택</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}




