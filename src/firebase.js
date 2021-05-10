import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCq5w8dYGRZOi9tmZH6rCUlEpVjvocM17Y",
    authDomain: "kbhthl-calendar.firebaseapp.com",
    projectId: "kbhthl-calendar",
    storageBucket: "kbhthl-calendar.appspot.com",
    messagingSenderId: "77918691961",
    appId: "1:77918691961:web:2c6dd78ecb0d1ab0642aa8",
    measurementId: "G-CPP59PSWVK"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };