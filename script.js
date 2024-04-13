import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, onValue, update } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
                    const scooter = childSnapshot.val();
                    scooter.id = childSnapshot.key;
                    this.scooters.push(scooter);
                });
            });
        },
        toggleStatus(scooter) {
            const newStatus = scooter.status === 'disponibile' ? 'noleggiato' : 'disponibile';
            const days = newStatus === 'noleggiato' ? parseInt(prompt("Per quanti giorni vuoi noleggiare lo scooter?")) : 0;
            if (!days && newStatus === 'noleggiato') {
                this.message = 'Inserimento non valido. Riprova.';
                this.isError = true;
                return;
            }
            update(ref(db, 'scooters/' + scooter.id), { status: newStatus, rentalDays: days })
                .then(() => {
                    this.message = `Scooter ${newStatus === 'noleggiato' ? 'noleggiato per ' + days + ' giorni' : 'reso disponibile'}.`;
                    this.isError = false;
                })
                .catch(error => {
                    this.message = 'Errore: ' + error.message;
                    this.isError = true;
                });
        },
        unlockScooter(scooter) {
            update(ref(db, 'scooters/' + scooter.id), { status: 'disponibile', rentalDays: 0 })
                .then(() => {
                    this.message = 'Scooter sbloccato e reso disponibile.';
                    this.isError = false;
                })
                .catch(error => {
                    this.message = 'Errore: ' + error.message;
                    this.isError = true;
                });
        }
    }
});
