$(function(){
	listLoad();
});

function listLoad(){
	
	$.ajax({
		url:"/rest/category/list",
		type:"GET",
		success:function(resp){
			console.log(resp);
		}
	});
}