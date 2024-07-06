// Product Image Swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: -35,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

// Viewed Product OwlCarousel
$(".owl-carousel").owlCarousel({
  loop: false,
  margin: 30,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

const mobileProduct_API = "https://fhplfd-3000.csb.app/mobile-products";

// Get ID Products
let params = new URLSearchParams(document.location.search);

let idDetail = params.get("id");

// Access class HTML
let productImgJs = document.querySelector(".product-img-js");
let productInfoJs = document.querySelector(".product-info-js");
let productDescriptionJs = document.querySelector(".product-description-js");
let productSpecJs = document.querySelector(".product-spec-js");
let productViewedJs = document.querySelector(".product-viewed-js");
let descriptionNavbar = document.querySelector("#description-navbar");
let specNavbar = document.querySelector("#spec-navbar");
let reviewNavbar = document.querySelector("#review-navbar");
let productDescription = document.querySelector("#wrap-product-description");
let productSpec = document.querySelector("#wrap-product-spec");
let productReview = document.querySelector("#wrap-product-review");
// console.log(descriptionNavbar);

// Product Navbar
descriptionNavbar.addEventListener("click", () => {
  productDescription.style.display = "block";
  productSpec.style.display = "none";
  productReview.style.display = "none";
});

specNavbar.addEventListener("click", () => {
  productDescription.style.display = "none";
  productSpec.style.display = "block";
  productReview.style.display = "none";
});

reviewNavbar.addEventListener("click", () => {
  productDescription.style.display = "none";
  productSpec.style.display = "none";
  productReview.style.display = "block";
});

// Call API from server to local
const getApi = async (url) => {
  let response = await axios.get(url);

  renderDetail(response.data);
  viewedProducts(response.data);
};

getApi(mobileProduct_API);

// Display product detail which matches with API
const renderDetail = (data) => {
  // console.log(data);
  let detail = data.filter((item) => {
    return item.id == idDetail;
  });

  // Product Image
  productImgJs.innerHTML = `
  <div class="swiper mySwiper2">

    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img class="iphone-image" src="${detail[0].mainImage}"/>
      </div>
      <div class="swiper-slide">
        <img src=${detail[0].thumbnail_1}" />
      </div>
      <div class="swiper-slide">
        <img src="${detail[0].thumbnail_2}" />
      </div>
      <div class="swiper-slide">
        <img src="${detail[0].thumbnail_3}" />
      </div>
    
  </div>

  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>

  </div>

  <div thumbsSlider="" class="swiper mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img class="iphone-image" src="${detail[0].mainImage}" />
      </div>
      <div class="swiper-slide">
        <img src="${detail[0].thumbnail_1}" />
      </div>
      <div class="swiper-slide">
        <img src="${detail[0].thumbnail_2}" />
      </div>
      <div class="swiper-slide">
        <img src="${detail[0].thumbnail_3}" />
      </div>

    
      </div>
</div>`;

  // Product Detail
  productInfoJs.innerHTML = `
  <div class="wrap-top-info">
  <h2 class="product-name">${detail[0].name}</h2>
  <span class="product-price">${detail[0].price}</span>
  <div class="product-rating">
      <div class="star-icon">
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
      </div>
      <p class="rating-number">(${detail[0].rating_numbers})</p>
  </div>
</div>

<div class="wrap-bottom-info">
  <div class="product-status">
      <p><i class="fa-solid fa-check"></i>In Stock</p>
      <p><i class="fa-solid fa-check"></i>Free Delivery Available</p>
      <p><i class="fa-solid fa-check"></i>Sale 50% for first-time customer</p>
  </div>

  <div class="product-brief-intro">
      <p>${detail[0].product_brief_intro}</p>
  </div>
  
  <div class="product-button">
    <div class="product-quantity">
      <button class="minus-button" type="button"><i class="fa-solid fa-minus"></i></button>
      <span>1</span>
      <button class="plus-button" type="button"><i class="fa-solid fa-plus"></i></button>
    </div>

    <div class="add-to-cart-button">
      <button type="submit">Add To Cart</button>
    </div>

    <div class="wishlist-button">
      <button type="button"><i class="fa-regular fa-heart"></i></button>
    </div>
  </div>`;

  // Product Description
  productDescriptionJs.innerHTML = `
<div class="col-12 col-sm-12 col-md-12">
  <div class="wrap-description-section">
      <h2 class="description-title section-title">${detail[0].description_title_1}</h2>
      <p class="description-text">${detail[0].description_text_1}</p>
  </div>
</div>

<div class="col-12 col-sm-12 col-md-12">
  <div class="wrap-description-section">
      <h2 class="description-title">${detail[0].description_title_2}</h2>
      <p class="description-text">${detail[0].description_text_2}</p>
      <h5 class="description-sub-title">${detail[0].description_sub_title_1}</h5>
      <p class="description-text">${detail[0].description_text_3}</p>
      <div class="description-image">
          <img src="${detail[0].description_image_1}" alt="${detail[0].name}">
      </div>
      <p class="description-text">${detail[0].description_text_4}</p>
  </div>
</div>

<div class="col-12 col-sm-12 col-md-12">
  <div class="wrap-description-section">
      <h5 class="description-sub-title">${detail[0].description_sub_title_2}</h5>
      <p class="description-text">${detail[0].description_text_5}</p>
      <div class="description-image">
          <img src="${detail[0].description_image_2}" alt="${detail[0].name}">
      </div>
      <p class="description-text">${detail[0].description_text_6}</p>
  </div>
</div>
`;

  // Product Specifications
  productSpecJs.innerHTML = `
<div class="col-12 col-sm-12 col-md-12">
  <div class="specification-title">
      <h2 class="section-title">Technical Specification</h2>
  </div>
</div>

<div class="col-12 col-sm-12 col-md-12">
  <div class="spec-table">
    <table class="table table-striped">
        <thead>
          <tr>
            <th class="spec-name" scope="col">#</th>
            <th scope="col">Spec Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Monitor Size</th>
            <td>${detail[0].monitor_size}</td>
          </tr>
          <tr>
            <th scope="row">Display Technology</th>
            <td>${detail[0].display_technology}</td>
          </tr>
          <tr>
            <th scope="row">Back Camera</th>
            <td>${detail[0].back_camera}</td>
          </tr>
          <tr>
            <th scope="row">Front Camera</th>
            <td>${detail[0].front_camera}</td>
          </tr>
          <tr>
            <th scope="row">RAM Size</th>
            <td>${detail[0].ram_size}</td>
          </tr>
          <tr>
            <th scope="row">Memory Capacity</th>
            <td>${detail[0].memory_capacity}</td>
          </tr>
          <tr>
            <th scope="row">Number of Sim Card</th>
            <td>${detail[0].simcard_number})</td>
          </tr>
          <tr>
            <th scope="row">Operating System</th>
            <td>${detail[0].operating_system}</td>
          </tr>
          <tr>
            <th scope="row">Aspect Ratio</th>
            <td>${detail[0].aspect_ratio}</td>
          </tr>
          <tr>
            <th scope="row">Chipset & CPU</th>
            <td>${detail[0].chipset_cpu}</td>
          </tr>
          <tr>
            <th scope="row">Battery Size</th>
            <td>${detail[0].battery_size}</td>
          </tr>
        </tbody>
      </table>
  </div>
</div>`;
};

// Viewed Products
const viewedProducts = (data) => {
  let HTML = ``;
  data.forEach((item) => {
    HTML += `
  <div class="owl-carousel owl-theme">
    <div class="item">
      <div class="warp-viewed-product">
          <a href="./product-details.html">
              <div class="viewed-product-image">
                  <img src="${item.mainImage}" alt="${item.name}">
              </div>
              <div class="viewed-product-detail">
                  <div class="product-text">
                      <p class="product-name">${item.name}</p>
                      <p class="product-price">${item.price}</p>
                  </div>
              </div>
          </a>                          
    </div>
  </div>`;
  });

  productViewedJs.innerHTML = HTML;
  // console.log(productViewedJs);
};
