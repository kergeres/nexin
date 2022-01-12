"use strict"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";

import { addToBasketListener, saveTosessionStorage, inBasketProducts } from './basket.js';

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

window.addEventListener('load', () => {

    // switch (document.title) {

    //     case includes("drawings"):
    //         firebaseLoad(drawingsRef);
    //         break;

    //     case includes("paintings"):
    //         firebaseLoad(paintingsRef);
    //         break;
    //     case includes("gabbros"):
    //         firebaseLoad(gabbrosRef);
    //         break;
    // }
    if (document.title.includes("drawings")) {
        firebaseLoad(drawingsRef)
    }

    else if (document.title.includes("paintings")) {
        firebaseLoad(paintingsRef)
    }
    else if (document.title.includes("gabbros")) {
        firebaseLoad(gabbrosRef)
    }
})

let firebaseLoad = (documentName) => {


    documentName.onSnapshot(function (snapshotData) {

        snapshotData.forEach(doc => {
            let dt = doc.data();
            dt.id = doc.id;
            database.push(dt);

        }
        );
        appendCard(database)

    });
}


let appendCard = (databasIn) => {
    let htmltemlapte = '';

    for (const card of databasIn) {

        htmltemlapte += `
        <div id="${card.id}" class="card-container">
        <div class="card-img-container">
            <img class="card-image"
                src="${card.imgSrc}">
        </div>
        <h2 class="title"  >${card.title}</h2>
        <h3  >${card.price}</h3>
        <h4 class="basket" >kosárba</h4>
    </div>
        
      

        `

    }
    document.querySelector('.content-container').innerHTML = htmltemlapte
    addToBasketListener()

}


