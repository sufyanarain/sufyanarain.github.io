

let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");
let membersUl = document.getElementById("membersUl");
let membersLi = document.getElementsByClassName("membersLi");
let membersLi2 = document.getElementsByClassName("membersLi2");
let arrForMember = [];
let showingMembers = [];

function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}

let deletMemberFunc = (e, eId) => {
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    e.parentNode.remove();
    console.log(e.parentNode);
    // e.parentNode.remove()

    userL[userIndex].createdTeam[teamIndex].members.splice(eId, 1)
    // arrForMember.push(userL[eId].name);

    // userL[userIndex].createdTeam[teamIndex].members.push(userL[eId].name);
    console.log(userL);
    localStorage.setItem("userObjLocal", JSON.stringify(userL))
    refresh()

}

let displayFunc = () => {
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    console.log(teamIndex);


    teamName.innerHTML = `Team Name : ${userL[userIndex].createdTeam[teamIndex].teamName}`;

    for (let i = 0; i < userL[userIndex].createdTeam[teamIndex].members.length; i++) {
        teamMembers.innerHTML += `
        <li class="membersLi" id="${i}">${userL[userIndex].createdTeam[teamIndex].members[i]}<i id="${i}" onclick="deletMemberFunc(this,this.id)" class="bi bi-x-circle-fill "></i></li>`
        showingMembers.push(userL[userIndex].createdTeam[teamIndex].members[i])
    }

}
displayFunc()

console.log(showingMembers)
let addQuestFunc = () => {
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    console.log(teamIndex);

    if (userL[userIndex].createdTeam[teamIndex].questions === undefined) {
        var questArr = []
    } else {

        questArr = userL[userIndex].createdTeam[teamIndex].questions;
    }
    questArr.push(questionInp.value)
    userL[userIndex].createdTeam[teamIndex].questions = questArr;
    localStorage.setItem("userObjLocal", JSON.stringify(userL))
    console.log(localStorage.getItem("usersClickedTeam"))

    questionInp.value = ""
    displayQuestFunc()
    // refresh()
}
addQuestionBtn.addEventListener('click', addQuestFunc);


let deleteQuest = (id, e) => {
    e.parentNode.parentNode.remove()

    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    console.log(teamIndex);

    userL[userIndex].createdTeam[teamIndex].questions.splice(id, 1);
    localStorage.setItem("userObjLocal", JSON.stringify(userL))

}

let displayQuestFunc = () => {
    questionUl.innerHTML = ""

    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    console.log(teamIndex);

    // if(userL[userIndex].createdTeam[teamIndex].questions === undefined){
    //     userL[userIndex].createdTeam[teamIndex].questions = []
    // }else{

    // console.log(userL[userIndex].createdTeam[teamIndex])

    for (let i = 0; i < userL[userIndex].createdTeam[teamIndex].questions.length; i++) {
        questionUl.innerHTML += `
                <li id="${i}" class="list-group-item"><div>${userL[userIndex].createdTeam[teamIndex].questions[i]}</div><div><i id="${i}" onclick="deleteQuest(this.id,this)" class="bi bi-trash"></i></div></li>`
    }


    console.log(userL[userIndex].createdTeam[teamIndex].questions)

}

let addMembersFunc = () => {
    refresh()

}

// function showing useres and add them
let addMemberFunc = (e, eId) => {
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    console.log(teamIndex);
    e.remove()
    arrForMember.push(userL[eId].name);

    userL[userIndex].createdTeam[teamIndex].members.push(userL[eId].name);
    console.log(userL);
    localStorage.setItem("userObjLocal", JSON.stringify(userL))
}
let addMembers = () => {
    // getting main user's data from local storage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);

    
    for (let i = 0; i < userL.length; i++) {

        membersUl.innerHTML += `
        <li class="membersLi2" onclick="addMemberFunc(this,this.id)"  id="${i}">${userL[i].name}</li>`
        for (let s = 0; s < membersLi.length; s++) {
            if (membersLi2[i].innerText == membersLi[s].innerText) {
                membersLi2[i].style.display = "none"
            }
        }
    }

    // console.log(membersLi[0].innerHTML)

}
addMembers()


// delete team function
let deleteTeamFunc = () => {
    // getting data from localstorage
    let userL = localStorage.getItem("userObjLocal");
    userL = JSON.parse(userL);
    
    let userIndex = localStorage.getItem("userIndex");
    userIndex = JSON.parse(userIndex);

    let teamIndex = localStorage.getItem("teamIndex");
    teamIndex = JSON.parse(teamIndex);
    // getting index from id and deleting from object
    userL[userIndex].createdTeam.splice(teamIndex, 1)
    // setting deleted item from object and setting it to main object
    localStorage.setItem("userObjLocal", JSON.stringify(userL));
    window.location = "main.html"

}

// swal({
//     title: "Are you sure?",
//     text: "Once deleted, you will not be able to recover this imaginary file!",
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   })
//   .then((willDelete) => {
//     if (willDelete) {
//       swal(console.log(""), {
//         icon: "success",
//       });
//     } else {
//       swal("Your imaginary file is safe!");
//     }
//   });
  










displayQuestFunc()