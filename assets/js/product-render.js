const mobileProduct_API = "https://fhplfd-3000.csb.app/mobile-products";


// Call API from server to local
const getApi = async (url) => {
    let response = await axios.get(url);
    
    productsRender(response.data);
}

getApi(mobileProduct_API);

// Show Products to HTML
let rowJS = document.querySelector(".row-js");
// console.log(rowJS);

// Render for mobile-categories
const productsRender = (data) => {
    let HTML = ``;


    data.forEach((value)=> {
        console.log(value);
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
`
    });
    // console.log(HTML);

    // Fill product data out to HTML(row-js)
    rowJS.innerHTML = HTML;
}



