
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
let database = firebase.firestore();

let dashboardDisplay = document.getElementById("dashboardDisplay");

auth.onAuthStateChanged((user) => {
    console.log(user.uid)
    // database.collection("orders").get().then((snap)=>{
    //     snap.forEach(element => {
    //         console.log(element.data())
    //     });
    //     console.log(snap)
    // })
    database.collection("orders").where("restaurantKey", "==", user.uid).get().then((snap) => {
        snap.forEach(element => {
            database.collection("users").doc(element.data().customerUid).get().then((elem) => {
                console.log(element.data())
                database.collection("items").doc(element.data().itemKey.toString()).get().then((item) => {

                    dashboardDisplay.innerHTML += `<div class="card mt-2">
                    <div class="card-body">
                    <h6 class="card-title">User : ${elem.data().userName}</h6>
                    <hr>
                    <h6 class="card-subtitle">Item Name : ${item.data().itemName}</h6>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Price : ${item.data().itemPrice} Rs</li>
                    <li class="list-group-item">Quantity : ${element.data().numOfOrder}</li>
                    <li class="list-group-item"><i class="bi bi-truck"></i>  ${item.data().deliveryTypeCategory}</li>
                    <li class="list-group-item">Total Price : `+item.data().itemPrice * element.data().numOfOrder+
                    `</li>
                    </ul>
                    <div class="accepRejBtn card-body">
                    <button class="btn btn-outline-primary">Accept</button>
                    <button class="btn btn-outline-danger">Reject</button>
                    </div>
                    </div>
                    `
                    console.log(element.data())
                })
            })

        });
    })
})
