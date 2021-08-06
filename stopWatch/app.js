

let start = document.getElementById("start");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
let lap = document.getElementById("lap");
let minH = document.getElementById("minH");
let secH = document.getElementById("secH");
let msecH = document.getElementById("msecH");
let lapTabel = document.getElementById("lapTabel");
let lapMin = document.getElementById("lapMin");
let lapSec = document.getElementById("lapSec");
let lapMsec = document.getElementById("lapMsec");
// let start = document.getElementById("start");
let set;
let arr = [];

let min = 0;
let sec = 0;
let mSec = 0;
let lapObj = {};

function calTime() {

    
    mSec++
    msecH.innerHTML = mSec;
    if (mSec >= 100) {
        sec++
        mSec = 0;
        secH.innerHTML = sec;
    }
    if (sec >= 60) {
        min++
        sec = 0;
        minH.innerHTML = min;
    }

    lapObj = {
        min: min,
        sec: sec,
        mSec: mSec
    }
}


start.addEventListener('click', function () {
    setClr = setInterval(calTime, 10)
    
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    document.getElementById("reset").disabled = false;
    document.getElementById("lap").disabled = false;

})

pause.addEventListener('click', function () {
    clearInterval(setClr);
    document.getElementById("start").disabled = false;
    document.getElementById("pause").disabled = true;
    document.getElementById("lap").disabled = true;
})


reset.addEventListener('click', function () {
    clearInterval(setClr);
    min = 0;
    sec = 0;
    mSec = 0;

    msecH.innerHTML = 0;
    secH.innerHTML = 0;
    minH.innerHTML = 0;
    arr = []
    lapTabel.innerHTML = "";
    document.getElementById("start").disabled = false;
    document.getElementById("reset").disabled = true;
    document.getElementById("lap").disabled = true;


})

let html = ""
lap.addEventListener('click', function () {
    arr.push(lapObj);

    html = ""
    for (let i = 0; i < arr.length; i++) {
        html += `
                 <tr>
                     <th scope="row">${i + 1}</th>
                     <td id="lapMin">${arr[i].min} Min</td>
                     <td id="lapSec">${arr[i].sec} Sec</td>
                     <td id="lapMsec">${arr[i].mSec} Msec</td>
                 </tr>`;

    }

    console.log(arr)
    lapTabel.innerHTML = html

})
