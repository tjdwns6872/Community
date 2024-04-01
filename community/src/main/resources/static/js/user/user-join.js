$(function(){
	$("#join_btn").click(join);
});

function join(){
	var formSerializeArray = $('#join-form').serializeArray();
		var object = {};
		for (var i = 0; i < formSerializeArray.length; i++){
    		object[formSerializeArray[i]['name']] = formSerializeArray[i]['value'];
		}
 
		var json = JSON.stringify(object);
		
		$.ajax({
			url:"/rest/user/join",
			type:"PUT",
			contentType: 'application/json',
			dataType: 'json',
			data:json,
			success:function(resp){
				console.log(resp);
			}
		});
}


