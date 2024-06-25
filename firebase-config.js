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
  var contactFormDB = firebase.database().ref('contactForm')
  document.getElementById("contactForm").addEventListener("submit", submitForm);

  function submitForm(e) {
    e.preventDefault();
  
    var firstName = getElementVal("first-name");
    var lastName = getElementVal("last-name");
    var email = getElementVal("email");
    var phoneNum = getElementVal("phone-num");
    var msgContent = getElementVal("msg-content");

    console.log(firstName, lastName, email, phoneNum, msgContent)
    saveMessages(firstName, lastName, email, phoneNum, msgContent);

    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
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