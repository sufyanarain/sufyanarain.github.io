
// let userName = document.getElementById("userName");
// let userEmail = document.getElementById("userEmail");
// let welcomeUser = document.getElementById("welcomeUser");
// let logOut = document.getElementById("logOut");
// let userLogedIn = document.getElementById("userLogedIn");




// // var loginUsrObj = loca
// var loginUsrObj = localStorage.getItem("loginObjD");

// // loginUsrObj = JSON.parse(loginUsrObj)
// // loginUsrObj.like()
// // console.log()

// // window.closed = localStorage.removeItem('loginObjD')

// // if(window.closed){

// // }


// if (!loginUsrObj) {
//     // swal({
//     //     title: "Not Allowed",
//     //     text: "You are not logged in, please login first",
//     //     icon: "warning",
//     //     button: "OK",
//     // })
//     //     .then((value) => {
//             window.location.href = "index.html"

//         // });
//     // document.body.innerHTML = `you are not logged in, please go to login page`

// } else {
//     // userName.innerHTML = `Name : ${loginUsrObj.userName}`
//     // userEmail.innerHTML = `Email : ${loginUsrObj.email}`
//     welcomeUser.innerHTML = `Welcome : ${loginUsrObj.userName}`;
//     userLogedIn.innerHTML = `You are now logged in`


//     // getting data from local storage
//     console.log(userData)
//     var userData = localStorage.getItem("userLocal1");
//     if (userData === null) {
//         var userData = []

//     } else {

//         userData = JSON.parse(userData)
//     }

//     let userTable = document.getElementById("userTable");

//     for (var i = 0; i < userData.length; i++) {
//         userTable.innerHTML += `
//          <tr>
//             <th scope="row">${i+1}</th>
//             <td>${userData[i].userName}</td>
//             <td>${userData[i].email}</td>
//             <td>sufyan liked this user</td>
//             <td><button id="likeBtn" onclick=likeFunc(this) class="btn btn-primary">Like</button></td>
//          </tr>
//     `
//     }

//     function likeFunc(e){
//         console.log(e.parentNode.parentNode)
//     }



//     logOut.addEventListener('click', function () {
//         localStorage.removeItem('loginObjD')
//         window.location.href = "index.html"
//         console.log(loginUsrObj)
//     })

// }










// getting elements from dom
let modalBBtn = document.getElementById("modalBBtn");
let createTeam = document.getElementById("createTeam");
let selectCategory = document.getElementById("selectCategory");
let teamName = document.getElementById("teamName");
let memberEmail = document.getElementById("memberEmail");
let teamsDiv = document.getElementById("teamsDiv");
let addMore = document.getElementById("addMore");
let team;
// console.log(arr)
let createdObj;


// getting data from local storage
let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
// console.log(getUserFromLocal)
if (getUserFromLocal) {
    console.log("logedin")
}




// getting data from user input
let takeUserInput = () => {
    let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;
    let team = {
        admin: getUserFromLocal.email,
        teamName: teamName.value,
        category: selectedCategory,
        members: memberEmail.value
    }
    // pushhing data to an array

    let userL1 = localStorage.getItem("userObjLocal");
    userL1 = JSON.parse(userL1);
    for (let i = 0; i < userL1.length; i++) {
        if (userL1[i].name === getUserFromLocal.name) {
            arr2 = userL1[i].createdTeam;
        }
    }

    if (arr2 === undefined) {
        var arr = []
    } else {
        var arr = arr2;
    }

    // }
    arr.push(team)
    console.log(arr)

    // getting main user's object from local storage and setting team object to user's main object and setting back to local storage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    for (let i = 0; i < userL.length; i++) {
        if (userL[i].name === getUserFromLocal.name) {
            userL[i].createdTeam = arr;
        }
    }
    // console.log(userL);
    localStorage.setItem("userObjLocal", JSON.stringify(userL));
    displayFunc()
    // return team;

}
createTeam.addEventListener('click', takeUserInput)



let displayFunc = () => {
    teamsDiv.innerHTML = ""
    // getting main user's data from local storage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    for (let i = 0; i < userL.length; i++) {
        if (userL[i].name === getUserFromLocal.name) {
            createdObj = userL[i].createdTeam;
        }
    }
    console.log(createdObj)

    for (let i = 0; i < createdObj.length; i++) {
        teamsDiv.innerHTML += `
            <div class="card-body">
                <h5>${createdObj[i].teamName}</h5>
                <h6>members : <span>${createdObj[i].members}</span></h6>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Add more members
                </button>
            </div>`

    }

}
displayFunc()
