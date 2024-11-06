let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
let total = parseFloat(localStorage.getItem('totalAmount')) || 0;

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    // Loop through the cart and display each item
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h5>${item.name}</h5>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    // Update the total price display
    document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const item = cart[index];
    total -= item.price; // Decrease total by the price of the item
    item.quantity--; // Decrease the quantity

    // If the quantity reaches zero, remove the item from the cart
    if (item.quantity <= 0) {
        cart.splice(index, 1);
    }

    // Update the cart display and save the updated cart to localStorage
    updateCartDisplay();
    saveToLocalStorage();
}

function clearCart() {
    if (confirm("Are you sure you want to clear the entire cart?")) {
        cart = [];
        total = 0;
        updateCartDisplay();
        saveToLocalStorage();
    }
}

// Function to save cart data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('totalAmount', total.toFixed(2)); // Save total as well
}


// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        try {
            // Save cart and total to localStorage before checkout
            saveToLocalStorage();
            // Redirect to invoice page
            window.location.href = "file:///C:/Users/stell/OneDrive/Desktop/IA%232/Peak/Invoice/Invoice.html";
        } catch (error) {
            alert("An error occurred while saving your cart. Please try again.");
        }
    }
}

// Function to close the cart (this could be hiding a modal, etc.)
function closeCart() {
    // You can either hide the cart modal or navigate back
    window.location.href = "file:///C:/Users/stell/OneDrive/Desktop/IA%232/Peak/Products/Products.html"; // Example: redirect to the products page
}

// Load the cart and total from localStorage on page load
window.onload = function() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    const storedTotal = localStorage.getItem('totalAmount');

    if (storedCart) {
        cart = storedCart;
        total = parseFloat(storedTotal);
    }

    // Display the cart
    updateCartDisplay();
};
