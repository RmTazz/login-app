import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDt_w98PzXLvdso61CJ__O3vukkaGVUQ7w",
    authDomain: "customers-f4196.firebaseapp.com",
    projectId: "customers-f4196",
    storageBucket: "customers-f4196.firebasestorage.app",
    messagingSenderId: "1067105362007",
    appId: "1:1067105362007:web:77fed90f1c1fa808460312",
    measurementId: "G-BZL98864EE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, serverTimestamp };