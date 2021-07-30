
var InputUser = document.getElementById("InputUser");
var InputEmail = document.getElementById("InputEmail");
var InputPassword1 = document.getElementById("InputPassword1");
var InputPassword2 = document.getElementById("InputPassword2");
var signUp = document.getElementById("signUp");

var arr = [];

function TakeUserData(userName, email, password1) {
    this.userName = userName;
    this.email = email;
    this.password1 = password1;
    
}

var userCond = false;

signUp.addEventListener('click', function () {

    // form validation
    if (InputUser.value === "" || InputUser.value.length < 6) {
        InputUser.style.borderColor = "red";
    }
    else {
        InputUser.style.borderColor = "#ccc";
        userCond = true;
    }

    if (InputEmail.value === "") {
        InputEmail.style.borderColor = "red";
    }
    else {
        InputEmail.style.borderColor = "#ccc";
        userCond = true;
    }
    if (InputPassword1.value === "") {
        InputPassword1.style.borderColor = "red";
    }
    else {
        InputPassword1.style.borderColor = "#ccc";
        userCond = true;
    }
    if (InputPassword2.value === "") {
        InputPassword2.style.borderColor = "red";
    }
    else {
        InputPassword2.style.borderColor = "#ccc";
        userCond = true;
    }

    // email validation
    var emailRgex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (emailRgex.test(InputEmail.value)) {
        InputEmail.style.borderColor = "#ccc";
        userCond = true;

    } else {
        InputEmail.style.borderColor = "red";

    }


    // password validation
    var passwrodRegex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (passwrodRegex.test(InputPassword1.value)) {
        InputPassword1.style.borderColor = "#ccc";
        InputPassword2.style.borderColor = "#ccc";
        userCond = true;

    } else {
        InputPassword1.style.borderColor = "red";
        InputPassword2.style.borderColor = "red";
    }

    if (InputPassword1.value !== InputPassword2.value) {
        InputPassword1.style.borderColor = "#ccc";
        InputPassword2.style.borderColor = "#ccc";
        userCond = true;
    } else {
        
        InputPassword1.style.borderColor = "red";
        InputPassword2.style.borderColor = "red";
    }

    console.log(userCond)
    



    // putinng data to constructor object
    if(userCond){
        user1 = new TakeUserData(InputUser.value,InputEmail.value,InputPassword1.value);
        arr.push(user1)

        localStorage.setItem("userLocal",JSON.stringify(arr))
        // console.log(localStorage.getItem("userLocal"))
    }

    console.log(localStorage.getItem("userLocal"))















    // var userData = new TakeUserData(InputUser.value, InputEmail.value, InputPassword1.value, InputPassword2.value);

})









