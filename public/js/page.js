import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import {
    getDatabase,
    ref,
    onValue,
    runTransaction
  } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

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

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  function savePageView(pageName = "homepage") {
    const key = `viewed_${pageName}`;
    if (localStorage.getItem(key)) return;

    const pageRef = ref(db, `pageViews/${pageName}`);
    runTransaction(pageRef, (count) => (count || 0) + 1)
      .then(() => localStorage.setItem(key, "true"))
      .catch(console.error);
  }

  function updateDigitColumns(count) {
    const viewCountColumns = document.getElementById("viewCountColumns");
    viewCountColumns.innerHTML = "";

    const digits = count.toString().padStart(6, '0'); // Ensure 6-digit format like 000123

    for (let digit of digits) {
      const digitElement = document.createElement("div");
      digitElement.textContent = digit;
      digitElement.className =
        "w-10 h-12 bg-black text-cyan-300 border-2 border-cyan-400 rounded-md text-2xl font-bold flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200";
      viewCountColumns.appendChild(digitElement);
    }
  }

  function showLiveViewCount(pageName = "homepage") {
    const pageRef = ref(db, `pageViews/${pageName}`);
    onValue(pageRef, (snapshot) => {
      const count = snapshot.val() || 0;
      updateDigitColumns(count);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = window.location.pathname.replace(/\//g, "_") || "home";
    savePageView(page);
    showLiveViewCount(page);
  });