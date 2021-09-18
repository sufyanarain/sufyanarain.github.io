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

let selectedRestaurants = localStorage.getItem("selectedRestaurants");
let restaurantName;
selectedRestaurants = JSON.parse(selectedRestaurants);
selectedRestaurants.forEach(element => {
    database.collection("items").where("restaurant", "==", element).onSnapshot((dishes) => {
        dishes.forEach(element => {
            // 
            let restaurantKey = element.data().restaurant;
            showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
                <img src="${element.data().itemImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.data().itemName}</h5>
                <p class="card-text">Price :${element.data().itemPrice}</p>
                <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
                <div id="orderCounter" class="orderCounter">
                <button onclick="orderFunc(this,${element.data().itemKey},this.id)" id="${restaurantKey}" class="btn btn-primary">Order</button>
                <button onclick="plusFunc(this)" class="btn btn-outline-primary">+</button>
                <p class="btn btn-outline-primary" id="counter">1</p>
                <button onclick="minusFunc(this)" class="btn btn-outline-primary ">-</button>
            </div>
            </div>
            </div>
            `
        });
    })
});

let plusFunc = (e) => {
    let counter = e.nextElementSibling.innerHTML;
    ++counter
    e.nextElementSibling.innerHTML = counter
}


let minusFunc = (e) => {
    let counter = e.previousElementSibling.innerHTML;
    if (counter > 1) {
        --counter
    }
    e.previousElementSibling.innerHTML = counter
}

let customerUid;
auth.onAuthStateChanged((user)=>{
    customerUid = user.uid
    // console.log(user.uid)
})


let orderFunc = (e, itemKey, restaurantKey,k) => {
    // console.log(e.parentNode.childNodes[5].innerHTML);
    let numOfOrder = e.parentNode.childNodes[5].innerHTML
    console.log(numOfOrder, itemKey, restaurantKey)

    database.collection("orders").add({
        restaurantKey : restaurantKey,
        itemKey: itemKey,
        numOfOrder : numOfOrder,
        customerUid:customerUid
    }).then(()=>{
        console.log("order Added")
    })
}


