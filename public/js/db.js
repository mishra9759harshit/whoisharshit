import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyADGOyCgU6Xa9WIR1p1PBLb249-6rK4bRU",
    authDomain: "code-f0d55.firebaseapp.com",
    databaseURL: "https://code-f0d55-default-rtdb.firebaseio.com",
    projectId: "code-f0d55",
    storageBucket: "code-f0d55.appspot.com",
    messagingSenderId: "704792212542",
    appId: "1:704792212542:web:4a210131decc9a2b03cd6f",
    measurementId: "G-681TC999ZF"
  };

  // Init Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  // Form Submission Handler
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      const messageRef = ref(database, 'messages');
      push(messageRef, {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      }).then(() => {
        document.getElementById('confirmation').classList.remove('hidden');
        this.reset();
      }).catch((error) => {
        alert("Error sending message: " + error.message);
      });
    }
  });

 