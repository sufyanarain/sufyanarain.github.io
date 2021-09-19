
const firebaseConfig = {
    apiKey: "AIzaSyDKEamE5UmWyRiGNIPtGfw3VgvaKJntA-Q",
    authDomain: "balloon-popup-game-7bfcb.firebaseapp.com",
    projectId: "balloon-popup-game-7bfcb",
    storageBucket: "balloon-popup-game-7bfcb.appspot.com",
    messagingSenderId: "1088793484477",
    appId: "1:1088793484477:web:14fb72308e5665f353abd4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let database = firebase.firestore();
// console.log(firebase)

let userName = document.getElementById("userName")
let email = document.getElementById("email")
let password = document.getElementById("password")
let signupBtn = document.getElementById("signupBtn")




let signupFunc = () => {

    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            console.log(user.user.uid)
            database.collection('users').doc(user.user.uid).set({
                userName: userName.value,
                email:email.value,
                uid: user.user.uid
            }).then(()=>{
                window.location = "index.html"
            })
            // userFrom.reset();
            // window.location = "index.html"
        })
        .catch((error) => {
            console.log(error.message)
        });
}

signupBtn.addEventListener('click', signupFunc)

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {

//       let uid = user.uid;
//       console.log(user.metadata.lastSignInTime)
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });












