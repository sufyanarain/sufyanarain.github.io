
const firebaseConfig = {
    apiKey: "AIzaSyC3Re5apf53IUF9g_PTQMOllhhY4aDOYmI",
    authDomain: "foodapp-62728.firebaseapp.com",
    projectId: "foodapp-62728",
    storageBucket: "foodapp-62728.appspot.com",
    messagingSenderId: "846599120867",
    appId: "1:846599120867:web:b7dc178b5d12ae897662d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let database = firebase.firestore()

let email = document.getElementById("email");
let password = document.getElementById("password");
let login = document.getElementById("login");
// let CustLogin = document.getElementById("CustLogin");



let restaurantLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            window.location = "main.html"
        })
        .catch((error) => {
        });
}
login.addEventListener('click', restaurantLogin)


