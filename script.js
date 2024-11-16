let failedAttempts = 0; // Initialize failed attempts counter
   
function myMenuFunction() {
 var i = document.getElementById("navMenu");

 if(i.className === "nav-menu") {
     i.className += " responsive";
 } else {
     i.className = "nav-menu";
 }
}



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

// Get references to HTML elements
const loginContainer = document.getElementById('login');
const registerContainer = document.getElementById('register');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const dateOfBirthInput = document.getElementById('dateOfBirth');

// Helper function to toggle between login and registration forms
function toggleForm(showLogin) {
  if (showLogin) {
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
  } else {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
  }
}

// Handle login form submission
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validate login credentials against stored data
  if (validateLogin(username, password)) {
    // Redirect to dashboard or home page
    window.location.href = 'Home.html';
  } else {
    alert('Invalid TRN or password. Please try again.');
  }
}

// Handle registration form submission
function handleRegister(event) {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const gender = document.getElementById('gender').value;
  const trn = document.getElementById('trn').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate registration data
  if (validateRegistration(firstName, lastName, dateOfBirth, gender, trn, phoneNumber, email, password)) {
    // Store registration data in localStorage
    storeRegistrationData(firstName, lastName, dateOfBirth, gender, trn, phoneNumber, email, password);
    alert('Registration successful! Please log in.');
    toggleForm(true); // Switch back to login form
  }
}

// Validate login credentials
function validateLogin(username, password) {
  // Retrieve registration data from localStorage
  const registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];

  // Check if the entered TRN and password match a registered user
  const user = registrationData.find(user => user.trn === username && user.password === password);
  return !!user;
}

// Validate registration data
function validateRegistration(firstName, lastName, dateOfBirth, gender, trn, phoneNumber, email, password) {
  // Check if all fields are filled
  if (!firstName || !lastName || !dateOfBirth || !gender || !trn || !phoneNumber || !email || !password) {
    alert('Please fill in all the required fields.');
    return false;
  }

  // Check if the user is at least 18 years old
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if ((monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))) {
    age--;
  }
  if (age < 18) {
    alert('You must be at least 18 years old to register.');
    return false;
  }

  // Check if the TRN is unique
  const registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];
  if (registrationData.some(user => user.trn === trn)) {
    alert('The TRN you entered is already registered. Please use a unique TRN.');
    return false;
  }

  // Check if the password is at least 6 characters long
  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
}

// Store registration data in localStorage
function storeRegistrationData(firstName, lastName, dateOfBirth, gender, trn, phoneNumber, email, password) {
  const registrationData = JSON.parse(localStorage.getItem('registrationData')) || [];
  registrationData.push({ firstName, lastName, dateOfBirth, gender, trn, phoneNumber, email, password });
  localStorage.setItem('registrationData', JSON.stringify(registrationData));
}

// Utility function to safely get data from localStorage
function getStoredData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

// Utility function to safely store data in localStorage
function setStoredData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    return false;
  }
}

// Validate password
function validatePassword(password) {
  return password.length >= 8;
}

// Validate age (must be over 18)
function validateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
}

// Validate TRN format (000-000-000)
function validateTRN(trn) {
  const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
  return trnPattern.test(trn);
}

// Check if TRN is unique
function isTRNUnique(trn) {
  const existingData = getStoredData('RegistrationData');
  return !existingData.some(user => user.trn === trn);
}

// Store registration data
function storeRegistration(formData) {
  // Create registration object with all user data
  const registration = {
    Firstname: formData.Firstname,
    Lastname: formData.Lastname,
    dateOfBirth: formData.dateOfBirth,
    Gender: formData.Gender,
    phoneNumber: formData.phoneNumber,
    Email: formData.Email,
    TRN: formData.TRN,
    Password: formData.Password,
    dateOfRegistration: new Date().toISOString(),
    cart: JSON.stringify({}),  // Initialize empty cart as JSON string
    invoices: JSON.stringify([])  // Initialize empty invoices array as JSON string
  };

  // Get existing data from localStorage
  let existingData = getStoredData('RegistrationData');

  // Append new registration
  existingData.push(registration);

  // Store updated data
  return setStoredData('RegistrationData', existingData);
}

// Main registration function
function register(formData) {
  // Validate password
  if (!validatePassword(formData.Password)) {
    return { success: false, error: 'Password must be at least 8 characters long' };
  }

  // Validate age
  if (!validateAge(formData.dateOfBirth)) {
    return { success: false, error: 'Must be over 18 years old to register' };
  }

  // Validate TRN format
  if (!validateTRN(formData.TRN)) {
    return { success: false, error: 'Invalid TRN format. Use format: 000-000-000' };
  }

  // Check TRN uniqueness
  if (!isTRNUnique(formData.TRN)) {
    return { success: false, error: 'TRN already exists' };
  }

  // Store registration if all validations pass
  const stored = storeRegistration(formData);
  
  if (!stored) {
    return { success: false, error: 'Error storing registration data' };
  }
  
  return { success: true, message: 'Registration successful' };
}

// Utility function to retrieve user data
function getUserData(TRN) {
  try {
    const existingData = getStoredData('RegistrationData');
    const userData = existingData.find(user => user.TRN=== TRN);
    
    if (userData) {
      // Parse JSON strings back to objects/arrays
      userData.cart = JSON.parse(userData.cart);
      userData.invoices = JSON.parse(userData.invoices);
    }
    
    return userData || null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
}

// Attach event listeners
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
loginBtn.addEventListener('click', () => toggleForm(true));
registerBtn.addEventListener('click', () => toggleForm(false));