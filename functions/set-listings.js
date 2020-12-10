const functions = require('firebase-functions');
const firebase = require('firebase');
const axios = require('axios');
axios.defaults.baseURL = "https://api.repliers.io";
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common['REPLIERS-API-KEY'] = "ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa";
axios.defaults.responseType = "json";

// exports.listings = functions.runWith({ timeoutSeconds: 300 }).https.onRequest(async (req, res) => {
//     const firebaseConfig = {
//         apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
//         authDomain: "brokier-1126.firebaseapp.com",
//         databaseURL: "https://brokier-1126.firebaseio.com",
//         projectId: "brokier-1126",
//         storageBucket: "brokier-1126.appspot.com",
//         messagingSenderId: "453223822262",
//         appId: "1:453223822262:web:2c90f3e750786006e40717",
//         measurementId: "G-WH0GYZ9J6V"
//     };
//     const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
//     var currentPage = 1;
//     axios.get(`listings?pageNum=${currentPage}`).then(async (res) => {
//         var batch = firestore.batch();
//         await res.data.listings.map(async (listingOne, key) => {
//             var listingRef = firestore.collection('listings-latest').doc(listingOne.mlsNumber);
//             await batch.set(listingRef, listingOne);
//         });
//         return await batch.commit();
//     });
// });


exports.listings = functions.pubsub.schedule(`every 2 minutes`).onRun(async (req, res) => {
    const firebaseConfig = {
        apiKey: "AIzaSyD_xrLheTDJ_PCGWtZIJhGoDd9u4QA7Hbs",
        authDomain: "brokier-1126.firebaseapp.com",
        databaseURL: "https://brokier-1126.firebaseio.com",
        projectId: "brokier-1126",
        storageBucket: "brokier-1126.appspot.com",
        messagingSenderId: "453223822262",
        appId: "1:453223822262:web:2c90f3e750786006e40717",
        measurementId: "G-WH0GYZ9J6V"
    };
    const database = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).database() : firebase.app().database();
    await database.ref(`configs/page`).set(listingOne);
    // for (let index = 1; index < 450; index++) {
    //     axios.get(`listings?pageNum=${index}`).then(async (res) => {
    //         res.data.listings.map(async (listingOne) => {
    //             await database.ref(`listings/${listingOne.mlsNumber}`).set(listingOne);
    //         });
    //     });
    // }
});
