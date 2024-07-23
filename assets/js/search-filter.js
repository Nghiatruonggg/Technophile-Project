// Access class from HTML
const searchIc = document.querySelector(".search-desktop");
const searchBox = document.querySelector(".search-box");
const searchCloseIc = document.querySelector(".search-close-ic");
const searchProduct = document.querySelector(".search-product-js");
// console.log(searchIc);

// Search Popup Function
const openSearchPopup = () => {
  searchIc.addEventListener("click", () => {
    document.body.classList.add("darken");
    searchBox.style.opacity = "1";
    searchCloseIc.style.opacity = "1";
    searchBox.style.zIndex = "99";
  });
};

openSearchPopup();

const closeSearchPopup = () => {
  searchCloseIc.addEventListener("click", () => {
    document.body.classList.remove("darken");
    searchBox.style.opacity = "0";
    searchCloseIc.style.opacity = "0";
    searchBox.style.zIndex = "-99";
  });
};

closeSearchPopup();

document.addEventListener("click", function (event) {
  const isClickInside =
    searchBox.contains(event.target) || searchIc.contains(event.target);
  if (isClickInside == false) {
    document.body.classList.remove("darken");
    searchBox.style.opacity = "0";
    searchCloseIc.style.opacity = "0";
    searchBox.style.zIndex = "-99";
  }
});

const mobileProductforSearch_API = "https://fhplfd-3000.csb.app/mobile-products";

const getApi_SearchPopup = async (url) => {
  let response = await axios.get(url);
  return response.data;
}

let data = [];
const storeData = async () => {
  data = await getApi_SearchPopup(mobileProductforSearch_API);
  searchRender(data);
}

storeData();


// Render for Search Popup
const searchRender = (data) => {
  let HTML = ``;
  data.forEach((value) => {
    // console.log(value.mainImage);
    HTML += `<div class="col-12 col-sm-12 col-md-12">
    <div class="wrap-search-product">
        <a href="./product-detail.html?id=${value.id}">
            <div class="search-product-info">
                
                <div class="search-image">
                    <img src="${value.mainImage}" alt="${value.name}">
                </div>

                <div class="search-text">
                    <p class="search-name">${value.name}</p>
                    <p class="search-price">${value.price}</p>
                </div>

            </div>
        </a>

        <div class="add-to-cart-button">
            <button type="button">Add To Cart</button>
        </div>    
    </div>
</div>`;
  });

  searchProduct.innerHTML = HTML;

  // Add to cart
  let addBtn = document.querySelectorAll(".add-to-cart-button button");
  addBtn.forEach((button) => {
    button.addEventListener("click", () => {
      addToCartClicked(button);
    });
  });

  // Take infos from button
  const addToCartClicked = (button) => {
    let buttonParent = button.parentElement;
    let divParent = buttonParent.parentElement;
    
    // console.log(divParent);

    let price = divParent.querySelector(".search-product-info .search-price").innerHTML;
    let name = divParent.querySelector(".search-product-info .search-name").innerHTML;
    let imgSrc = divParent.querySelector(".search-image img").src;
    // console.log(imgSrc);
    addToCartItem(price, name, imgSrc);


  }

  // Show Images + Price to Cart
  const addToCartItem = (price, name, imgSrc) => {
    let productRow = document.querySelector("#product-row-js");

    // Create div class
    let divEl = document.createElement("div");

    // Put divEl into productRow
    divEl.classList.add("product-wrap");

    let cartHTML = `
    <div class="product-cart">
      <div class="product-cart-image">
        <img src="${imgSrc}" alt="${name}">
        <i id="remove-btn" class="fa-solid fa-xmark"></i>
      </div>
    
      <div class="product-cart-text">
        <p class="product-name">${name}</p>
        <p class="product-price">${price}</p>
      </div>
    
    </div>
    
    <div class="product-quantity">
      <button class="minus-button" type="button"><i class="fa-solid fa-minus"></i></button>
      <span>1</span>
      <button class="plus-button" type="button"><i class="fa-solid fa-plus"></i></button>
    </div>
    `;

    divEl.innerHTML = cartHTML;

    // Check to see if there are the same products on cart
    let cartImgEl = document.querySelectorAll(".product-cart-image");
    let isDuplicated = false;

    cartImgEl.forEach((item) => {
      let itemImg = item.querySelectorAll("img");
      itemImg.forEach((value) => {
        if (value.src == imgSrc) {
          alert("Products Already Existed");
          isDuplicated = true;
        }
      });
    });

    if (isDuplicated == true) {
      return null;
    }

    productRow.appendChild(divEl);

    saveCartToLocalStorage();
    updateCartPrice();

    cartFunction(divEl);

  };

  // Seperate remove + quantity function
  const cartFunction = (divEl) => {
    // console.log(divEl);

    const removeProduct = (button) => {
      let buttonParent = button.parentElement.parentElement.parentElement;
      return buttonParent.remove();
    }
    // Remove Function
    let removeBtn = divEl.querySelectorAll(".product-cart-image i");
    // console.log(removeBtn);
    removeBtn.forEach((button) => {
      button.addEventListener("click", () => {
        removeProduct(button)
        saveCartToLocalStorage();
        updateCartPrice();
      })
    });

    // Quantity Function
    const spanEl = divEl.querySelector(".product-quantity span");
    const minusBtn = divEl.querySelector(".minus-button");
    const plusBtn = divEl.querySelector(".plus-button");

    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(spanEl.innerHTML);
      if (quantity > 1) {
        spanEl.innerHTML = quantity - 1;
      }
      saveCartToLocalStorage();
      updateCartPrice();
    });

    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(spanEl.innerHTML);
      spanEl.innerHTML = quantity + 1;
      saveCartToLocalStorage();
      updateCartPrice();
    });
  };
  



  // Save cart to local storage
const saveCartToLocalStorage = () => {
  let productWraps = document.querySelectorAll(".product-wrap");
  let cartItems = [];

  productWraps.forEach((productWrap) => {
    let imgSrc = productWrap.querySelector(".product-cart-image img").src;
    let name = productWrap.querySelector(".product-name").innerHTML;
    let price = productWrap.querySelector(".product-price").innerHTML;
    let quantity = productWrap.querySelector(".product-quantity span").innerHTML;

    cartItems.push({
      imgSrc,
      name,
      price,
      quantity
    });
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Load cart from local storage
const loadCartFromLocalStorage = () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach((item) => {
    console.log(item);
    addToCartItemFromLocalStorage(item.price, item.name, item.imgSrc, item.quantity);
  });
};

// Add cart from localStorage
const addToCartItemFromLocalStorage = (price, name, imgSrc, quantity) => {
  let productRow = document.querySelector("#product-row-js");

  // Create div class
  let divEl = document.createElement("div");
  divEl.classList.add("product-wrap");

  let cartHTML = `
    <div class="product-cart">
      <div class="product-cart-image">
        <img src="${imgSrc}" alt="${name}">
        <i id="remove-btn" class="fa-solid fa-xmark"></i>
      </div>
      <div class="product-cart-text">
        <p class="product-name">${name}</p>
        <p class="product-price">${price}</p>
      </div>
    </div>
    <div class="product-quantity">
      <button class="minus-button" type="button"><i class="fa-solid fa-minus"></i></button>
      <span>${quantity}</span>
      <button class="plus-button" type="button"><i class="fa-solid fa-plus"></i></button>
    </div>
  `;

  divEl.innerHTML = cartHTML;
  productRow.appendChild(divEl);
  updateCartPrice();

  cartFunction(divEl);
}

  // Update Cart Price
  const updateCartPrice = () => {
    let productWrap = document.querySelectorAll(".product-wrap");
    let totalCart = 0;
    let totalQuantity = 0;

    productWrap.forEach((product) => {
      const quantity = product.querySelector(".product-quantity span").innerHTML;
      const quantityInt = parseInt(quantity);

      const price = product.querySelector(".product-cart-text .product-price").innerHTML;

      const priceFloat = parseFloat(price.replace("$", ""));

      totalCart += priceFloat * quantityInt;
      totalQuantity += quantityInt;
    });

    // Update Total Price
    let totalEl = document.querySelector(".cart-subtotal span");
    totalEl.innerHTML = totalCart + "$";

    // Add quantity to cartIC
    let cartQuantity = document.querySelector(".user-logo i span");
    cartQuantity.innerHTML = totalQuantity;

    if (totalQuantity > 10) {
      cartQuantity.innerHTML = "10+";
    } 
   
  };

  loadCartFromLocalStorage();


};



// Filter by Keyword
const filterBySearchTerm = (data, searchTerm) => {
  return data.filter((item) => {
    const oldTitle = item.name.toLowerCase();
    return oldTitle.includes(searchTerm);
  });
}


// All Type Search
const filterProduct = () => {
  // Take input from user typing in
  let textSearch = document.querySelector("#search-input input").value;
  let searchTerm = textSearch.toLowerCase().trim(); // Convert dinput value into lowercase and remove whitespace

  let filteredData = data;

  // Filter by Keyword
  filteredData = filterBySearchTerm(data, searchTerm);

  searchRender(filteredData); // Display Data 
};


let clearTime;

// Event Listening on Input Search
let inputSearch = document.querySelector("#search-input input");
inputSearch.addEventListener("input", () => {
  clearTimeout(clearTime);

  setTimeout(()=> {
    filterProduct();
  }, 1000);

});
