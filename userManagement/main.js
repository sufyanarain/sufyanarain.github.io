
var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var welcomeUser = document.getElementById("welcomeUser");
var logOut = document.getElementById("logOut");




// var loginUsrObj = loca
var loginUsrObj = localStorage.getItem("loginObjD");
loginUsrObj = JSON.parse(loginUsrObj)
// if (loginUsrObj === null) {
//     var loginUsrObj = []

// } else {

//     loginUsrObj = JSON.parse(loginUsrObj)
// }

if (!loginUsrObj) {
    document.body.innerHTML = `you are not logged in, please go to login page`
    
} else {
    userName.innerHTML = `Name : ${loginUsrObj.userName}`
    userEmail.innerHTML = `Email : ${loginUsrObj.email}`
    welcomeUser.innerHTML = `Welcome : ${loginUsrObj.userName}`

    logOut.addEventListener('click', function () {
        localStorage.removeItem('loginObjD')
        window.location.href = "index.html"
    })
    console.log(loginUsrObj)




}

window.closed = localStorage.removeItem('loginObjD')



