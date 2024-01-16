const firebaseConfig = {
  apiKey: "AIzaSyCeBYkpFwsq9_IHDsoRyAZgbNyb78-oTgs",
  authDomain: "pustakalay-auth.firebaseapp.com",
  databaseURL: "https://pustakalay-auth-default-rtdb.firebaseio.com",
  projectId: "pustakalay-auth",
  storageBucket: "pustakalay-auth.appspot.com",
  messagingSenderId: "911918208081",
  appId: "1:911918208081:web:6f24aea08ee2850424d470",
  measurementId: "G-HQF862LDF3"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  // Check if the form is valid
  if (validateForm(name, emailid, msgContent)) {
    // Save data to Firebase
    saveMessages(name, emailid, msgContent);

    // Show alert
    showAlert("Form submitted successfully!");

    // Reset the form
    document.getElementById("contactForm").reset();
  }
}

const validateForm = (name, emailid, msgContent) => {
  // You can add your form validation logic here
  // For example, check if required fields are not empty

  if (name.trim() === "" || emailid.trim() === "" || msgContent.trim() === "") {
    showAlert("Please fill in all fields");
    return false;
  }

  return true;
};

const showAlert = (message) => {
  var alertElement = document.querySelector(".alert");
  alertElement.innerText = message;

  // Enable alert
  alertElement.style.display = "block";

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alertElement.style.display = "none";
  }, 3000);
};

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
