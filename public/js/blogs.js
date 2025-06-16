import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyADGOyCgU6Xa9WIR1p1PBLb249-6rK4bRU",
  authDomain: "code-f0d55.firebaseapp.com",
  databaseURL: "https://code-f0d55-default-rtdb.firebaseio.com",
  projectId: "code-f0d55",
  storageBucket: "code-f0d55.appspot.com",
  messagingSenderId: "704792212542",
  appId: "1:704792212542:web:4a210131decc9a2b03cd6f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const container = document.getElementById("blogContainer");
const blogsRef = ref(database, 'blogs');

onValue(blogsRef, (snapshot) => {
  container.innerHTML = ''; // Clear old
  const data = snapshot.val();

  Object.values(data).forEach(post => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-indigo-500 cursor-pointer transition duration-300";
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-semibold text-indigo-300">${post.title}</h3>
        <p class="text-gray-300 mt-2">${post.description}</p>
      </div>
    `;
    card.onclick = () => loadBlog(post.title, post.url);
    container.appendChild(card);
  });
});
