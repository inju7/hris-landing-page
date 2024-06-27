import { createClient } from '@supabase/supabase-js'

document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'https://zjimnxnzjzcdsnmqmqeg.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqaW1ueG56anpjZHNubXFtcWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0NTU4MTYsImV4cCI6MjAzNTAzMTgxNn0.fqRCjCd9q03Qorbyxxm1aA2eXw0ucKFvGT0Nt84WgWA'
    const supabase = createClient(supabaseUrl, supabaseKey)

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
    const uploadFile = async (file) => {
        try {
            const fileName = `resume_${Date.now()}_${file.name}`;
            const { data, error } = await supabase.storage
                .from('resumes')
                .upload(`resumes/${fileName}`, file);

            if (error) throw error;

            console.log('Uploaded a file:', data.path);
            alert('File uploaded successfully.');

            // Get public URL for the uploaded file
            const { data: publicUrlData } = supabase.storage
                .from('resumes')
                .getPublicUrl(`resumes/${fileName}`);

            console.log('File URL:', publicUrlData.publicUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading. Please try again.');
        }
    };

    // Function to handle form submission
    async function submitForm(e) {
        e.preventDefault();

        // Get form values
        const firstName = getElementVal("first-name");
        const lastName = getElementVal("last-name");
        const email = getElementVal("email");
        const phoneNum = getElementVal("phone-num");
        const msgContent = getElementVal("msg-content");

        console.log(firstName, lastName, email, phoneNum, msgContent);

        // Save messages to Supabase
        await saveMessages(firstName, lastName, email, phoneNum, msgContent);
    }

    // Function to save messages to Supabase
    const saveMessages = async (firstName, lastName, email, phoneNum, msgContent) => {
        try {
            const { data, error } = await supabase
                .from('contact_form')
                .insert([
                    { 
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone_num: phoneNum,
                        msg_content: msgContent
                    }
                ]);

            if (error) throw error;

            console.log('Form data saved successfully!');
            alert('Form submitted successfully.');
            document.getElementById("contactForm").reset();
        } catch (error) {
            console.error('Error saving form data:', error);
            alert('An error occurred. Please try again.');
        }
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