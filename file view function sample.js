// Function to handle file upload
document.getElementById("uploadForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('cvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file to upload.');
        return;
    }

    // File name for storage reference (you can modify this as needed)
    const fileName = `resume_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, 'resumes/' + fileName);

    try {
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);
        console.log('Uploaded a file:', fileName);

        // Get the download URL and display the file
        const downloadURL = await getDownloadURL(storageRef);
        document.getElementById('cvPreview').src = downloadURL;
        alert('Resume uploaded successfully.'); // Optional: Show a success message
        document.getElementById("uploadForm").reset(); // Reset the upload form
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading. Please try again.'); // Optional: Show an error message
    }
});