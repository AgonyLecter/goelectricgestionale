document.addEventListener('DOMContentLoaded', () => {
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
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

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
                const dbRef = firebase.database().ref('scooters');
                dbRef.on('value', (snapshot) => {
                    this.scooters = [];
                    snapshot.forEach((childSnapshot) => {
                        const scooter = { id: childSnapshot.key, ...childSnapshot.val() };
                        this.scooters.push(scooter);
                    });
                });
            },
            toggleStatus(scooter) {
                const newStatus = scooter.status === 'disponibile' ? 'noleggiato' : 'disponibile';
                firebase.database().ref('scooters/' + scooter.id).update({ status: newStatus })
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
                firebase.database().ref('scooters/' + scooter.id).update({ status: 'disponibile' })
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
});


