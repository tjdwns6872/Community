$(function(){
    $(".popup-close-button").click(function(){
        popup.closePopup();
    });
});
const popup = {
    openPopup(title, context){
        popup.settingPopup(title, context);
        $("#popup").show();
    },closePopup(){
        $("#popup").hide();
        popup.resetPopup();
    },settingPopup(title, context){
        $("#popup-title").text(title);
        $("#popup-context").text(context);
    },resetPopup(){
        $("#popup-title").text("");
        $("#popup-context").text("");
    }
}