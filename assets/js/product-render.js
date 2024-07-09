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
            </div>
                          
        </div>
`;
  });

  // Fill product data out to HTML(row-js)
  rowJS.innerHTML = HTML;
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

// General Search
const searchCategory = () => {
  // Check to see if user click in the box
  let smartphonesCheckbox = document.querySelector("#smartphones").checked;
  let featurePhonesCheckbox = document.querySelector("#feature-phones").checked;
  console.log(featurePhonesCheckbox);
  console.log(smartphonesCheckbox);

  let newData = dataMobileCategory;

  //   Category Filter
  newData = searchByCategory(
    newData,
    smartphonesCheckbox,
    featurePhonesCheckbox
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
