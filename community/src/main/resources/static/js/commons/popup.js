$(function(){
    $(document).on("click", ".popup-close-button, .popup-close-action", function(){
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
                var html = popup.inputAppend(index, item.title, item.name, item.type, item.value);
                $("#popup-etc-context").append(html);
            });
        }
        if(buttonItem != null){
            popup.buttonTransaction(buttonItem.type, buttonItem.url, buttonItem.afUrl);
        }else{
            popup.buttonTransaction(null, '', '');
        }
    },resetPopup(){
        $("#popup-title").text("");
        $("#popup-context").text("");
        $("#popup-etc-context").empty();
        $("#popup-btn").empty();
    },inputAppend(index, title, name, type, value){
        var html = '';
        html += '<div class="popup-input-group">'
        html += '<label for="popup-input">'+title+'</label>'
        if(value != undefined){
            html += '<input type='+type+' id="popup-input-'+index+'" name='+name+' placeholder="입력하세요" value='+value+'>'
        }else{
            html += '<input type='+type+' id="popup-input-'+index+'" name='+name+' placeholder="입력하세요">'
        }
        html += '</div>'
        return html;
    },buttonTransaction(type=null, url, afUrl){
        var html = "";
        if(type != null){
            html += "<button class='popup-action' data-type="+type+" data-url='"+url+"' data-afurl='"+afUrl+"'>확인</button>";
        }
        html += "<button class='popup-close-action'>닫기</button>";
        $("#popup-btn").append(html);
    },buttonClick(type, url, afUrl){
        if(type != null){
            if(type == "get"){
                var data = $("#popup-form").serialize();
            }else{
                var data = {};
                $.each($("#popup-form input"), function(index, item){
                    data[$(this).attr('name')] = $(this).val();
                });
                data = JSON.stringify(data);
            }
            $.ajax({
                url:url,
                data:data,
                type:type,
                contentType: 'application/json',
                dataType: 'json',
                success:function(resp){
                    window.location.href = afUrl;
                }
            })
        }
    }
}