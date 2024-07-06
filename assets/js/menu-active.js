document.addEventListener("DOMContentLoaded", () => {
  const setActiveMenu = (selector) => {
    // Access navbar li(product-details) from HTML
    const menuItems = document.querySelectorAll(selector);

    // Remove old active function
    const removeActive = (menuItems) => {
      menuItems.forEach((value) => {
        value.classList.remove("active");
      });
    };

    // Check if menu already actived in localStorage
    let activeIndex = localStorage.getItem("ACTIVE_MENU");

    if (activeIndex !== null) {
      // Put remove function on the event
      removeActive(menuItems);
      // Add active that exists in localStorage
      menuItems[activeIndex].classList.add("active");
    } else {
      menuItems[0].classList.add("active");
    }

    // Loop menuItems then add events for the items
    menuItems.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        // Put remove function on the event
        removeActive(menuItems);

        // Add item function on the event
        item.classList.add("active");

        // Set active class into localStorage
        localStorage.setItem("ACTIVE_MENU", index);

        // Reset <a> attribute after e.preventDefault:
        const href = item.querySelector("a").getAttribute("href");
        window.location.href = href;
      });
    });
  };

  setActiveMenu(".menu-list li");
});
