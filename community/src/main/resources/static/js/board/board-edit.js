var editor;
$(function(){
	
	var boardNo = $("#boardNo").val();
	editor = CKEDITOR.replace('editor');
	dataLoad(boardNo);
	
	$("#updateBtn").click(boardUpdate);
	
});

function boardUpdate(){
	var data = {};
	$("#updateForm").append("<input type=hidden name=boardContent>");
	$("input[name=boardContent]").val(editor.getData());
	var form = $("#updateForm").serializeArray();
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
		updateAjax(data);
	}, 200);
}

function updateAjax(data){
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
			var result = resp.result;
			dataInfo(result.data);
		}
	});
}

function dataInfo(data){
	var data = data.data;
	$("#boardTitle").val(data.boardTitle);
	$("#categoryName").val(data.categoryName);
	
	if(data.fileNo > 0){		
		$('input[name=boardFile]').on('click.prevent', function(event) {
	        event.preventDefault();
      	});
		var html ="";
		html += "<li>";
		html += "<span>"+data.fileName+"</span>";
		html += "<button type=button class='delete-file' data-file-no="+data.fileNo+" onclick=javascript:deleteFile(this)>X</button>"
		html += "</li>";
		$("#fileList").html(html);
	}
	
	editor.setData(data.boardContent);
	
	$("#categoryList").val(data.categoryNo).prop("selected", true);
}

function deleteFile(el){
	var $this = $(el);
	var data = {"fileNo":$this.data('file-no')};
	var html = "";
	$.ajax({
		url:"/rest/board/file/delete",
		type:"GET",
		contentType: 'application/json',
		dataType: 'json',
		data:data
	});
	html += "<li>등록된 파일이 없습니다.</li>";
	$('input[name=boardFile]').off('click.prevent');
	$("#fileList").html(html);
}

function categoryList(data){
	var html = "";
	html += "<option>선택</option>";
	$.each(data, function(index, item){
		html += "<option value="+item.categoryNo+">"+item.categoryName+"</option>";
	});
	$("#categoryList").html(html);
}


