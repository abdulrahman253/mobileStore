import { register } from "./usersService.js";
import { LOCAL_STORAGE_KEYS ,USER_ROLES } from "../constants/constant.js";

window.addEventListener("load", function () {
  const registerButton = document.getElementById("register");
  registerButton.addEventListener("click", handleRegistration);
  this.document.forms[0].addEventListener('submit', function (e) {
    if (!(firstNameValid() && lastNameValid() && emailValid() && isuserpassValide())) {
      e.preventDefault();
      alert("Complete Your Data");
    }
  });
});


function handleRegistration() {
  const username = document.querySelector("[name='Username']");
  const phone = document.querySelector(".phone");
  const email = document.querySelector("#regemail");
  const password = document.querySelector(".password");
  const repeatPassword = document.querySelector(".repeatpw");
  const passwordError = document.querySelector("#password-error");
  console.log(username);

  passwordError.innerHTML="";

  if (!isValidUsernameLength(username.value)) {
    alert("Username must be between 3 and 20 characters.");
    return;
  }
  if (password.value !== repeatPassword.value) {
    repeatPassword.style.borderColor="blue";
    passwordError.innerHTML="Passwords do not match";
    repeatPassword.innerHTML="doesnt not match";
    alert("Passwords do not match. Please check and try again.");
    return;
  }
  else{
    repeatPassword.style.borderColor="green"
  }

  if (!isValidEmail(email.value)) {
    alert("Invalid email address. Please enter a valid email.");
    return;
  }
  if (!isValidPhoneNumber(phone.value)) {
    alert("Invalid phone number. Please enter a valid 11-digit number starting with 010, 011, 012, or 015.");
    return;
  }

  const registrationResult = register(
    username.value,
    phone.value,
    email.value,
    password.value,
    USER_ROLES.MEMBER
  );
  

  if (registrationResult) {
    window.location.href = "./login.html";
    alert("Registration successful!");
  } else {
    alert("Registration failed. Email or phone number already exists.");
  }
}
function isValidPhoneNumber(phone) {
  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  return phoneRegex.test(phone);
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidUsernameLength(username) {
  return username.length >= 3 && username.length <= 20;
}