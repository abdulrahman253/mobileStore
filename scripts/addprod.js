import { addProductToLocalStorage } from "./prodservice.js";
import { updateDashboard } from "./dashboard.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", function () {
    const productName = document.getElementById("name").value;
    const productDescription = document.getElementById("description").value;
    const productSpecs = document.getElementById("specs").value;
    const productStock = document.getElementById("stock").value;
    const productPrice = document.getElementById("price").value;
    const productImageInput = document.getElementById("image");
    const imageFiles = productImageInput.files;
    let productImages = [];

    if (imageFiles && imageFiles.length > 0) {
      const reader = new FileReader();
      
      reader.onload = function (e) {
        for (let i = 0; i < imageFiles.length; i++) {
          const productImage = e.target.result; //base 64 encoded
          productImages.push(productImage);
        }

        if (productName && productStock && productPrice) {
          const productId = generateID();

          const product = {
            id: productId,
            name: productName,
            description: productDescription,
            specs: productSpecs,
            stock: productStock,
            price: productPrice,
            productImages: productImages,
          };

          addProductToLocalStorage(product);

          updateDashboard();

          alert("Product added successfully!");
        } else {
          alert(
            "Please fill in the required fields (Product Name, In Stock, Price)."
          );
        }
      };

      reader.readAsDataURL(imageFiles[0]);
    } else {
      alert("Please select at least one image");
    }
  });
});

function generateID() {
  let id = Math.floor(Math.random() * 1000);
  return id;
}

function displayImage(image) {
  const uploadedImageElement = document.getElementById("uploadedImage");

  if (uploadedImageElement && image) {
    const reader = new FileReader();

    reader.onload = function (e) {
      uploadedImageElement.src = e.target.result;
    };

    reader.readAsDataURL(image);
  } else {
    uploadedImageElement.src = "";
  }
}

window.displayImagePreview = function () {
  const productImageInput = document.getElementById("image");
  const selectedImage = productImageInput.files[0];
  const filename = selectedImage.name;

  displayImage(selectedImage);
  document.getElementById("filename").value = filename;
};
