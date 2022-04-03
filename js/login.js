const firebase = "https://gymkanatoledo-default-rtdb.europe-west1.firebasedatabase.app/";

function login() {
    let email = document.getElementById("uname").value;
    let password = document.getElementById("passwd").value;
    let uname = email.split("@")[0];

    fetch(firebase + "passwds/" + uname + ".json").then(function (response) {
        return response.json();
    }).then(function (data) {
        if(data === password){
            sessionStorage.setItem("user", uname);
            if(uname === "profe"){
                location.replace("./validar.html");
            }else{
                location.replace("./gymkana.html");
            } 
        }else{
            let err = document.getElementById("msg");
            err.innerHTML = "Usuario o contraseña incorrectos"
        }
    });
}