// Div Calling
const logoMenuMobile = document.querySelector(".logo-menu-mobile");
const mainMenuMobile = document.querySelector(".main-section")
const closeMenuIcon = document.querySelector(".top-menu-mobile i")
console.log(closeMenuIcon);



// Turn on the menu mobile
logoMenuMobile.addEventListener("click", ()=> {
    mainMenuMobile.style.transform = "translateX(0%)";  
});

// Turn off the menu mobile
closeMenuIcon.addEventListener("click", ()=> {
    mainMenuMobile.style.transform = "translateX(-100%)";
});