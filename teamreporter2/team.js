

let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");


let displayFunc = () => {
    let usersClickedTeam = localStorage.getItem("usersClickedTeam");
    usersClickedTeam = JSON.parse(usersClickedTeam);
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser)


    teamName.innerHTML = `Team Name : ${usersClickedTeam.teamName}`;

    for (let i = 0; i < usersClickedTeam.members.length; i++) {
        teamMembers.innerHTML += `
        <li id="${i}">${usersClickedTeam.members[i]}</li>`
        console.log(usersClickedTeam.members[i])
    }

}
displayFunc()


let addQuestFunc = () => {
    let usersClickedTeam = localStorage.getItem("usersClickedTeam");
    usersClickedTeam = JSON.parse(usersClickedTeam);

    if (usersClickedTeam.questions === undefined) {
        var questArr = []
    } else {

        questArr = usersClickedTeam.questions;
    }
    questArr.push(questionInp.value)

    usersClickedTeam.questions = questArr;
    localStorage.setItem("usersClickedTeam", JSON.stringify(usersClickedTeam))


    displayQuestFunc()

}
addQuestionBtn.addEventListener('click', addQuestFunc);


let displayQuestFunc = () => {
    let usersClickedTeam = localStorage.getItem("usersClickedTeam");
    usersClickedTeam = JSON.parse(usersClickedTeam);

    console.log(usersClickedTeam.questions[2])
    for (let i = 0; i < usersClickedTeam.questions.length; i++) {
        questionUl.innerHTML += `
        <li id="${i}" class="list-group-item">${usersClickedTeam.questions[i]}</li>`
    }
}
displayQuestFunc()