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

const mobileProduct_API = "https://fhplfd-3000.csb.app/mobile-products";

const getApi_SearchPopup = async (url) => {
  let response = await axios.get(url);
  return response.data;
}

let data = [];
const storeData = async () => {
  data = await getApi_SearchPopup(mobileProduct_API);
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
  let searchTerm = textSearch.toLowerCase().trim(); // Convert input value into lowercase and remove whitespace

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


