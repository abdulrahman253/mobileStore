import { getProductsFromLocalStorage , removeProduct  } from "./prodservice.js";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn").addEventListener("click", function () {
        window.location.href = "./addprod.html";
    });

   
    updateDashboard();
    // document.getElementById('deleteicon').addEventListener('click' , function (e) {
    //     const productid = e.target.getAttribute('productid')
    //     console.log(productid);
    //     console.log(e.target);

    //     removeProduct(productid)    
    //     alert('prodcut removed');
    //    // location.reload();
    // })   
    

});

window.removeProduct= removeProduct;


export function updateDashboard() {
    const productTableBody = document.getElementById("productTableBody");

    if (!productTableBody) {
        console.error("Product table body not found.");
        return;
    }

    productTableBody.innerHTML = "";

    const allProducts = getProductsFromLocalStorage();

    if (!allProducts || allProducts.length === 0) {
        console.log("No products found in local storage.");
        return;
    }

    allProducts.forEach((product) => {
        const row = document.createElement("tr");
        row.setAttribute('productId' , product.id);
        row.setAttribute('style' , 'cursor:pointer')
        row.addEventListener('click' , function() {
        const products = getProductsFromLocalStorage();
        const prod = products.find(p => p.id == product.id);
        if (prod) {
            
            window.location.href= 'http://127.0.0.1:5500/pages/edit.html?id='+product.id;

        }
            
        })

 

        const imageSource = product.productImages || "../images/Galaxy-S23-Ultra.png";

        row.innerHTML = `
            <td><img class="image" src="${imageSource}" alt="Product Image" /></td>
            <td class="product-name">${product.name}</td>
            <td>${product.stock}</td>
            <td>${product.price}</td>
            <td>
                <button type="button" id='deleteicon' productid=${product.id} class="trash" onclick="removeProduct('${product.id}')">
                    <i class="fas fa-trash-alt" style="font-size: 36px; position: relative; left: 1px; cursor: pointer;"></i>
                </button>
            </td>
        `;

        productTableBody.appendChild(row);
    });

    console.log("Dashboard updated.");
}
