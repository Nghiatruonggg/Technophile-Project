const mobileProduct_API = "https://fhplfd-3000.csb.app/mobile-products";

// Call API from server to local
const getApi = async (url) => {
  let response = await axios.get(url);

  return response.data;
};

let dataMobileCategory = [];
const storeDataMobileCategory = async () => {
  dataMobileCategory = await getApi(mobileProduct_API);
  productsRender(dataMobileCategory);
};

storeDataMobileCategory();

// Show Products to HTML
let rowJS = document.querySelector(".row-js");
// console.log(rowJS);

// Render for mobile-categories
const productsRender = (data) => {
  let HTML = ``;

  data.forEach((value) => {
    HTML += `
        <div class="column column-3 column-2">
                        
            <div class="wrap-product">
                <a href="./product-detail.html?id=${value.id}">
                    <div class="product-image">
                        <img src="${value.mainImage}" alt="${value.name}">
                    </div>

                    <div class="product-text">
                        <p class="product-name">${value.name}</p>
                        <p class="product-price">${value.price}</p>
                    </div>
                </a>

                <div class="cart-product-button">
                <button><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
                          
        </div>
`;
  });

  // Fill product data out to HTML(row-js)
  rowJS.innerHTML = HTML;

  // Add to Cart
  let addToCart = document.querySelectorAll(".cart-product-button button");

  addToCart.forEach((button) => {
    button.addEventListener("click", () => {
      addToCartClicked(button);
    });
  });

  // Take infos from the button
  const addToCartClicked = (button) => {
    const buttonParent = button.parentElement;
    const cartItem = buttonParent.parentElement;

    let price = cartItem.querySelector(".product-price").innerHTML;
    let name = cartItem.querySelector(".product-name").innerHTML;
    let imgSrc = cartItem.querySelector(".product-image img").src;

    addToCartItem(price, name, imgSrc);
  };

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
    updateCartPrice();


  // Delete Products
  const removeProduct = (item) => {
    item.parentElement.parentElement.parentElement.remove();
  };

  let removeBtn = document.querySelectorAll("#remove-btn");
  removeBtn.forEach((item) => {
    item.addEventListener("click", () => {
      removeProduct(item);
      updateCartPrice();
    });
  });

  // Quantity Function (Need to be fixed)
  let spanElement = document.querySelectorAll(".product-quantity span");
  spanElement.forEach((spanEl) => {
    let minusBtn = spanEl.previousElementSibling;
    let plusBtn = spanEl.nextElementSibling;

    minusBtn.addEventListener("click", () => {
      let quantity = parseInt(spanEl.innerHTML);
      if (quantity > 1) {
        spanEl.innerHTML = quantity - 1;
      }
      updateCartPrice();
    });

    plusBtn.addEventListener("click", () => {
      let quantity = parseInt(spanEl.innerHTML);
      spanEl.innerHTML = quantity + 1;
      updateCartPrice();
    });
  });


  };

  // Update Cart Price
  const updateCartPrice = () => {
    let productWrap = document.querySelectorAll(".product-wrap");
    let totalCart = 0;

    productWrap.forEach((product)=> {
      const quantity = product.querySelector(".product-quantity span").innerHTML;
      const quantityInt = parseInt(quantity);

      console.log(quantityInt);
      const price = product.querySelector(".product-cart-text .product-price").innerHTML;
      
      const priceFloat = parseFloat(price.replace("","$"));
      console.log(priceFloat); //NaN fix
    });
  };


};

// Category Filter
const searchByCategory = (
  newData,
  smartphonesCheckbox,
  featurePhonesCheckbox
) => {
  if (!smartphonesCheckbox && !featurePhonesCheckbox) {
    return newData;
  }

  if (smartphonesCheckbox && featurePhonesCheckbox) {
    return [];
  }

  const resultCheckbox = newData.filter((item) => {
    return (
      (smartphonesCheckbox && item.phone_type === "Smartphones") ||
      (featurePhonesCheckbox && item.phone_type === "Feature Phones")
    );
  });

  return resultCheckbox;
};

const searchByPriceRange = (
  newData,
  priceRange1Checkbox,
  priceRange2Checkbox,
  priceRange3Checkbox,
  priceRange4Checkbox
) => {
  if (
    !priceRange1Checkbox &&
    !priceRange2Checkbox &&
    !priceRange3Checkbox &&
    !priceRange4Checkbox
  ) {
    return newData;
  }

  if (
    priceRange1Checkbox &&
    priceRange2Checkbox &&
    priceRange3Checkbox &&
    priceRange4Checkbox
  ) {
    return [];
  }

  const resultCheckbox = newData.filter((item) => {
    return (
      (priceRange1Checkbox && item.price_range === "From 20$ - 50$") ||
      (priceRange2Checkbox && item.price_range === "From 50$ - 100$") ||
      (priceRange3Checkbox && item.price_range === "From 100$ - 500$") ||
      (priceRange4Checkbox && item.price_range === "500$+")
    );
  });

  return resultCheckbox;
};

// General Search
const searchCategory = () => {
  // Check to see if user click in the box
  let smartphonesCheckbox = document.querySelector("#smartphones").checked;
  let featurePhonesCheckbox = document.querySelector("#feature-phones").checked;
  let priceRange1Checkbox = document.querySelector("#price-range-1").checked;
  let priceRange2Checkbox = document.querySelector("#price-range-2").checked;
  let priceRange3Checkbox = document.querySelector("#price-range-3").checked;
  let priceRange4Checkbox = document.querySelector("#price-range-4").checked;

  let newData = dataMobileCategory;

  //   Category Filter
  newData = searchByCategory(
    newData,
    smartphonesCheckbox,
    featurePhonesCheckbox
  );

  // Price Filter
  newData = searchByPriceRange(
    newData,
    priceRange1Checkbox,
    priceRange2Checkbox,
    priceRange3Checkbox,
    priceRange4Checkbox
  );

  productsRender(newData);
};

// Event Listening on Checkbox

const filterCategory = (selector) => {
  let filterCheckbox = document.querySelectorAll(selector);
  filterCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      searchCategory();
    });
  });
};

filterCategory(".categories-list .filter-list li input");

filterCategory(".price-list .filter-list li input");
