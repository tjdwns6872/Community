function paging(data, type){
	var html = "";
	if(data.hasPreviousPage == true){
		html += "<span><a href=javascript:"+type+"(0)>처음</a></span>"
	}
	
	for(var i = 1; i <= data.lastPage; i++){
		if(data.currentPage == i){
			html += "<span><a>"+i+"</a></span>"
		}else{			
			html += "<span><a href=javascript:"+type+"("+i+")>"+i+"</a></span>"
		}
	}
	
	if(data.hasNextPage == true){
		html += "<span><a href=javascript:"+type+"("+data.totalPageCount+")>다음</a></span>"
	}
	
	$("#paginDiv").html(html);
}