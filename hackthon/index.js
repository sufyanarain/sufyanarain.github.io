
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

let email = document.getElementById("email")
let password = document.getElementById("password")
let loginBtn = document.getElementById("loginBtn")
let googleBtn = document.getElementById("googleBtn");



var provider = new firebase.auth.GoogleAuthProvider();
const googleSignIn = () => {
    firebase.auth()
        .signInWithPopup(provider)
        .then((user) => {
            database.collection('users').doc(user.user.uid).set({
                // userName: userName.value,
                user: user.user.email,
                uid: user.user.uid
            }).then(() => {
                database.collection("score").doc(user.user.uid).get().then((snap) => {

                    if (snap.data()) {
    
                        window.location = `level${snap.data().level}.html`
                    } else {
                        window.location = "level1.html";
                    }
                    let user1 = user.user;
    
                })
            })

            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error.message)
            // ...
        });

}
googleBtn.addEventListener('click', googleSignIn)


let loginFunc = () => {

    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((user) => {
            database.collection("score").doc(user.user.uid).get().then((snap) => {

                window.location = `level${snap.data().level}.html`
                let user1 = user.user;

            })

        })
        .catch((error) => {
            console.log(error.message)
        });
}

loginBtn.addEventListener('click', loginFunc)
















