import firebase from "firebase/compat";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5FArjRcphn5zzv2YdcSLJ-1aRwg99lds",
    authDomain: 'rifasa-car.firebaseapp.com',
    projectId: "rifasa-car",
    storageBucket: "'rifasa-car.appspot.com",
    messagingSenderId: "909889981306",
    appId: "1:909889981306:android:0ceb227b09f7a4d348e4c3",
    measurementId: "G-BSFVMK383E"
}


const Firebase = firebase.initializeApp(firebaseConfig)
export default Firebase;
