// Access class from HTML
let shoppingCart = document.querySelector(".shopping-cart-js");
let cartIc = document.querySelector(".cart-ic");
let cartCloseIc = document.querySelector("#cart-close-ic");

cartIc.addEventListener("click", () => {
  document.body.classList.add("darken-2");
  shoppingCart.style.transform = "translateX(0)";
});

cartCloseIc.addEventListener("click", () => {
  document.body.classList.remove("darken-2");
  shoppingCart.style.transform = "translateX(100%)";
});

document.addEventListener("click", (e) => {
  const isClickInside =
    shoppingCart.contains(e.target) || cartIc.contains(e.target);

  if (isClickInside == false) {
    document.body.classList.remove("darken-2");
    shoppingCart.style.transform = "translateX(100%)";
  }
});
