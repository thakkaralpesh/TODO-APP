import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyBytmRDclsVLnni_QyOsQQlnxtHvdMl8ME",
    authDomain: "todo-app-3a78a.firebaseapp.com",
    projectId: "todo-app-3a78a",
    storageBucket: "todo-app-3a78a.appspot.com",
    messagingSenderId: "726207577955",
    appId: "1:726207577955:web:958766e35efe85cfdf9d56",
    measurementId: "G-2BN8JMT0CD"
});

const db=firebaseApp.firestore();

export default db;