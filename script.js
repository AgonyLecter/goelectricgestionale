// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC346gJHt-Dg7_bjzYw7k1D6j0tcalxht4",
  authDomain: "goelectric-e9299.firebaseapp.com",
  databaseURL: "https://goelectric-e9299-default-rtdb.firebaseio.com",
  projectId: "goelectric-e9299",
  storageBucket: "goelectric-e9299.appspot.com",
  messagingSenderId: "81618360543",
  appId: "1:81618360543:web:67a9a4d38ec18400c1316a",
  measurementId: "G-6FZQSDWEZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Example function to write data to Firebase Realtime Database
function writeScooterData(scooterId, name, status) {
  set(ref(db, 'scooters/' + scooterId), {
    name: name,
    status: status
  });
}

// Example function to read data from Firebase Realtime Database
function readScooterData() {
  const dbRef = ref(db, 'scooters/');
  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childKey, childData); // Output the key and data for each child
    });
  });
}

// Using the functions
writeScooterData('scooter1', 'Scooter Model X', 'disponibile');
readScooterData();
