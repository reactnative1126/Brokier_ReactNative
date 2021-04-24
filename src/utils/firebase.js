import * as firebase from "firebase";
import 'firebase/firestore';

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

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();