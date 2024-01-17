import { LOCAL_STORAGE_KEYS , USER_ROLES} from "../constants/constant.js";
export function login(email, password) {
  let users = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);
  users = JSON.parse(users);
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email == email && user.password == password) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER,JSON.stringify(user));
      window.location.href = "./Home.html";
      return;
    }
  }
    alert("Invalid username or password");
  }



export function logout() {

  localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  localStorage.setItem(localStorage.IS_LOGGED_IN,'false');
  
}


export function register(username, phone, email, password , role = USER_ROLES.MEMBER) {
  let users = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);

  users = JSON.parse(users) || [];

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.email === email && user.phone === phone) {
      return false;
    }
  }

  const newUser = {
    username: username,
    phone: phone,
    email: email,
    password: password,
    role:role
  };
  users.push(newUser);
  
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
  console.log(newUser);
  return true;
}

