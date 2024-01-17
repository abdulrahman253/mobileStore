import { getProductsFromLocalStorage, updateProductInLocalStorage } from "../scripts/prodservice.js";

document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromURL(); 
console.log(productId);
  const product = getProductById(productId);
  console.log(product);
  if (product) {
    populateForm(product);
  } else {
    alert("Product not found.");
  }

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileInput = event.target;
    const productImage = document.getElementById('productImage');

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        productImage.src = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  });
});

document.getElementById('update').addEventListener('click' , function () {

    const productId = getProductIdFromURL();
    updateProduct(productId);
    
})


    

function getProductIdFromURL() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

function getProductById(productId) {
  const allProducts = getProductsFromLocalStorage();
  return allProducts.find(product => product.id == productId);
}

function populateForm(product) {
  document.getElementById('name').value = product.name;
  document.getElementById('description').value = product.description;
  document.getElementById('specs').value = product.description;
  document.getElementById('stock').value = product.stock;
  document.getElementById('price').value = product.price;
  document.getElementById('productImage').src = product.productImages[0]; 
}

function updateProduct(productId) {
  const productName = document.getElementById('name').value;
  const productDescription = document.getElementById('description').value;
  const productSpecs = document.getElementById('specs').value;
  const productStock = document.getElementById('stock').value;
  const productPrice = document.getElementById('price').value;

  const updatedProduct = {
    id: productId,
    name: productName,
    description: productDescription,
    specs: productSpecs,
    stock: productStock,
    price: productPrice,
  };

  updateProductInLocalStorage(  productId,updatedProduct);

  alert('Product updated successfully!');
}
