import { LOCAL_STORAGE_KEYS } from "../constants/constant.js";

export function addProductToLocalStorage(product) {
  const existingProducts =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS)) || [];
  existingProducts.push(product);
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.PRODUCTS,
    JSON.stringify(existingProducts)
  );
}

export function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS)) || [];
}

export function updateProductInLocalStorage(productId, updatedProduct) {
  const existingProducts =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS)) || [];
  console.log(existingProducts);
  const updatedProducts = existingProducts.map((product) => {
    if (product.id == productId) {
      alert("in if stat");
      return { ...product, ...updatedProduct };
    }
    return product;
  });

  localStorage.setItem(
    LOCAL_STORAGE_KEYS.PRODUCTS,
    JSON.stringify(updatedProducts)
  );
}

export function removeProduct(productId) {
  const existingProducts =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS)) || [];

  const updatedProducts = existingProducts.filter((p) => p.id != productId);
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.PRODUCTS,
    JSON.stringify(updatedProducts)
  );
  alert("Product removed");
  location.reload();
}
