// Function to handle file upload
document.getElementById("uploadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('cvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // Upload file to Firebase Storage
    const fileRef = storageRef.child('resumes/' + fileName);
    fileRef.put(file).then((snapshot) => {
        console.log('Uploaded a file:', snapshot.metadata.name);
        alert('Resume uploaded successfully.');
        // Only proceed with database upload if the form is submitted
        if (e.type === 'submit') {
            // Add code to upload file to the database here
            // For example:
            // db.collection('resumes').add(snapshot.metadata.name);
        }
    }).catch((error) => {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading. Please try again.');
    });
});
