// Access class from HTML
let shoppingCart = document.querySelector(".shopping-cart-js")
let cartIc = document.querySelector(".cart-ic");
console.log(cartIc);

cartIc.addEventListener("click", () => {
    document.body.classList.add("darken-2");
    shoppingCart.style.transform = "translateX(0)";
});

shoppingCart.addEventListener("click", (e) => {
    console.log(e.target);
});