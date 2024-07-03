// Access class from HTML
const searchIc = document.querySelector(".search-desktop");
const searchBox = document.querySelector(".search-box");
const searchCloseIc = document.querySelector(".search-close-ic");
const searchProduct = document.querySelector(".search-product-js");
console.log(searchIc);

// Search Popup Function
const openSearchPopup = () => {
    searchIc.addEventListener("click", ()=> {
        document.body.classList.add("darken");
        searchBox.style.opacity = "1";
        searchCloseIc.style.opacity = "1";
    });
}

openSearchPopup();

const closeSearchPopup = () => {
    searchCloseIc.addEventListener("click", ()=> {
        document.body.classList.remove("darken");
        searchBox.style.opacity = "0";
        searchCloseIc.style.opacity = "0";
    });
}

closeSearchPopup();

// Bug with defining target outside searchbox
searchBox.addEventListener("click", (e) => {
    // console.log(e.target)
})

const searchRender = (data) => {
    let HTML = ``;
    data.forEach((value) => {
        console.log(value.mainImage);
        HTML += 
`<div class="col-12 col-sm-12 col-md-12">
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
</div>`

    });

    searchProduct.innerHTML = HTML;
}