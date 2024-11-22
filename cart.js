// cart.js

// Load the cart from localStorage
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
let total = parseFloat(localStorage.getItem('totalAmount')) || 0;

// Constants for tax rate and discount rate (for demo purposes)
const TAX_RATE = 0.07; // 7% tax
const DISCOUNT_RATE = 0.1; // 10% discount
const SHIP_RATE = 0.05; // 5% tax

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items
  
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('total-price').innerText = 'Total: $0.00';
      return;
    }
  
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      const discount = subtotal * DISCOUNT_RATE;
      const tax = subtotal * TAX_RATE;
      const ship = subtotal * SHIP_RATE;
      const totalItemPrice = subtotal + tax + ship - discount;
  
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <div>
          <h5>${item.name}</h5>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)" /></p>
          <p>Subtotal: $${subtotal.toFixed(2)}</p>
          <p>Discount: -$${discount.toFixed(2)}</p>
          <p>Tax: $${tax.toFixed(2)}</p>
          <p>Shipping: $${ship.toFixed(2)}</p>
          <p>Total Price: $${totalItemPrice.toFixed(2)}</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });
  
    updateTotalPrice(); // Update the total after rendering items
  }

// Function to update the total price after changes in the cart
function updateTotalPrice() {
  total = cart.reduce((acc, item) => {
    const subtotal = item.price * item.quantity;
    const discount = subtotal * DISCOUNT_RATE;
    const tax = subtotal  * TAX_RATE;
    const ship = subtotal * SHIP_RATE;
    return acc + (subtotal + tax + ship - discount);
  }, 0);

  // Update the display with the new total
  document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;

}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay(); // Update the cart display after removal
  saveToLocalStorage();
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);
  updateCartDisplay(); // Update the cart display after changing quantity
  saveToLocalStorage();
}

// Function to clear the cart
function clearCart() {
  cart = []; // Reset the cart array
  updateCartDisplay(); // Update the display
  localStorage.removeItem('cartItems'); // Remove from localStorage
  localStorage.removeItem('totalAmount'); // Remove total from localStorage
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    // Save cart to localStorage before checkout
    saveToLocalStorage();
    // Redirect to the checkout page (adjust the path as needed)
    window.location.href = "Invoice1.html";
  }
}

// Function to close the cart view (redirect to product catalog or previous page)
function closeCart() {
  window.location.href ="Products.html"; // Adjust this to your desired page
}

// Function to save cart data to localStorage
function saveToLocalStorage() {

    localStorage.setItem('totalAmount', total);
    localStorage.setItem('cartItems', JSON.stringify(cart));
}


// Load the cart and total from localStorage on page load
window.onload = function() {
  updateCartDisplay(); // Update the cart items and total on load
};