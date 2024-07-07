const mobileProduct_API_test =
  "https://fhplfd-3000.csb.app/mobile-products/?_start=0&_end=8";
const mobileProduct_API = "https://fhplfd-3000.csb.app/mobile-products/";
// Access class from HTML
let productMain = document.querySelector("#wrap-product-main");

// Get API from server to local
const getApi_test = async (url) => {
  let response = await axios.get(url);

  productRender(response.data);
};

getApi_test(mobileProduct_API_test);

const getApi = async (url) => {
  let response = await axios.get(url);

  searchRender(response.data);
};

getApi(mobileProduct_API);

const productRender = (data) => {
  let HTML = ``;
  data.forEach((value) => {
    HTML += `<div class="item">
    
        <div class="product-item">
            <a href="./product-detail.html?id=${value.id}">
            <div class="product-image">
                <img src="${value.mainImage}" alt="${value.name}">
            </div>
            <div class="product-text">
                <div class="product-name">
                    <p>${value.name}</p>
                </div>
                <div class="product-price">
                    <p>${value.price}</p>
                </div>
            </div>
            </a>
        </div>
    

        

    </div>`;
  });

  productMain.innerHTML = HTML;

  // Product Sections after data
  $(".owl-two").owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
      480: {
        items: 2,
      },
      991: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
  
};
