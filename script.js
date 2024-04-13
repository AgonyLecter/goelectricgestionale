// Importazione dei moduli Firebase necessari
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, onValue, update } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Configurazione Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

// Inizializzazione di Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Inizializzazione di Vue
new Vue({
    el: '#app',
    data: {
        scooters: [],
        message: '',
        isError: false
    },
    created() {
        this.fetchScooters();
    },
    methods: {
        fetchScooters() {
            const dbRef = ref(db, 'scooters');
            onValue(dbRef, (snapshot) => {
                this.scooters = [];
                snapshot.forEach((childSnapshot) => {
                    const scooter = { id: childSnapshot.key, ...childSnapshot.val() };
                    this.scooters.push(scooter);
                });
            });
        },
        toggleStatus(scooter) {
            const newStatus = scooter.status === 'disponibile' ? 'noleggiato' : 'disponibile';
            update(ref(db, 'scooters/' + scooter.id), { status: newStatus })
                .then(() => {
                    this.message = `Stato aggiornato: ${scooter.name} ora è ${newStatus}.`;
                    this.isError = false;
                })
                .catch(error => {
                    this.message = `Errore: ${error.message}`;
                    this.isError = true;
                });
        },
        unlockScooter(scooter) {
            update(ref(db, 'scooters/' + scooter.id), { status: 'disponibile' })
                .then(() => {
                    this.message = `${scooter.name} è stato sbloccato e ora è disponibile.`;
                    this.isError = false;
                })
                .catch(error => {
                    this.message = `Errore: ${error.message}`;
                    this.isError = true;
                });
        }
    }
});

