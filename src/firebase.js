// import firebase from "firebase";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBQBosadCMe4WJzJ28Rc4pzGpdPLRxKspM",
  authDomain: "instagram-clone-9575e.firebaseapp.com",
  projectId: "instagram-clone-9575e",
  storageBucket: "instagram-clone-9575e.appspot.com",
  messagingSenderId: "70672315716",
  appId: "1:70672315716:web:fb8ca9b36e556fcad39311",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, firestore, storage, provider, firebase };
