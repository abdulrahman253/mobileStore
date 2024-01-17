import { login } from "./usersService.js";
import { LOCAL_STORAGE_KEYS , USER_ROLES } from "../constants/constant.js";




document.addEventListener("DOMContentLoaded", function () {
 
  document.getElementById("login").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);

  });
});
