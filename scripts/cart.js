import { LOCAL_STORAGE_KEYS, USER_ROLES } from "../constants/constant.js";
import { getProductsFromLocalStorage } from "../scripts/prodservice.js";

document.addEventListener("DOMContentLoaded", function () {
  const carttform = document.getElementById("cartForm");
  const cartBody = document.querySelector(".tb tbody");
  const cartTotalElement = document.querySelector(".totals span");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const allProducts = getProductsFromLocalStorage();

  let cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) || [];

  carttform.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const productId = event.target.getAttribute("data-product-id");
      removeFromCart(productId);
    }
  });

  checkoutBtn.addEventListener("click", function () {
    alert("Proceeding to Checkout. Total: " + cartTotalElement.textContent);
  });
  carttform.addEventListener("input", function (event) {
    const target = event.target;
    console.log(target);
    if (target.classList.contains("num")) {
      validateInput(target);
    }
  });

 

  function validateInput(input) {
    console.log(input.value);
    const numericValue = parseInt(input.value , 10);

    if (isNaN(numericValue) || numericValue < 0) {
      input.value = 0;
    }

    const productId = input.closest("tr").getAttribute("data-product-id");
    updateQuantity(productId, input.value);
  }

  function removeFromCart(productId) {
    const cartItems = cart.filter( c => c.productId != productId )
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cartItems));
    window.location.reload();
    updateCartDisplay();
  }

  function updateQuantity(productId, newQuantity) {
    const cartItems = cart.map((item) => {
      if (item.productId == productId) {
        item.quantity = parseInt(newQuantity, 10); 
           }
      return item;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cartItems));
    updateButtonVisibility();
    updateCartDisplay();
  }

  function updateCartDisplay() {
    cartBody.innerHTML = "";
    const currentuser = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER)
    );
    cart = cart.filter((c) => c.email == currentuser.email);
    for (let productId in cart) {
      const cartItem = cart[productId];
      productId = cartItem.productId;
      const product = allProducts.find((p) => p.id == productId);
     

      if (product) {
        const row = document.createElement("tr");
        row.setAttribute("data-product-id", productId);
        row.innerHTML = `
                    <td><button type="button" class="remove-btn" data-product-id="${productId}">x</button></td>
                    <td><img class="thumbnail" src="${
                      product.productImages
                    }" alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <input  class="num" type="number" value="${
                          cartItem.quantity
                        }"  inputmode="numeric" />
                    </td>
                    <td>EGP${product.price * cartItem.quantity}</td>
                `;

        cartBody.appendChild(row);
      }
    }

    const cartTotal = calculateCartTotal();
    cartTotalElement.textContent = `EGP${cartTotal}`;
  }

  function calculateCartTotal() {
    let total = 0;

    for (let productId in cart) {
      const cartItem = cart[productId];
      productId = cartItem.productId;
      const product = allProducts.find((p) => p.id ==productId);
      if (product) {
        total += product.price * cartItem.quantity;
      }
    }

    return total;
  }
  
  function updateButtonVisibility() {
    const loginBtn = document.getElementById("loginbtn");
    const logoutBtn = document.getElementById("logoutbtn");
    const dashboardBtn = document.getElementById("dashboardBtn");

    const currentUser = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER)
    );

    if (currentUser) {
      if (loginBtn && logoutBtn) {
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline";
      }

      if (currentUser.role === USER_ROLES.ADMIN && dashboardBtn) {
        dashboardBtn.style.display = "inline";
      } else if (dashboardBtn) {
        dashboardBtn.style.display = "none";
      }
    } else {
      if (loginBtn && logoutBtn && dashboardBtn) {
        loginBtn.style.display = "inline";
        logoutBtn.style.display = "none";
        dashboardBtn.style.display = "none";
      }
    }
  }

  updateButtonVisibility();
  updateCartDisplay();

});
