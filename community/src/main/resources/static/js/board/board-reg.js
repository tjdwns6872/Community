$(function(){
	listLoad();
	
	$("#insertBtn").click(boardInsert);
});

function boardInsert(){
	var data = {};
	var form = $("#insertForm").serializeArray();
	var inputFile = $("input[name=boardFile]");
	if(inputFile.val()!=''){
		var files = inputFile[0].files;
		var file = files[0];
		data["fileName"] = file.name;
	
		var reader = new FileReader();
		var base64String;
		reader.onload = function(e) {
			base64String = e.target.result.split(',')[1];
			data["uploadFile"] = base64String;
		};
		reader.readAsDataURL(file);
	}
	
	$.each(form, function(){
		data[this.name]= this.value;
	});
	
	setTimeout(function() {
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
		async:false,
		success:function(resp){
			if(resp > 0){
				console.log("글 작성 성공"+resp);
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

function categoryList(data){
	var html = "";
	html += "<option>선택</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}




