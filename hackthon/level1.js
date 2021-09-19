
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
let balloonDiv = document.getElementById("balloonDiv");
let balloon = document.getElementsByClassName("balloon")
let livesDiv = document.getElementById("livesDiv");
let startAgain = document.getElementById("startAgain");
let scored = document.getElementById("scored");
let heightsScore = document.getElementById("heightsScore");
// let hScore = 0;
let lives = 1;
let score = 0;
level = 1;

let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});


livesDiv.innerHTML = lives;

for (let i = 0; i < balloon.length; i++) {
    balloon[i].addEventListener('mouseover', (e) => {
        if (e.target.className.includes("red")) {
            score = score + 10;
            scored.innerHTML = `Score : ${score}`
            if (score == 50) {
                pushDataFireStore(score)
                balloonDiv.innerHTML = `<h1>you Won!</h1><br><a onclick="pushDataFireStore(score)" href="level2.html" class="btn btn-primary" id="startAgain">Level 2</a>`
            }
            console.log(score)
        }else if (e.target.className.includes("popup")){

        }
         else {
            livesDiv.innerHTML = `Lives : ${lives}`;
            --lives
            if (lives == 0) {
                console.log("game over")
                balloonDiv.innerHTML = `<h1>game over<h1><br><a href="level1.html" class="btn btn-primary" id="startAgain">Start Again</a>`

            }
        }
        e.target.innerHTML = "popup";
        e.target.className = "balloon popup"
        console.log(e.target.className)
    })

}

let pushDataFireStore = (score)=>{
    console.log()
    if(heightsScore)
    database.collection("score").doc(uid).set({
        score:score,
        uid,uid,
        level,level

    })

}
