let failedAttempts = 0; // Initialize failed attempts counter

// Menu toggle function
function myMenuFunction() {
  var i = document.getElementById("navMenu");
  if (i.className === "nav-menu") {
    i.className += " responsive";
  } else {
    i.className = "nav-menu";
  }
}

// Button references
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}

// Switch to Login Form
function logMove() {
  if (!a.classList.contains("white-btn")) {
    a.classList.add("white-btn");
  }
  b.classList.remove("white-btn");
  x.style.left = "0";
  y.style.left = "100%";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

// Switch to Register Form
function regMove() {
  if (!b.classList.contains("white-btn")) {
    b.classList.add("white-btn");
  }
  a.classList.remove("white-btn");
  x.style.left = "-100%";
  y.style.left = "0";
  x.style.opacity = 0;
  y.style.opacity = 1;
}

function checkout() {
  const currentUser = {
    firstName: "John", // Replace with actual user data
    lastName: "Doe",
    email: "johndoe@example.com",
    address: "123 Main Street",
  };

  const cart = [
    { name: "Item 1", price: 10, quantity: 2 },
    { name: "Item 2", price: 15, quantity: 1 }
  ];

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Save data to localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('cartItems', JSON.stringify(cart));
  localStorage.setItem('totalAmount', totalAmount.toFixed(2));

  // Redirect to the invoice page
  window.location.href = "Invoice.html";
}

// Save updated registration data to localStorage
function saveUsersToLocalStorage(users) {
  localStorage.setItem('users', JSON.stringify(users)); // Ensure 'users' is the correct key
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Handle login form submission
function handleLogin() {
  const TRN = document.getElementById('TRN').value;
  const password = document.getElementById('password').value;

   // Check if both fields are filled
   if (!TRN || !password) {
    alert('Please fill in both TRN and password.');
    return;
  }

  const users = getUsersFromLocalStorage();
  const user = users.find(u => u.trn === TRN && u.password === password);

  if (user) {
    // Redirect to dashboard or home page
    alert('Login successful!');
    window.location.href = "Home.html"; // Modify with actual destination
  } else {
    alert('Invalid TRN or password. Please try again.');
    failedAttempts++;
  } 
  
  if (failedAttempts >= 3) {
    alert('You have reached the maximum number of login attempts. Your account is locked.');
    window.location.href = "account_locked.html"; // Redirect to locked account or error page
  }
}




// Handle registration form submission
function handleRegister() {
  const trn = document.getElementById('registerTRN').value.trim(); 
  const password = document.getElementById('registerPassword').value.trim(); 
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.getElementById('gender').value;
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('Address').value.trim();

  const users = getUsersFromLocalStorage();

    // Check if all fields are filled
  if (!trn || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !email || !address ) {
    alert('All fields must be filled!');
    return;
  }

   // Password length validation (at least 8 characters)
  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    return;
  }

  const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
  if (!trnPattern.test(trn)) {
    alert('TRN must be in the format: 000-000-000');
    return;
  }

    // Age validation
  const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  if (age < 18) {
    alert('You must be 18 or older to register.');
    return;
  }

  // Validate TRN for uniqueness (when registering)
function validateTRN(trn, users) {
  if (users.some(user => user.trn === trn)) {
    alert('The TRN you entered is already registered. Please use a unique TRN.');
    return false;
  }
  return true;
}

  // Validate TRN and other fields (if needed)
  if (validateTRN(trn, users)) {
    // Proceed with registration
    alert("User registered successfully!");

    // Add the new user to the users array
    users.push({ trn, password, firstName, lastName, dateOfBirth, gender, phoneNumber, email , address });
    saveUsersToLocalStorage(users);

    logMove(); // Switch back to login form after registration
  }
}



function clearData() {
  localStorage.removeItem('users');
  console.log("User data cleared from localStorage");
}

// Example usage to show localStorage contents (for debugging)
console.log(localStorage);

// Example function to show the complete localStorage contents
function showCompleteLocalStorage() {
  // Log all the keys and values stored in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
  }
}

// Call the function to display localStorage in the console

// Retrieve the "users" array
const users = JSON.parse(localStorage.getItem('users'));

// Ensure the index exists
const index = 0; // Change this to any index you want to access
if (users && users.length > index) {
  const userAtIndex = users[index];
  console.log(userAtIndex);  // Logs the user object at the given index
} else {
  console.log("Index out of bounds or no users in localStorage.");
}