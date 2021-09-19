
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


let balloonDiv = document.getElementById("balloonDiv");
let balloon = document.getElementsByClassName("balloon")
let livesDiv = document.getElementById("livesDiv");
let startAgain = document.getElementById("startAgain");
let scored = document.getElementById("scored");
let lives = 3;
let score = 0;
level = 10;

let rand2 = (Math.random() * 4)
rand2 = Math.floor(rand2)
console.log(rand2)

let colors = ['red', 'green', 'blue', 'yellow'];
let instruction = document.getElementById("instruction")
instruction.innerHTML = `popup ${colors[rand2]} color`





let rand = (Math.random() * 4)
rand = Math.floor(rand)
console.log(rand)
let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        database.collection("score").doc(uid).get().then((snap) => {
            score = snap.data().score;
            score = JSON.parse(score)
            scored.innerHTML = score;
            console.log(score)


            for (let i = 0; i < balloon.length; i++) {
                let rand = (Math.random() * 4)
                rand = Math.floor(rand)
                console.log(rand)
                balloon[i].className += ` ${colors[rand]}`
                // moveElmRand(balloon[i])
                balloon[i].addEventListener('mouseover', (e) => {
                    if (e.target.className.includes(colors[rand2])) {
                        score = score + 10;

                        scored.innerHTML = `Score : ${score}`
                        if (score == 500) {
                            pushDataFireStore(score, uid)
                            balloonDiv.innerHTML = `<h1>you Won!</h1><br><a onclick="pushDataFireStore('${score}','${user.uid}')" href="level10.html" class="btn btn-primary" id="startAgain">Level 10</a>`

                        }

                        e.target.innerHTML = "popup";
                        e.target.className = "balloon popup";
                        setTimeout(() => {
                            let rand1 = (Math.random() * 4)
                            rand1 = Math.floor(rand1)
                            console.log(rand1)
                            e.target.className = `balloon ${colors[rand1]}`;
                            e.target.innerHTML = ""


                        }, 400);

                        console.log(score)
                    }else if (e.target.className.includes("popup")){

                    }
                     else {
                        lives--
                        livesDiv.innerHTML = `Lives : ${lives}`;
                        if (lives == 0) {
                            console.log("game over")
                            balloonDiv.innerHTML = `<h1>game over<h1><br><a href="level10.html" class="btn btn-primary" id="startAgain">Start Again</a>`

                        }
                        e.target.innerHTML = "oops";
                        e.target.className = "balloon popup"
                        setTimeout(() => {
                            let rand1 = (Math.random() * 4)
                            rand1 = Math.floor(rand1)
                            console.log(rand1)
                            e.target.className = `balloon ${colors[rand1]}`;
                            e.target.innerHTML = ""


                        }, 400);
                    }

                    console.log(e.target.className)
                })

            }

        })
        // ...
    } else {
        // User is signed out
        // ...
    }
});




let pushDataFireStore = (score, uid) => {
    console.log(score, uid, level, new Date())
    console.log()
    database.collection("score").doc(uid).set({
        score: score,
        uid: uid,
        level: level,
        lastLogin: new Date()

    }).then(() => {
        console.log("done")
    })


}


