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


database.collection("restaurants").onSnapshot((snap) => {
    let showRestaurants = document.getElementById("showRestaurants");
    snap.forEach(element => {
        showRestaurants.innerHTML += `
        <div onclick="selectRestaurant(this.id,this)" id=${element.data().uid} class="card" style="width: 18rem;">
            <img src="${element.data().restaurantImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.data().RestaurantName}</h5>
            </div>
        </div>`
        console.log(element.data())

    });
})

let restaurantsArr = [];
let selectRestaurant = (uid,e) => {
    e.className  += " bordered";
    restaurantsArr.push(uid);
    console.log(restaurantsArr);

}

let dishedBtn = document.getElementById("dishedBtn");
dishedBtn.addEventListener("click", () => {
    localStorage.setItem("selectedRestaurants",JSON.stringify(restaurantsArr))
    window.location = "allDishes.html";
})

