// Initialize cart and total variables from localStorage or as empty
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
let total = parseFloat(localStorage.getItem('totalAmount')) || 0;





// Array of products
const products = [
    { name: 'Protein Shake', price: 10, image: 'shake.jpg' , desc: 'To get big and have fast healhty Portein'},
    { name: 'Barbell Set', price: 35, image: 'barbell.jpg' , desc:'To get big and have fast healhty Portein'},
    { name: 'Kettlebell', price: 35, image: 'kbell.jpg', desc: 'To get big and have fast healhty Portein'},
    { name: 'Jump Rope', price: 15, image: 'rope.jpg', desc: 'To get big and have fast healhty Portein'},
    { name: 'Ankle Weights', price: 25, image: 'ankle.jpg', desc: 'To get big and have fast healhty Portein'},
    { name: 'Resistance Bands', price: 5, image: 'resist.jpg', desc: 'To get big and have fast healhty Portein'},
    { name: 'Yoga Mat', price: 10, image: 'mat.jpg' , desc:'To get big and have fast healhty Portein'},
    { name: 'Exercise Ball', price: 10, image: 'ball.jpg' , desc:'To get big and have fast healhty Portein'}
];

// Function to display products dynamically
function displayProducts() {
    const shopContainer = document.querySelector('.shop-container'); // Get the container where products will be displayed

    // Loop through each product in the array
    products.forEach(product => {
        // Create the HTML for each product
        const productHTML = `
            <div class="box">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <h6>${product.desc}</h6>
                <h5>$${product.price.toFixed(2)}</h5>
                <div class="cart">
                    <button onclick="addToCart('${product.name}', ${product.price})">
                        <i class='bx bxs-cart'></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        
        // Append the product HTML to the shop container
        shopContainer.innerHTML += productHTML;
    });
}

// Function to add a product to the cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    
    // If the item is already in the cart, increase its quantity
    if (existingItem) {
        existingItem.quantity++;
        total += price;
    } else {
        // Otherwise, add it as a new item
        cart.push({ name: productName, price: price, quantity: 1 });
        total += price;
    }

    // Update cart display and save data to localStorage
    updateCartDisplay();
    saveToLocalStorage();
    alert(`${productName} added to cart!`);
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items

    // Loop through the cart and display each item
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = `${item.name} - $${item.price.toFixed(2)} (Quantity: ${item.quantity})`;

        // Add a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        itemDiv.appendChild(removeButton);

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

// Function to save cart data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('totalAmount', total);

}

function closeCart() {
    // You can either hide the cart modal or navigate back
    window.location.href = "Products.html"; // Example: redirect to the products page
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        try {
            // Save cart and total to localStorage before checkout
            saveToLocalStorage();
            closeCart();
        } catch (error) {
            alert("An error occurred while saving your cart. Please try again.");
        }
    }
}

// Function to load the cart from localStorage on page load
window.onload = function() {
    // Display products and update cart display
    displayProducts();
    updateCartDisplay();

};



