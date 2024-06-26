document.addEventListener('DOMContentLoaded', function() {
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

    // Event listener for file upload button
    const uploadButton = document.getElementById("uploadButton");
    if (uploadButton) {
        uploadButton.addEventListener("click", function() {
            const file = document.getElementById('cvFile').files[0];

            if (file) {
                uploadFile(file);
            } else {
                alert('Please select a PDF file to upload.');
            }
        });
    } else {
        console.error('Upload button not found');
    }

    // Function to handle file upload
    const uploadFile = (file) => {
        // Initialize Firebase Storage
        const storageRef = firebase.storage().ref();
        const fileName = `resume_${Date.now()}_${file.name}`;
        const fileRef = storageRef.child(`resumes/${fileName}`);

        // Upload file to Firebase Storage
        fileRef.put(file).then((snapshot) => {
            console.log('Uploaded a file:', snapshot.metadata.name);
            alert('File uploaded successfully.'); // Optional: Show a success message

            // Get download URL for the uploaded file
            fileRef.getDownloadURL().then((fileUrl) => {
                console.log('File URL:', fileUrl);
            }).catch((error) => {
                console.error('Error getting file download URL:', error);
            });
        }).catch((error) => {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading. Please try again.'); // Optional: Show an error message
        });
    };

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
});
