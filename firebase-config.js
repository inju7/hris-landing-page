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

    // File upload functionality
    const uploadForm = document.getElementById("uploadForm");
    const uploadPopup = document.getElementById('uploadPopup');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadButton = document.getElementById('uploadButton');
    const closeButton = document.getElementById('closeButton');
    let selectedFiles = [];

    uploadButton.addEventListener('click', function(event) {
        event.stopPropagation();
        uploadPopup.style.display = 'flex';
    });

    closeButton.addEventListener('click', function() {
        uploadPopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === uploadPopup) {
            uploadPopup.style.display = 'none';
        }
    });

    fileInput.addEventListener('change', function(event) {
        selectedFiles = Array.from(event.target.files);
        displaySelectedFiles();
    });

    function displaySelectedFiles() {
        fileList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${getFileIcon(file)} ${file.name}</span> <button class="remove-btn" data-index="${index}" style="background:white"><i class="fas fa-trash-alt" style="color: red;"></i></button>`;
            fileList.appendChild(li);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                selectedFiles.splice(index, 1);
                displaySelectedFiles();
            });
        });
    }

    function getFileIcon(file) {
        const fileType = file.type;
        if (fileType.startsWith('image/')) {
            return '<i class="fas fa-file-image file-icon"></i>';
        } else if (fileType.startsWith('video/')) {
            return '<i class="fas fa-file-video file-icon"></i>';
        } else if (fileType.startsWith('audio/')) {
            return '<i class="fas fa-file-audio file-icon"></i>';
        } else if (fileType === 'application/pdf') {
            return '<i class="fas fa-file-pdf file-icon"></i>';
        } else if (fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return '<i class="fas fa-file-word file-icon"></i>';
        } else if (fileType === 'application/vnd.ms-excel' || fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return '<i class="fas fa-file-excel file-icon"></i>';
        } else {
            return '<i class="fas fa-file file-icon"></i>';
        }
    }

    if (uploadForm) {
        uploadForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            if (selectedFiles.length === 0) {
                alert('Please select files to upload.');
                return;
            }

            try {
                const storageRef = firebase.storage().ref();
                for (let file of selectedFiles) {
                    const fileRef = storageRef.child('resumes/' + file.name);
                    await fileRef.put(file);
                    console.log('Uploaded a file:', file.name);
                }
                alert(`${selectedFiles.length} file(s) uploaded successfully.`);
                selectedFiles = [];
                fileInput.value = "";
                fileList.innerHTML = "";
                uploadPopup.style.display = 'none';
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('An error occurred while uploading. Please try again. Error: ' + error.message);
            }
        });
    } else {
        console.error('Upload form not found');
    }

    // Function to handle contact form submission
    async function submitForm(e) {
        e.preventDefault();

        const firstName = getElementVal("first-name");
        const lastName = getElementVal("last-name");
        const email = getElementVal("email");
        const phoneNum = getElementVal("phone-num");
        const msgContent = getElementVal("msg-content");

        if (!firstName || !lastName || !email || !phoneNum || !msgContent) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        console.log(firstName, lastName, email, phoneNum, msgContent);
        await saveMessages(firstName, lastName, email, phoneNum, msgContent);
    }

    // Function to save messages to Firebase Realtime Database
    const saveMessages = async (firstName, lastName, email, phoneNum, msgContent) => {
        try {
            await contactFormDB.push({
                firstName, lastName, email, phoneNum, msgContent
            });
            console.log('Form data saved successfully!');
            alert('Form submitted successfully.');
            document.getElementById("contactForm").reset();
        } catch (error) {
            console.error('Error saving form data:', error);
            alert('An error occurred. Please try again. Error: ' + error.message);
        }
    };

    // Function to get element value by ID
    const getElementVal = (id) => {
        return document.getElementById(id).value;
    };

    // Event listener for contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", submitForm);
    } else {
        console.error('Contact form not found');
    }
});