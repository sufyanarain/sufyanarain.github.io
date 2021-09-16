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

let restoBtn = document.getElementById("restoBtn");
let custBtn = document.getElementById("custBtn");
let restaurantDiv = document.getElementById("restaurantDiv");
let customertDiv = document.getElementById("customertDiv");
let restSignup = document.getElementById("restSignup");
let userSignup = document.getElementById("userSignup");


let restaurantFunc = () => {
    restaurantDiv.style.display = "block";
    customertDiv.style.display = "none";
    restoBtn.style.display = "none";
    custBtn.style.display = "none";
}
restoBtn.addEventListener('click', restaurantFunc)

let customerFunc = () => {
    customertDiv.style.display = "block";
    restaurantDiv.style.display = "none";
    restoBtn.style.display = "none";
    custBtn.style.display = "none";

}
custBtn.addEventListener('click', customerFunc)


let restaurantSignup = () => {
    let RestaurantName = document.getElementById("RestaurantName");
    let restaurantEmail = document.getElementById("restaurantEmail");
    let restaurantCountry = document.getElementById("restaurantCountry");
    let restaurantCity = document.getElementById("restaurantCity");
    let restaurantPassword = document.getElementById("restaurantPassword");
    let restForm = document.getElementById("restForm");

    auth.createUserWithEmailAndPassword(restaurantEmail.value, restaurantPassword.value)
        .then((user) => {
            console.log(user.user.uid)
            database.collection('restaurents').doc(user.user.uid).set({
                RestaurantName: RestaurantName.value,
                restaurantEmail: restaurantEmail.value,
                restaurantCountry: restaurantCountry.value,
                restaurantCity: restaurantCity.value,
                restaurant: true,
                uid: user.user.uid
            })
            restForm.reset();
            // window.location = "index.html"
        })
        .catch((error) => {
            console.log(error.message)
        });
        // this.preventDefault()
}
restSignup.addEventListener('click', restaurantSignup);

let userSignupFunc = () => {
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    let userCountry = document.getElementById("userCountry");
    let userCity = document.getElementById("userCity");
    let userPhone = document.getElementById("userPhone");
    let userPassword = document.getElementById("userPassword");
    let userFrom = document.getElementById("userFrom");

    auth.createUserWithEmailAndPassword(userEmail.value, userPassword.value)
        .then((user) => {
            console.log(user.user.uid)
            database.collection('users').doc(user.user.uid).set({
                userName: userName.value,
                userEmail: userEmail.value,
                userCountry: userCountry.value,
                userCity: userCity.value,
                userPhone: userPhone.value,
                user: true,
                uid: user.user.uid
            })
            userFrom.reset();
            // window.location = "index.html"
        })
        .catch((error) => {
            console.log(error.message)
        });
        // this.preventDefault();
}
userSignup.addEventListener('click', userSignupFunc);
