import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth'

export const fbConfig = {
  apiKey: "AIzaSyBK9PAVf-ndRSKWHsE8gwFh9RO5jcO_Vi4",
  authDomain: "app-clone-42d4a.firebaseapp.com",
  databaseURL: "https://app-clone-42d4a.firebaseio.com",
  projectId: "app-clone-42d4a",
  storageBucket: "app-clone-42d4a.appspot.com",
  messagingSenderId: "790208879517",
  appId: "1:790208879517:web:5c19704d694fe8bacd2d74",
  measurementId: "G-RDZL5GZ6P5"
  };
  // Initialize Firebase
  firebase.initializeApp(fbConfig);
  firebase.analytics();
  firebase.firestore();
  
  
  export default firebase;
  
  
  