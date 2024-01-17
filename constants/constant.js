export const LOCAL_STORAGE_KEYS={
    USERS:"USERS",
    CURRENT_USER:"CURRENT_USER",
    PRODUCTS: "PRODUCTS", 
    IS_LOGGED_IN: 'is_logged_in',
    CART : 'CART'
} 

export const USER_ROLES = {
    ADMIN: 'Admin',
    MEMBER: 'Member',
    ANONYMOUS: 'Anonymous',
  };


 export const INITIAL_USERS = [

    {
        email : 'admin@admin.com' ,
        password : '1234',
        role : USER_ROLES.ADMIN,
    },
    {
        email : 'ahmed@gmail.com' ,
        password : '123',
        role : USER_ROLES.MEMBER,
    }
 ]



 