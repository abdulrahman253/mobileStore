import {
  LOCAL_STORAGE_KEYS,
  USER_ROLES,
  INITIAL_USERS,
} from "../constants/constant.js";

const users = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);
if (!users) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
}

document.addEventListener("DOMContentLoaded", function () {
  updateButtonVisibility();

  const logoutBtn = document.getElementById("logoutbtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      window.location.href = "./login.html";
      localStorage.removeItem(LOCAL_STORAGE_KEYS.IS_LOGGED_IN);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_INFO);
      updateButtonVisibility();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "../images/samsung2.png",
    "../images/iphone home.png",
    "../images/xiaomi12.png",
  ];

  const bgImage = document.getElementById("bg");
  let currentIndex = 0;

  function changeImage() {
    bgImage.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
  }

  setInterval(changeImage, 3000);
});

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
