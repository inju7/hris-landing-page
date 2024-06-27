// sample.js

// Event listener for file upload button
document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const uploadPopup = document.getElementById('uploadPopup');
    const closeButton = document.getElementById('closeButton');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
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
        for (let file of event.target.files) {
            selectedFiles.push(file);
        }
        displaySelectedFiles();
    });

    function displaySelectedFiles() {
        fileList.innerHTML = '';
        selectedFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${getFileIcon(file)} ${file.name}</span> <button class="remove-btn" data-index="${index}"><i class="fas fa-trash-alt" style="color: red;"></i></button>`;
            fileList.appendChild(li);
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
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

    uploadBtn.addEventListener('click', function() {
        if (selectedFiles.length === 0) {
            alert("Please select files to upload.");
            return;
        }

        alert(`${selectedFiles.length} file(s) uploaded successfully.`);
        selectedFiles = [];
        fileInput.value = "";
        fileList.innerHTML = "";
        uploadPopup.style.display = 'none';
    });
});
