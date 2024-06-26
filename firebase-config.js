const firebaseConfig = {
    apiKey: "AIzaSyA4sqd8UhW1-rYHuDr7zTcZeoulBapf50c",
    authDomain: "hris-landing-page-2283a.firebaseapp.com",
    databaseURL: "https://hris-landing-page-2283a-default-rtdb.firebaseio.com",
    projectId: "hris-landing-page-2283a",
    storageBucket: "hris-landing-page-2283a.appspot.com",
    messagingSenderId: "533745622982",
    appId: "1:533745622982:web:50ec3c7580375c37aa1cc7",
    measurementId: "G-HQGN8M98Z5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database reference
const contactFormDB = firebase.database().ref('contactForm');

// Function to handle form submission
function submitForm(e) {
    e.preventDefault();

    // Get form values
    const firstName = getElementVal("first-name");
    const lastName = getElementVal("last-name");
    const email = getElementVal("email");
    const phoneNum = getElementVal("phone-num");
    const msgContent = getElementVal("msg-content");

    console.log(firstName, lastName, email, phoneNum, msgContent);

    // Save messages to Firebase
    saveMessages(firstName, lastName, email, phoneNum, msgContent);
}

// Function to save messages to Firebase Realtime Database
const saveMessages = (firstName, lastName, email, phoneNum, msgContent) => {
    const newContactForm = contactFormDB.push();
    newContactForm.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNum: phoneNum,
        msgContent: msgContent
    }).then(() => {
        console.log('Form data saved successfully!');
        alert('Form submitted successfully.'); // Optional: Show a success message
        document.getElementById("contactForm").reset(); // Reset the form after submission
    }).catch((error) => {
        console.error('Error saving form data:', error);
        alert('An error occurred. Please try again.'); // Optional: Show an error message
    });
};

// Function to get element value by ID
const getElementVal = (id) => {
    return document.getElementById(id).value;
};

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);