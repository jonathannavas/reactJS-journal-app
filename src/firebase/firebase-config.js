import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBAIiNDrhEwumEt6LDIOsUxRhk_EPDlZw4",
  authDomain: "reactjs-journal.firebaseapp.com",
  projectId: "reactjs-journal",
  storageBucket: "reactjs-journal.appspot.com",
  messagingSenderId: "506320836986",
  appId: "1:506320836986:web:b1c9da7750e8476156dec3"
};

firebase.initializeApp( firebaseConfig );

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}