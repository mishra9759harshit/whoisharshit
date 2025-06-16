
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

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
  const database = getDatabase(app);
  const feedbackRef = ref(database, 'feedback');

  onValue(feedbackRef, (snapshot) => {
    const data = snapshot.val();
    const feedbackList = document.getElementById('feedbackList');
    const overallRatingDisplay = document.getElementById('overallRating');

    if (!data) return;

    feedbackList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    let totalRating = 0;
    let count = 0;

    Object.values(data).forEach(entry => {
      const name = entry.name || "Anonymous";
      const rating = parseFloat(entry.rating || 0);
      const suggestion = entry.suggestion || "";

      totalRating += rating;
      count++;

      const card = document.createElement('div');
card.className = `
  min-w-[300px] max-w-[340px] snap-center flex-shrink-0 
  bg-gradient-to-br from-[#0c1e22]/80 to-[#0a1418]/90
  border border-cyan-700/40 rounded-2xl p-5 shadow-[0_6px_16px_#012f3c50]
  hover:scale-[1.03] transition-transform duration-300 ease-in-out
  backdrop-blur-sm text-cyan-100 space-y-3
`;

card.innerHTML = `
  <h3 class="text-lg font-semibold text-cyan-200 tracking-wide flex items-center gap-2">
    <i class="fas fa-user-secret text-cyan-400"></i> ${name}
  </h3>
  <p class="text-yellow-300 text-sm flex items-center gap-1">
    <i class="fas fa-star"></i> <span class="font-bold">${rating}</span>/5
  </p>
  <p class="italic text-cyan-100 text-sm border-l-4 border-cyan-600 pl-4">
    “${suggestion}”
  </p>
`;
      fragment.appendChild(card);
    });

    feedbackList.appendChild(fragment);

    const avg = (totalRating / count).toFixed(1);
    overallRatingDisplay.innerHTML = `
      <div class="text-center mt-6 text-cyan-200 text-lg font-medium">
        🌟 Overall Rating: <span class="text-yellow-300 font-bold">${avg}</span>/5 from 
        <span class="text-cyan-100">${count}</span> user${count > 1 ? 's' : ''}
      </div>
    `;
  });

