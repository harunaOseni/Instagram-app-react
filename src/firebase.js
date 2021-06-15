import firebase from "firebase";

//Starting or initializing firebase to be used in the project
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDInwKiUTJiGEc9RilYD4X4KnuTnDG9_Fw",
  authDomain: "instagram-app-reactjs.firebaseapp.com",
  projectId: "instagram-app-reactjs",
  storageBucket: "instagram-app-reactjs.appspot.com",
  messagingSenderId: "322527225112",
  appId: "1:322527225112:web:1a32eb76895cedcef82a6d",
  measurementId: "G-NEP0RW7T0G",
});

const db = firebaseApp.firestore(); //Gives access to the firestore database
const auth = firebase.auth(); //Gives access to the firebase authentication
const storage = firebase.storage(); //Gives access to upload and share user generated content, such as images and video.

export { db, auth, storage };
