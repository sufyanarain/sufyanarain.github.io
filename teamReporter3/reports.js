let qA = document.getElementById("qA");
let userName = document.getElementById("userName");
let reportsSec = document.getElementById("reportsSec");
let resultArr = []
let html = [];

// getting data from localStorage
let usersObj = localStorage.getItem("userObjLocal");
usersObj = JSON.parse(usersObj);

let userIndex = localStorage.getItem("userIndex");
userIndex = JSON.parse(userIndex);

let teamIndex = localStorage.getItem("teamIndex");
teamIndex = JSON.parse(teamIndex);

curruntTeam = usersObj[userIndex].createdTeam[teamIndex]

// getting login data from local storage
let getUserFromLocal = localStorage.getItem("userObjLoginLocal");
getUserFromLocal = JSON.parse(getUserFromLocal);
if (getUserFromLocal) {
    // console.log(getUserFromLocal)
} else {
    window.location = 'index.html'
}


if (curruntTeam.reports.length == 0) {
    reportsSec.innerHTML = `<hr><p>no one has submitted answers.`
} else {
    // console.log(Object.keys(curruntTeam.reports[0]))

    let userHtml = [];
    let p = 0;
    let displayQuest = () => {
        for (let i = 0; i < curruntTeam.reports.length; i++) {
            // console.log(curruntTeam.reports[0])
            html.push(`<hr>${Object.keys(curruntTeam.reports[i])[0]}`)

            for (let j in curruntTeam.reports[i]) {
                // userHtml = Object.keys(curruntTeam.reports[p])[0]
                userHtml.push(Object.keys(curruntTeam.reports[p])[0])
                // console.log(userHtml)
                p++
                for (let k = 0; k < curruntTeam.reports[i][j].length; k++) {
                    // console.log(curruntTeam.reports[i][j][k])
                    html.push(`Q .${curruntTeam.reports[i][j][k].q}`)
                    html.push(`A .${curruntTeam.reports[i][j][k].ans}`)

                }

            }
        }

        // finding not submittied members.
        resultArr = curruntTeam.members.filter(function (val) {
            return userHtml.indexOf(val) == -1;
        });


    }
    displayQuest()

}

let disSelect = () => {
    let allMembers = document.getElementById("allMembers");

    allMembers = allMembers.options[allMembers.selectedIndex].value;
    if (allMembers == "allMembers") {
        qA.innerHTML = "";
        notSubmitted.innerHTML = "";
        for (let d = 0; d < html.length; d++) {
            // console.log(html[d])
            qA.innerHTML += `
            
            <div id="qA">
            <p>${html[d]}</p>
            
            
            
            </div>`
        }

        for (let e = 0; e < resultArr.length; e++) {
            // console.log(resultArr[e])
            notSubmitted.innerHTML += `
            
            <div id="qA">
            <hr>
            <p>Name : ${resultArr[e]}</p>
            <h6>NOT SUBMITTED</h6>
            
            
            </div>`
        }

    } else if (allMembers == "submitted") {
        qA.innerHTML = "";
        notSubmitted.innerHTML = "";

        for (let d = 0; d < html.length; d++) {
            // console.log(html[d])
            qA.innerHTML += `
            
            <div id="qA">
            <p>${html[d]}</p>
            
            
            
            </div>`
        }
    } else if (allMembers == "notSubmitted") {
        qA.innerHTML = "";
        notSubmitted.innerHTML = "";
        for (let e = 0; e < resultArr.length; e++) {
            // console.log(resultArr[e])
            notSubmitted.innerHTML += `
            
            <div id="qA">
            <hr>
            <p>Name : ${resultArr[e]}</p>
            <h6>NOT SUBMITTED</h6>
            
            
            </div>`
        }
    }

}

disSelect()















