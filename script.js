document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "product 1", price: 29.99 },
    { id: 2, name: "product 2", price: 19.99 },
    { id: 3, name: "product 3", price: 59.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productID = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productID);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);

    //save cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart))

    renderCart();
  }

 function renderCart() {
   cartItems.innerHTML = "";
   let totalPrice = 0;

   if (cart.length > 0) {
     emptyCartMessage.classList.add("hidden");  //emptyCartmsg me  hidden add --> msg hide kiya
     cartTotalMessage.classList.remove("hidden");

     cart.forEach((item, index) => {
       totalPrice += item.price;

       const cartItem = document.createElement("div");

       cartItem.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

       cartItems.appendChild(cartItem);
     });

     totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
   } else {
     emptyCartMessage.classList.remove("hidden");
     cartTotalMessage.classList.add("hidden");
     totalPriceDisplay.textContent = "$0.00";
   }
 }

 //when we click remove button
 cartItems.addEventListener('click', (e)=>{
    if(e.target.classList.contains("remove-btn")){

        const index = parseInt(e.target.dataset.index)
        cart.splice(index, 1)
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart()
    }
 })

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;

    //remove from local storage
    localStorage.removeItem("cart")


    alert("checkout successfully");
    renderCart();
  });

  

 
});
