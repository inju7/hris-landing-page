import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
const supabase = createClient(supabaseUrl, supabaseKey)

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

async function handleFileUpload(file) {
    try {
        const { data, error } = await supabase.storage
            .from('resumes')
            .upload(`${Date.now()}_${file.name}`, file);

        if (error) throw error;

        console.log('Uploaded a file:', data.path);
        alert('Resume uploaded successfully.');
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading. Please try again.');
    }
}

// Modify the event listener for file upload
if (uploadButton) {
    uploadButton.addEventListener("click", function() {
        const file = document.getElementById('cvFile').files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
}
