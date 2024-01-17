import { getProductsFromLocalStorage } from "../scripts/prodservice.js";
import { LOCAL_STORAGE_KEYS, USER_ROLES , INITIAL_USERS } from "../constants/constant.js";

document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.getElementById("gallery-container");

  const allProducts = getProductsFromLocalStorage();

  if (!allProducts || allProducts.length === 0) {
    console.log("No products found in local storage.");
    return;
  }

  allProducts.forEach((product) => {
    const productElement = createProductElement(product);
    galleryContainer.appendChild(productElement);
  });
});
const users = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS)
if (!users) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS))
}
document.addEventListener("DOMContentLoaded", function () {
  updateButtonVisibility();

  const logoutBtn = document.getElementById('logoutbtn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      window.location.href = "./login.html";
      localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO);
      updateButtonVisibility();
    });
  }
});
function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
    <img src="${product.productImages}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Description: ${product.description}</p>
    <a href="detailedproduct.html?productId=${product.id}">Learn More</a>
    `;

  return productDiv;
}


function updateButtonVisibility() {
  const loginBtn = document.getElementById('loginbtn');
  const logoutBtn = document.getElementById('logoutbtn');
  const dashboardBtn = document.getElementById('dashboardBtn');

  const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER));
  
  if (currentUser) {
    if (loginBtn && logoutBtn) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline';
    }

    if (currentUser.role === USER_ROLES.ADMIN && dashboardBtn) {
      dashboardBtn.style.display = 'inline';
    } else if (dashboardBtn) {
      dashboardBtn.style.display = 'none';
    }
  } else {
    if (loginBtn && logoutBtn && dashboardBtn) {
      loginBtn.style.display = 'inline';
      logoutBtn.style.display = 'none';
      dashboardBtn.style.display = 'none';
    }
  }
}