let cart = [];
let total = 0;
localStorage.setItem('cartItems', JSON.stringify(0));
localStorage.setItem('totalAmount', total);

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
        total += price;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
        total += price;
    }
    updateCartDisplay();
    alert(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = `${item.name} - $${item.price.toFixed(2)} (Quantity: ${item.quantity})`;
        
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        itemDiv.appendChild(removeButton);
        
        cartItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    const item = cart[index];
    total -= item.price; // Decrease total by the price of the item
    item.quantity--; // Decrease the quantity

    if (item.quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0
    }
    
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cart));
            localStorage.setItem('totalAmount', total);
            window.location.href = "file:///C:/Users/stell/OneDrive/Desktop/IA%232/Peak/Invoice/Invoice.html";
        } catch (error) {
            alert("An error occurred while saving your cart. Please try again.");
        }
    }
}

// Restore cart from local storage on page load
window.onload = function() {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    const storedTotal = localStorage.getItem('totalAmount');

    if (storedCart) {
        cart = storedCart;
        total = parseFloat(storedTotal);
        updateCartDisplay();
    }
};
