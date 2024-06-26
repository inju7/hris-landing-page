// Function to handle file upload
document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('cvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // File name for storage reference (you can modify this as needed)
    //rits pogi
    const fileName = `resume_${Date.now()}_${file.name}`;

    // Upload file to Firebase Storage
    const fileRef = storageRef.child('resumes/' + fileName);
    fileRef.put(file).then((snapshot) => {
        console.log('Uploaded a file:', snapshot.metadata.name);
        alert('Resume uploaded successfully.'); // Optional: Show a success message
        document.getElementById("uploadForm").reset(); // Reset the upload form
    }).catch((error) => {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading. Please try again.'); // Optional: Show an error message
    });
});

