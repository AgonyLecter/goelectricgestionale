// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC346gJHt-Dg7_bjzYw7k1D6j0tcalxht4",
    authDomain: "goelectric-e9299.firebaseapp.com",
    projectId: "goelectric-e9299",
    storageBucket: "goelectric-e9299.appspot.com",
    messagingSenderId: "81618360543",
    appId: "1:81618360543:web:67a9a4d38ec18400c1316a",
    measurementId: "G-6FZQSDWEZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    function fetchScooters() {
        const dbRef = ref(db, 'scooters');
        onValue(dbRef, (snapshot) => {
            const scooterList = document.getElementById('scooterList');
            scooterList.innerHTML = ''; // Clear existing list
            snapshot.forEach(childSnapshot => {
                let key = childSnapshot.key;
                let scooter = childSnapshot.val();
                scooterList.innerHTML += `<div>${scooter.name} - ${scooter.status} <button onclick="toggleStatus('${key}', '${scooter.status}')">Toggle Status</button></div>`;
            });
        });
    }

    function toggleStatus(key, status) {
        const newStatus = status === 'disponibile' ? 'noleggiato' : 'disponibile';
        update(ref(db, 'scooters/' + key), {status: newStatus});
    }

    fetchScooters();
});
