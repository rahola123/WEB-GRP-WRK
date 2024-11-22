// Retrieve user data from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

// Populate customer details
document.getElementById('customer-name').innerText = `${currentUser.firstName} ${currentUser.lastName}`;
document.getElementById('customer-email').innerText = currentUser.email;
document.getElementById('customer-address').innerText = currentUser.address;

// Populate cart items
const itemsList = document.getElementById('items-list');
cart.forEach(item => {
  const row = document.createElement('tr');
  const subtotal = (item.price * item.quantity).toFixed(2);
  row.innerHTML = `
    <td>${item.name}</td>
    <td>$${item.price.toFixed(2)}</td>
    <td>${item.quantity}</td>
    <td>$${subtotal}</td>
  `;
  itemsList.appendChild(row);
});

// Display total amount
document.getElementById('grand-total').innerText = totalAmount.toFixed(2);
function generateInvoice() {
    // Get cart data and customer shipping info from localStorage
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    const customerInfo = JSON.parse(localStorage.getItem('user')) || {};
    
  
  
    
    // Define company details and TRN (Taxpayer Registration Number)
    const companyName = "Your Company Name"; // Modify this as per your company
    const trn = "TRN-123456"; // Modify this as per your actual TRN number
    
    // Generate a unique invoice number (you can modify this logic as per your need)
    const invoiceNumber = "INV-" + new Date().getTime();
    
    // Calculate tax, discount, and total cost
    const TAX_RATE = 0.05; // 5% tax rate
    const discountRate = 0.1; // 10% discount
    
    const taxAmount = totalAmount * TAX_RATE;
    const discountAmount = totalAmount * discountRate;
    const finalAmount = totalAmount - discountAmount + taxAmount;
  
    // Prepare purchased items details (name, quantity, price, discount)
    const purchasedItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount: item.price * discountRate,
        subtotal: item.price * item.quantity,
        totalPrice: (item.price * item.quantity) - (item.price * item.quantity * discountRate)
    }));
  
    // Create the invoice object
    const invoice = {
        companyName: companyName,
        invoiceDate: new Date().toLocaleDateString(),
        invoiceNumber: invoiceNumber,
        trn: trn,
        shippingInfo: customerInfo,
        purchasedItems: purchasedItems,
        taxAmount: taxAmount.toFixed(2),
        subtotal: totalAmount.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        totalAmount: finalAmount.toFixed(2)
    };
  
    // Append the invoice to the user's invoices array (retrieved from localStorage)
    let allInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
    allInvoices.push(invoice);
  
    // Store the updated invoices array back to localStorage
    localStorage.setItem('AllInvoices', JSON.stringify(allInvoices));
  
    // Optionally, show a message indicating that the invoice has been sent to the user's email
    alert(`Invoice ${invoiceNumber} has been successfully generated and sent to your email!`);
    
    // Optionally, you can log or display the invoice to the user
    console.log(invoice);
    return invoice;
  }
  
  
  
  function displayInvoice(invoice) {
    const invoiceContainer = document.getElementById('invoice-container');
    invoiceContainer.innerHTML = ''; // Clear previous content
  
    const invoiceHTML = `
        <h2>Invoice: ${invoice.invoiceNumber}</h2>
        <p>Company: ${invoice.companyName}</p>
        <p>Date: ${invoice.invoiceDate}</p>
        <p>TRN: ${invoice.trn}</p>
        <h3>Shipping Information:</h3>
        <p>Name: ${invoice.shippingInfo.firstName} ${invoice.shippingInfo.lastName}</p>
        <p>Address: ${invoice.shippingInfo.address1} ${invoice.shippingInfo.address2}</p>
        <p>Email: ${invoice.shippingInfo.email}</p>
        <p>Phone: ${invoice.shippingInfo.phoneNumber}</p>
        
        <h3>Purchased Items:</h3>
        <ul>
            ${invoice.purchasedItems.map(item => `
                <li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)} - Discount: -$${item.discount.toFixed(2)} - Total: $${item.totalPrice.toFixed(2)}</li>
            `).join('')}
        </ul>
        
        <h3>Summary:</h3>
        <p>Subtotal: $${invoice.subtotal}</p>
        <p>Discount: -$${invoice.discountAmount}</p>
        <p>Tax: $${invoice.taxAmount}</p>
        <p><strong>Total: $${invoice.totalAmount}</strong></p>
    `;
  
    invoiceContainer.innerHTML = invoiceHTML;
  }
  
  function confirmCheckout() {
    const isPaymentCompleted = true; // Assuming payment is completed
    if (isPaymentCompleted) {
        const invoice = generateInvoice();
        displayInvoice(invoice); // Display invoice on the page
        alert("Checkout completed. Your invoice has been generated.");
        window.location.href = "thank-you.html"; // Redirect to a thank you or order confirmation page
    } else {
        alert("Please complete the payment first.");
    }
  }