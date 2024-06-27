// firebase-config.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
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
    contactFormDB.push({
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
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", submitForm);
} else {
    console.error('Contact form not found');
}
