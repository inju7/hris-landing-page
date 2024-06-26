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

//initialize firebase
firebase.initializeApp(firebaseConfig);

//database reference
var contactFormDB = firebase.database().ref('contactForm');
document.getElementById("contactForm").addEventListener("submit", submitForm);

//submit form function &saveMessages
function submitForm(e) {
    e.preventDefault();

    var firstName = getElementVal("first-name");
    var lastName = getElementVal("last-name");
    var email = getElementVal("email");
    var phoneNum = getElementVal("phone-num");
    var msgContent = getElementVal("msg-content");

    console.log(firstName, lastName, email, phoneNum, msgContent);
    saveMessages(firstName, lastName, email, phoneNum, msgContent);
}

// For Uploading PDF file 'CV'
// Initialize Firebase Storage
const storage = firebase.storage();

// Create a reference to the file to be uploaded
const fileRef = storage.ref(`pdfs/${fileName}`);

// Upload the file to Firebase Storage
fileRef.put(file).then((snapshot) => {
    console.log('Uploaded a pdf file!');
}).catch((error) => {
    console.error('Error uploading pdf file:', error);
    // Reset the form
    document.getElementById("contactForm").reset();
});

const saveMessages = (firstName, lastName, email, phoneNum, msgContent) => {
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        firstName : firstName,
        lastName : lastName,
        email: email,
        phoneNum : phoneNum,
        msgContent: msgContent,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
