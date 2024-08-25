$(function(){
    $(".popup-close-button").click(function(){
        popup.closePopup();
    });
    $(".popup-action").click(function(){

    })
});
const popup = {
    openPopup(title, context, inputList){
        popup.settingPopup(title, context, inputList);
        $("#popup").show();
    },closePopup(){
        $("#popup").hide();
        popup.resetPopup();
    },settingPopup(title, context, inputList){
        $("#popup-title").text(title);
        if(context != null & context != ""){
            $("#popup-context").text(context);
        }
        if(inputList != null){
            $.each(inputList, function(index, item){
                var html = popup.inputAppend(index, item.title, item.name);
                $("#popup-etc-context").append(html);
            });
        }
    },resetPopup(){
        $("#popup-title").text("");
        $("#popup-context").text("");
    },inputAppend(index, title, name){
        var html = '';
        html += '<div class="popup-input-group">'
        html += '<label for="popup-input">'+title+'</label>'
        html += '<input type="text" id="popup-input-'+index+'" name='+name+' placeholder="입력하세요">'
        html += '</div>'
        return html;
    },buttonTransaction(type, url, data){
        if(type == "api"){
            $.ajax({
                url:url,
                data:data,
            })
        }
    }
}