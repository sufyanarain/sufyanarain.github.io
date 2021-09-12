
// getting elements from dom
let teamName = document.getElementById("teamName");
let questionInp = document.getElementById("questionInp");
let addQuestionBtn = document.getElementById("addQuestionBtn");
let questionUl = document.getElementById("questionUl");
let teamMembers = document.getElementById("teamMembers");
let membersUl = document.getElementById("membersUl");
let membersLi = document.getElementsByClassName("membersLi");
let membersLiModal = document.getElementsByClassName("membersLiModal");
let submitBtn = document.getElementById("submitBtn");
let arrForMember = [];
let showingMembers = [];
let delTeamFlag = false;

// getting data from localStorage
let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

let userIndex = localStorage.getItem("userIndex");
userIndex = JSON.parse(userIndex);

let teamIndex = localStorage.getItem("teamIndex");
teamIndex = JSON.parse(teamIndex);

let teamsArr = [];
let newArr = []

let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

let newdate = `${day}th ${monthArr[month]} ${year}`;
let curruntUsername = `${usersObj[userIndex].name} : ${newdate}`;


let curruntTeam = usersObj[userIndex].partTeam[teamIndex];


// getting login data from local storage
let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
if (getUserFromLocal) {
    // console.log(getUserFromLocal)
} else {
    window.location = 'index.html'
}


// function for reloading page
function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}


// displying team name and member 
let displayFunc = () => {

    // showing team name
    teamName.innerHTML = `Team Name : ${curruntTeam.teamName}`;

}
displayFunc()


let answer = (element, Eid) => {
    curruntTeam.questions[Eid].ans = element.value;

    localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
}

let submit = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You can submit only once.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Submitted!',
                'Your file has been submitted.',
                'success'
            )
            for (let i = 0; i < usersObj.length; i++) {
                for (let j = 0; j < usersObj[i].createdTeam.length; j++) {
                    if (usersObj[i].createdTeam[j].admin == curruntTeam.admin) {
                        // console.log(curruntTeam.admin, usersObj[i].createdTeam[j].admin);
                        usersObj[i].createdTeam[j].reports.push({ [curruntUsername]: curruntTeam.questions })
                    }
                }
            }
            // curruntTeam.questions.push()
            curruntTeam.subBtnStatus = true;
            localStorage.setItem("userObjLocal", JSON.stringify(usersObj))
            // console.log(curruntTeam.admin)
            submitBtn.disabled = true;
        }
    })
    // curruntTeam.questions[Eid].ans = element.value;

}
submitBtn.disabled = curruntTeam.subBtnStatus;
// function for displaying questions
let displayQuestFunc = () => {
    questionUl.innerHTML = ""
    // loop for displaying question
    for (let i = 0; i < curruntTeam.questions.length; i++) {
        questionUl.innerHTML += `
                <li id="${i}" class="list-group-item"><div>Q : ${curruntTeam.questions[i].q}</div>
                    <div><input type="email" onblur="answer(this,this.id)" value="${curruntTeam.questions[i].ans}" class="form-control answer" id="${i}" placeholder="ANSWER"></div>
                </li>`
    }

}

displayQuestFunc()

let displayFunc1 = () => {

    // showing team name

    //    showing team members on main page
    for (let i = 0; i < curruntTeam.members.length; i++) {
        teamMembers.innerHTML += `
        <li class="membersLi" id="${i}">${curruntTeam.members[i]}</li>`
        showingMembers.push(curruntTeam.members[i])
    }

}


displayFunc1()
