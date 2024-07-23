    // Delete Products
    const removeProduct = (item) => {
        item.parentElement.parentElement.parentElement.remove();
      };
  
      let removeBtn = document.querySelectorAll("#remove-btn");
      removeBtn.forEach((item) => {
        item.addEventListener("click", () => {
          removeProduct(item);
          updateCartPrice();
          saveCartToLocalStorage();
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
          saveCartToLocalStorage();
          updateCartPrice();
        });
  
        plusBtn.addEventListener("click", () => {
          let quantity = parseInt(spanEl.innerHTML);
          spanEl.innerHTML = quantity + 1;
          saveCartToLocalStorage();
          updateCartPrice();
        });
      });