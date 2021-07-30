var loginEmail1 = document.getElementById("loginEmail1");
var loginPassword = document.getElementById("loginPassword");
var login = document.getElementById("login");



var userData = localStorage.getItem("userLocal");
userData = JSON.parse(userData)


login.addEventListener('click',function(){
    for(var i = 0;i< userData.length;i++){
        console.log(userData[i].email,userData[i].password1)
        if(userData[i].email === loginEmail1.value && userData[i].password1 === loginPassword){
            console.log("you are now login")
        }else{
            console.log("not matched")
        }
    }

    




})
