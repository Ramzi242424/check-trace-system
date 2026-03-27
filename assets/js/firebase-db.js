// assets/js/firebase-db.js
// Сюда мы вставим конфиг, который ты получишь в консоли Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    // ТВОЙ КОНФИГ БУДЕТ ЗДЕСЬ
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveDevice(imei, deviceData) {
    try {
        const docRef = doc(db, "checked_devices", imei);
        await setDoc(docRef, {
            ...deviceData,
            timestamp: new Date().toISOString(),
            status: "verified"
        });
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}