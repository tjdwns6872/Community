function paging(data, type){
	var html = "";
	if(data.hasPreviousPage == true){
		html += "<a href=javascript:"+type+"(0)>처음</a>"
	}
	
	for(var i = 1; i <= data.lastPage; i++){
		if(data.currentPage == i){
			html += "<a>"+i+"</a>"
		}else{			
			html += "<a href=javascript:"+type+"("+i+")>"+i+"</a>"
		}
	}
	
	if(data.hasNextPage == true){
		html += "<a href=javascript:"+type+"("+data.totalPageCount+")>다음</a>"
	}
	
	$("#paginDiv").html(html);
}