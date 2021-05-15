import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase Key
const firebaseConfig = {
    apiKey: "AIzaSyBRfd244wcEVP9vKsW-zRXrR_99s2Hv5oM",
    authDomain: "budgetscores-d10c5.firebaseapp.com",
    projectId: "budgetscores-d10c5",
    storageBucket: "budgetscores-d10c5.appspot.com",
    messagingSenderId: "575384564584",
    appId: "1:575384564584:web:c4153e6dacb9a5a48c1cdd"
};
// Initializing Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fireStore = firebase.firestore();

function signUp() {
    var email = document.getElementById("email");
    var paswd = document.getElementById("paswd");
    auth.createUserwithEmailAndPassword(email.value, paswd.value);
    promise.catch(err => alert(err.message));

    alert("User Logged In");
}


export {auth,fireStore,signUp};