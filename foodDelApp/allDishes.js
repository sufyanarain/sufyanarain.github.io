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
let showDishes = document.getElementById("showDishes");

let selectedRestaurants = localStorage.getItem("selectedRestaurants")
selectedRestaurants = JSON.parse(selectedRestaurants);
console.log(selectedRestaurants)
selectedRestaurants.forEach(element => {
    database.collection("items").where("restaurant" , "==" , element).onSnapshot((dishes)=>{
        dishes.forEach(element => {
    console.log("run")
            showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
            <img src="${element.data().itemImage}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${element.data().itemName}</h5>
            <p class="card-text">${element.data().itemPrice}</p>
            <p class="card-text">${element.data().deliveryTypeCategory}</p>
            <a href="#" class="btn btn-primary">Order</a>
            </div>
            </div>
            `
            console.log(element.data())
        });
    })
});