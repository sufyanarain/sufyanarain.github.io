// getting elements from dom
let modalBBtn = document.getElementById("modalBBtn");
let createTeam = document.getElementById("createTeam");
let selectCategory = document.getElementById("selectCategory");
let teamName = document.getElementById("teamName");
let memberEmail = document.getElementById("memberEmail");
let teamsDiv = document.getElementById("teamsDiv");
let deleteTeam = document.getElementById("deleteTeam");
let addMoreBtn = document.getElementById("addMoreBtn");
let addMoreInp = document.getElementById("addMoreInp");
let logoutBtn = document.getElementById("logoutBtn");
let membersUl = document.getElementById("membersUl");
let membersModal = document.getElementsByClassName("membersModal");
let team;
let index;
let teamsObj;
let membersArr = "";
let arrForMember = []
// let membersUl = "";
let addMemberIndex;
let getUserFromLocal;
firebase.database().ref('userObjLoginLocal').on('value', (getUserFromLocalF) => {
    getUserFromLocal = getUserFromLocalF.val();
    // getting login data from local storage
    // let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
    // getUserFromLocal = JSON.parse(getUserFromLocal);
    // console.log(getUserFromLocal)
    if (getUserFromLocal) {
        console.log(getUserFromLocal)
    } else {
        window.location = 'index.html'
    }

})
// function showing useres and add them
const addMemberFunc = (e, eId, d,usersObj) => {
    let addedMembers = document.getElementById("addedMembers");
    addedMembers.innerHTML = ""
    arrForMember.push(usersObj[eId].name);
    for (let i = 0; i < arrForMember.length; i++) {
        
        addedMembers.innerHTML += `<li class="bg-success" id="${i}">${arrForMember[i]}</li>`
    }
    
    e.remove()
    console.log(arrForMember);
    
}
let usersObj;
firebase.database().ref('userObjLocal').on('value', (usersObjF) => {
    usersObj = usersObjF.val()
    // getting users object from localstorage
    // let usersObj = localStorage.getItem("userObjLocal");
    // usersObj = JSON.parse(usersObj);

    // loop for finding current user and index
    for (let i = 0; i < usersObj.length; i++) {
        if (usersObj[i].name === getUserFromLocal.name) {
            index = i;
            teamsObj = usersObj[i].createdTeam;
        }
    }



    function refresh() {
        setTimeout(function () {
            location.reload()
        }, 100);
    }
    // getting data from user input
    let takeUserInput = () => {

        let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;
        let team = {
            admin: getUserFromLocal.email,
            adminName: getUserFromLocal.name,
            teamName: teamName.value,
            category: selectedCategory,
            members: arrForMember,
            reports: [],
            teamKey: new Date().getTime()
        }
        if (team.teamName === "") {
            swal("Team not created", "Please input team name!", "error");

        } else {

            for (let i = 0; i < usersObj.length; i++) {
                if (usersObj[i].name === getUserFromLocal.name) {
                    arr2 = usersObj[i].createdTeam;
                }
            }

            if (arr2 === undefined) {
                var arr = []
            } else {
                var arr = arr2;
            }
            // refresh()
            arr.push(team)
            //  setting team object to user's main object and setting  to local storage
            for (let i = 0; i < usersObj.length; i++) {
                if (usersObj[i].name === getUserFromLocal.name) {
                    usersObj[i].createdTeam = arr;
                }
            }
            firebase.database().ref('userObjLocal').set(usersObj)
            // localStorage.setItem("userObjLocal", JSON.stringify(usersObj));
            displayFunc()
        }








    }
    
    
    let teamsDecet = (id, e) => {
        firebase.database().ref('userIndex').set(index)
        firebase.database().ref('teamIndex').set(id)
        // localStorage.setItem("userIndex", JSON.stringify(index));
        // localStorage.setItem("teamIndex", JSON.stringify(id));
        window.location = "reports.html"
        
        // console.log(id,e)
    }
    
    createTeam.addEventListener('click', takeUserInput)
    
    let displayFunc = () => {
        
        teamsDiv.innerHTML = ""
        // loop for displaying members for adding
        // membersUl = ""
        for (let i = 0; i < usersObj.length; i++) {
            // console.log(usersObj[i])
            membersUl.innerHTML += `
            <li class="membersModal" onclick="addMemberFunc(this,this.id,${i},${usersObj})" id="${i}">${usersObj[i].name}</li>`
            console.log(addMemberFunc)

            for (let s = 0; s < membersModal.length; s++) {
                if (membersModal[i].innerText == usersObj[index].name) {
                    membersModal[i].style.display = "none"
                }


            }


        }


        // console.log(teamsObj)
        if (teamsObj) {

            if (teamsObj.length == 0) {
                teamsDiv.innerHTML = `<p class="emptyTeams">you have not created any team,click on plus button and create a new team</p> <hr>`
            } else {
                for (let i = 0; i < teamsObj.length; i++) {
                    membersArr = ""
                    if (teamsObj[i].members) {

                        for (let w = 0; w < teamsObj[i].members.length; w++) {
                            membersArr += `<p>${teamsObj[i].members[w]}</p>`
                            if (w > 0) {
                                break;
                            }
                        }

                        if (teamsObj[i].members.length > 2) {

                            membersArr += `<p>AND ${teamsObj[i].members.length - 2} OTHERS</p>`
                        }
                    }


                    // setting data to dom by loop
                    teamsDiv.innerHTML += `
            <div id="${i}" onclick="teamsDecet(this.id,this)" class="card-body">
                <h5>Team Name : <span id="teamSpan">${teamsObj[i].teamName}</span></h5>
                <div class="membersDiv container">members : <span>${membersArr}</span></div>
                <button type="button" id="${i}" onclick="teamsDecet(this.id,this)" class="btn btn-dark">
                    See more details
                </button>
                
            </div>`
                }

            }
        }



        // resetting the input value
        teamName.value = "";
        // memberEmail.value = "";
        selectCategory.selectedIndex = 0;
        // refresh()
        // window.location = 'main.html'
    }
    displayFunc()

    let deleteTeamFunc = (e) => {
        // getting index from id and deleting from object
        teamsObj.splice(e, 1)
        // setting deleted item from object and setting it to main object
        usersObj[index].createdTeam = teamsObj;
        // setting main object to local storage
        firebase.database().ref('userObjLocal').set(usersObj)
        // localStorage.setItem("userObjLocal", JSON.stringify(usersObj));

        // updating display function to update elemnts after deleting
        displayFunc()
        // refresh()

    }

    let addMoreFunc = (e) => {
        addMemberIndex = e;

    }


    // teams you are part 
    let memberDecet = (id, e) => {
        firebase.database().ref('userIndex').set(index)
        firebase.database().ref('teamIndex').set(id)
        // localStorage.setItem("userIndex", JSON.stringify(index));
        // localStorage.setItem("teamIndex", JSON.stringify(id));
        window.location = "member.html"

        // console.log(id,e)
    }

    let teamsYouPartDiv = document.getElementById("teamsYouPartDiv");

    let teamsPrt = usersObj[index].partTeam;
    teamsYouPartDiv.innerHTML = `<p class="emptyTeams">You are not part of any team.</p>`;
    if (teamsPrt) {

        if (teamsPrt.length == 0) {

        } else {
            let currentUser = usersObj[index];
            let partTeamMember = "";
            let partTeamDisplay = () => {

                for (let i = 0; i < teamsPrt.length; i++) {
                    partTeamMember = ""
                    for (let w = 0; w < teamsPrt[i].members.length; w++) {
                        partTeamMember += `<p>${teamsPrt[i].members[w]}</p>`
                        // membersArr += `<p>${teamsObj[i].members[w]}</p>`
                        if (w > 0) {
                            break;
                        }
                    }
                    if (teamsPrt[i].members.length > 2) {

                        partTeamMember += `<p>& ${teamsPrt[i].members.length - 2} OTHERS</p>`
                    }
                    // setting data to dom by loop
                    teamsYouPartDiv.innerHTML += `
            <div id="${i}" onclick="memberDecet(this.id,this)" class="card-body">
                <h6>admin : ${teamsPrt[i].adminName}</h6/>
                <h5>Team Name : <span id="teamSpan">${teamsPrt[i].teamName}</span></h5>
                <div class="membersDiv container">members : <span>${partTeamMember}</span></div>
                <button type="button" id="${i}" onclick="memberDecet(this.id,this)" class="btn btn-dark">
                    See more details
                </button>

            </div>`
                }
            }
            partTeamDisplay()
        }
    }
    // console.log(currentUser)

    // let logoutBtn = document.getElementById("logoutBtn");
    let profileFunc = () => {
        let nameId = document.getElementById("nameId");
        let emailId = document.getElementById("emailId");
        let passwordId = document.getElementById("passwordId");
        let userNmaeP = document.getElementById("userNmaeP");
        let currentUser = usersObj[index];

        nameId.innerHTML = `<p contenteditable="true">Name : ${currentUser.name}</p><i class="bi bi-pencil-square"></i>`
        emailId.innerHTML = `<p>Email : ${currentUser.email}</p>`
        passwordId.innerHTML = `<p>password : ${currentUser.password}</p><i class="bi bi-pencil-square"></i>`
        userNmaeP.innerHTML = currentUser.name;
        console.log(currentUser)







    }
    logoutBtn.addEventListener('click', profileFunc)



})















// logout
let logout = () => {
    firebase.database().ref('userObjLoginLocal').remove();
    // localStorage.removeItem("userObjLoginLocal");
    window.location = 'index.html'
}
// logoutBtn.addEventListener('click',logout)