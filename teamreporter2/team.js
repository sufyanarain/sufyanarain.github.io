
// getting elements from dom
let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");
let membersUl = document.getElementById("membersUl");
let membersLi = document.getElementsByClassName("membersLi");
let membersLiModal = document.getElementsByClassName("membersLiModal");
let arrForMember = [];
let showingMembers = [];

// getting data from localStorage
let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

let userIndex = localStorage.getItem("userIndex");
userIndex = JSON.parse(userIndex);

let teamIndex = localStorage.getItem("teamIndex");
teamIndex = JSON.parse(teamIndex);

let teamsArr = [];

for(let i = 0;i<usersObj.length;i++){
    teamsArr.push(usersObj[i].createdTeam)
}

console.log(teamsArr)









let curruntTeam = usersObj[userIndex].createdTeam[teamIndex];
// function for reloading page
function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}

// function for deleting members 
let deletMemberFunc = (e, eId) => {
    // deleting member from dom
    e.parentNode.remove();

    // deleting element from user object
    curruntTeam.members.splice(eId, 1)

    // setting data to local storage after deleting member
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
    refresh()
}

// displying team name and member 
let displayFunc = () => {

    // showing team name
    teamName.innerHTML = `Team Name : ${curruntTeam.teamName}`;

    //    showing team members on main page
    for (let i = 0; i < curruntTeam.members.length; i++) {
        teamMembers.innerHTML += `
        <li class="membersLi" id="${i}">${curruntTeam.members[i]}<i id="${i}" onclick="deletMemberFunc(this,this.id)" class="bi bi-x-circle-fill "></i></li>`
        showingMembers.push(curruntTeam.members[i])
    }

}
displayFunc()

// function for adding question to object
let addQuestFunc = () => {
    // getting questions from users input
    if (curruntTeam.questions === undefined) {
        var questArr = []
    } else {

        questArr = curruntTeam.questions;
    }
    questArr.push({q : questionInp.value,ans: ""})
    // setting question in  users object 
    curruntTeam.questions = questArr;
    // updating users object after adding question
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))

    // removing question from input afer adding
    questionInp.value = ""
    displayQuestFunc()
    // refresh()
}
addQuestionBtn.addEventListener('click', addQuestFunc);

// function for deleting questions
let deleteQuest = (id, e) => {
    // deleting question from dom
    e.parentNode.parentNode.remove()

    // deleting question from users object
    curruntTeam.questions.splice(id, 1);
    // setting localstorage updated object after deleting question
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))

}

// function for displaying questions
let displayQuestFunc = () => {
    questionUl.innerHTML = ""
    // loop for displaying question
    for (let i = 0; i < curruntTeam.questions.length; i++) {
        questionUl.innerHTML += `
                <li id="${i}" class="list-group-item"><div>${curruntTeam.questions[i].q}</div><div><i id="${i}" onclick="deleteQuest(this.id,this)" class="bi bi-trash"></i></div></li>`
    }

}

// reloading page after adding members
let addMembersFunc = () => {
    refresh()

}

// function showing useres and add them
let addMemberFunc = (e, eId) => {
    // removing members from dom after clicking on members
    e.remove()
    // pushing members after clicking on member
    arrForMember.push(usersObj[eId].name);

    // setting data in object after adding
    curruntTeam.members.push(usersObj[eId].name);
    // setting data to localstorage after updating members
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
}

// showing members in modal box
let addMembers = () => {
    for (let i = 0; i < usersObj.length; i++) {
        membersUl.innerHTML += `
        <li class="membersLiModal" onclick="addMemberFunc(this,this.id)"  id="${i}">${usersObj[i].name}</li>`

        for (let s = 0; s < membersLi.length; s++) {
            if (membersLiModal[i].innerText == membersLi[s].innerText) {
                membersLiModal[i].style.display = "none"
            }
        }
    }
}
addMembers()


// delete team function
let deleteTeamFunc = () => {
    // getting index from id and deleting from object
    usersObj[userIndex].createdTeam.splice(teamIndex, 1)
    // setting deleted item from object and setting it to main object
    localStorage.setItem("userObjLocal", JSON.stringify(usersObj));
    // changing window location
    window.location = "main.html"
}

displayQuestFunc()