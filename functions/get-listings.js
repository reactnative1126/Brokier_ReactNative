const functions = require('firebase-functions');
// firebase configuration
const firebase = require('firebase');
// axios configuration
const axios = require('axios');
axios.defaults.baseURL = "https://api.repliers.io";
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common['REPLIERS-API-KEY'] = "ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa";
axios.defaults.responseType = "json";

exports.listings = functions.runWith({ timeoutSeconds: 300 }).https.onRequest(async (req, res) => {
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
    const firestore = !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
    await firestore.collection('listings-latest').where('daysOnMarket', '==', '1').get().then(listings => {
        return listings.docs.map((doc) => doc.data());
    });
});
