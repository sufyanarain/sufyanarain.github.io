
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
let userType;

auth.onAuthStateChanged((user) => {
  if (user) {
    if (user.displayName == "true") {
      userType = "restaurents"
    } else {
      userType = "users"
    }
    console.log(userType)
    database.collection(userType).doc(user.uid).get().then((snap) => {
      console.log(snap.data())

    })
  } else {
    console.log("not logged in")
  }
});


let createItem = () => {
  let itemName = document.getElementById("itemName");
  let itemPrice = document.getElementById("itemPrice");
  let itemCategory = document.getElementById("itemCategory");
  let itemImage = document.getElementById("itemImage");
  let deliveryType = document.getElementById("deliveryType");
  let itemsDiv = document.getElementById("itemsDiv");

  let selecteditemCategory = itemCategory.options[itemCategory.selectedIndex].value;
  let deliveryTypeCategory = deliveryType.options[deliveryType.selectedIndex].value;

  console.log(itemName.value, itemPrice.value, selecteditemCategory, itemImage, deliveryTypeCategory)
  let itemKey = new Date().getTime();
  itemKey = itemKey.toString()
  console.log(itemKey)
  database.collection("items").doc(itemKey).set({
    itemName: itemName.value,
    itemPrice: itemPrice.value,
    selecteditemCategory,
    itemImage: itemImage.value,
    deliveryTypeCategory,
    itemKey,


  })

  itemsDiv.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${itemImage.value}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${itemName.value}</h5>
    <p class="card-text">${itemPrice.value}</p>
    <p class="card-text">${deliveryTypeCategory}</p>
    <a href="#" class="btn btn-primary">Order</a>
  </div>
</div>
`


}
createProduct.addEventListener('click', createItem)