
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



let itemName = document.getElementById("itemName");
let itemPrice = document.getElementById("itemPrice");
let itemCategory = document.getElementById("itemCategory");
let itemImage = document.getElementById("itemImage");
let deliveryType = document.getElementById("deliveryType");
let createProduct = document.getElementById("createProduct");
// let itemName = document.getElementById("itemName");
// let itemName = document.getElementById("itemName");

auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
      
      database.collection("users").doc(user.uid).get().then((snap)=>{
          console.log(snap.data())
      })

      



    } else {
      // User is signed out
      // ...
    }
  });