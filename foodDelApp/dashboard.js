
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

let pending = document.getElementById("pending");

let uid;
auth.onAuthStateChanged((user) => {
    uid = user.uid;
    // console.log(user.uid)


    database.collection("orders").where("restaurantKey", "==", uid).get().then((snap) => {
        snap.forEach(element => {
            database.collection("users").doc(element.data().customerUid).get().then((elem) => {
                // console.log(element.data())
                database.collection("items").doc(element.data().itemKey.toString()).get().then((item) => {

                    pending.innerHTML += `<div class="card mt-2">
                    <div class="card-body">
                    <h6 class="card-title">User : ${elem.data().userName}</h6>
                    <hr>
                    <h6 class="card-subtitle">Item Name : ${item.data().itemName}</h6>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">Price : ${item.data().itemPrice} Rs</li>
                    <li class="list-group-item">Quantity : ${element.data().numOfOrder}</li>
                    <li class="list-group-item"><i class="bi bi-truck"></i>  ${item.data().deliveryTypeCategory}</li>
                    <li class="list-group-item">Total Price : `+ item.data().itemPrice * element.data().numOfOrder +
                        `</li>
                    </ul>
                    <div class="accepRejBtn card-body">
                    <button onclick='acceptFunc("${elem.data().userName}","${item.data().itemName}"," ${item.data().itemPrice}","${element.data().numOfOrder}","${item.data().deliveryTypeCategory}",this,"${element.id}")' class="btn btn-outline-primary">Accepted</button>
                    <button onclick='rejectFunc(this,"${element.id}")' class="btn btn-outline-danger">Reject</button>
                    </div>
                    </div>
                    `
                    // console.log(element.id)
                })
            })

        });
    })
})

let acceptFunc = (userName, itemName, itemPrice, numOfOrder, deliveryTypeCategory, e, elementId) => {
    database.collection("acceptedOrders").add({
        userName, itemName, itemPrice, numOfOrder, deliveryTypeCategory
    })
    database.collection("orders").doc(elementId).delete().then(() => {
        console.log("deleted")
    }).catch((error) => {
        console.log(error.message)
    })
    e.parentNode.parentNode.remove()
    // console.log(elementId)
}

let rejectFunc = (e, elementId) => {
    database.collection("orders").doc(elementId).delete().then(() => {
        console.log("deleted")
    }).catch((error) => {
        console.log(error.message)
    })
    e.parentNode.parentNode.remove()
}

// *********** accepted orders *************
// let accepted = document.getElementById("accepted");

// auth.onAuthStateChanged((user) => {
//     database.collection("acceptedOrders").where()

// })

