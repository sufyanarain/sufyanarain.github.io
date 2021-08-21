

let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");

function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
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
        <li id="${i}">${userL[userIndex].createdTeam[teamIndex].members[i]}</li>`
        console.log(userL[userIndex].createdTeam[teamIndex].teamName)
    }

}
displayFunc()


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

        console.log(userL[userIndex].createdTeam[teamIndex])
        if(userL[userIndex].createdTeam[teamIndex].questions){
            
            for (let i = 0; i < userL[userIndex].createdTeam[teamIndex].questions.length; i++) {
                questionUl.innerHTML += `
                <li id="${i}" class="list-group-item"><div>${userL[userIndex].createdTeam[teamIndex].questions[i]}</div><div><i id="${i}" onclick="deleteQuest(this.id,this)" class="bi bi-trash"></i></div></li>`
            }
        }
    // }

    console.log(userL[userIndex].createdTeam[teamIndex].questions)

}
displayQuestFunc()