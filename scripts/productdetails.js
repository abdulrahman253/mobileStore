import { getProductsFromLocalStorage } from "../scripts/prodservice.js";
import { LOCAL_STORAGE_KEYS } from "../constants/constant.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  let allProducts = getProductsFromLocalStorage();

  const productDetails = getProductDetailById(productId, allProducts);

  displayProductDetails(productDetails);
});

function getProductDetailById(productId, allProducts) {
  productId =
    typeof productId === "string" ? parseInt(productId, 10) : productId;

  return allProducts.find((product) => product.id === productId);
}

function displayProductDetails(product) {
  const productContainer = document.getElementById("productDetails");

  if (product) {
    productContainer.innerHTML = `
        <div class="image-container">
        <img src="${product.productImages}" alt="${product.name} - Image" class="product-image">
        </div>
        <h1>${product.name}</h1>
        <p>Description: ${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Specifications: ${product.specs}</p>
        <button id='buy-btn' class="buy-btn" data-product-id="${product.id}">Add to Cart</button>
        <a href="gallery.html">Back to Gallery</a>
       `;
    const addToCartBtn = document.getElementById("buy-btn");
    addToCartBtn.addEventListener("click", function () {
      addToCart(1, addToCartBtn);
      alert("Product added to cart!");
    });
  } else {
    productContainer.innerHTML = "<p>Product not found</p>";
  }
}

function addToCart(quantity, addToCartBtn) {
  const currentuser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER));
  if (!currentuser) {
    alert("Please log in to add items to your cart.");    
  }
  const cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) || [];
  const productId = addToCartBtn.getAttribute("data-product-id");

  if (!productId) {
     cartItems = cartItems.map((item) => {
      if (item.productId == productId) {
        item.quantity += quantity;

      }
      return item;
    });    
    }

    else{
      const newCartItem = {

        productId : productId,
        quantity: quantity,
        email : currentuser.email,


      }
      cartItems.push(newCartItem);
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }

