function popup(title, context){
    const popup = document.getElementById("popup");
    const openPopupButton = document.getElementById("openPopup");
    const closeButton = document.querySelector(".popup-close-button");

    openPopupButton.addEventListener("click", () => {
        popup.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
}