"use strict"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyBYRrekypRb1m-BL7o_U5MagKeD13W12gg",
    authDomain: "nexin-c3255.firebaseapp.com",
    projectId: "nexin-c3255",
    storageBucket: "nexin-c3255.appspot.com",
    messagingSenderId: "544866844239",
    appId: "1:544866844239:web:47412d500ac191f63b743a",
    measurementId: "G-QLDW87EMGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = firebase.firestore();
const drawingsRef = db.collection("drawings");
const paintingsRef = db.collection("paintings");
const gabbrosRef = db.collection("gabbros");

let database = [];
drawingsRef.onSnapshot(function (snapshotData) {

    snapshotData.forEach(doc => {
        let dt = doc.data();
        dt.id = doc.id;
        database.push(dt);

    }
    );
    console.log(database[0]);
});
