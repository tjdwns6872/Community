$(function(){
    $(".popup-close-button").click(function(){
        popup.closePopup();
    });

    $(document).on("click", ".popup-action", function(){
        popup.buttonClick($(this).data("type"), $(this).data("url"), $(this).data("afurl"));
    });
});
const popup = {
    openPopup(title, context, inputList=null, buttonItem=null){
        popup.settingPopup(title, context, inputList, buttonItem);
        $("#popup").show();
    },closePopup(){
        $("#popup").hide();
        popup.resetPopup();
    },settingPopup(title, context, inputList, buttonItem){
        $("#popup-title").text(title);
        if(context != null & context != ""){
            $("#popup-context").text(context);
        }
        if(inputList != null){
            $.each(inputList, function(index, item){
                var html = popup.inputAppend(index, item.title, item.name, item.type);
                $("#popup-etc-context").append(html);
            });
        }
        if(buttonItem != null){
            popup.buttonTransaction(buttonItem.type, buttonItem.url, buttonItem.afUrl);
        }
    },resetPopup(){
        $("#popup-title").text("");
        $("#popup-context").text("");
        $("#popup-etc-context").empty();
        $("#popup-btn").empty();
    },inputAppend(index, title, name, type){
        var html = '';
        html += '<div class="popup-input-group">'
        html += '<label for="popup-input">'+title+'</label>'
        html += '<input type='+type+' id="popup-input-'+index+'" name='+name+' placeholder="입력하세요">'
        html += '</div>'
        return html;
    },buttonTransaction(type=null, url, afUrl){
        var html = "";
        html += "<button class='popup-action' data-type="+type+" data-url='"+url+"' data-afurl='"+afUrl+"'>확인</button>";
        $("#popup-btn").append(html);
    },buttonClick(type, url, afUrl){
        if(type != null){
            var data = $("#popup-form").serialize();
            $.ajax({
                url:url,
                data:data,
                type:type,
                success:function(resp){
                    window.location.href = afUrl;
                }
            })
        }
    }
}