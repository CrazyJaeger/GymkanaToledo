const firebase = "<FIREBASE REAL-TIME DATABASE ROOT URL>";

/**
 * Logs into the application.
 * The login method used is a very simple login method, not really useful
 * in today's security standards, but good enough for this simple application
 * in order to keep the different users parttaking separate from one another.
 */
function login() {
    let email = document.getElementById("uname").value;
    let password = document.getElementById("passwd").value;
    let uname = email.split("@")[0];

    fetch(firebase + "passwds/" + uname + ".json").then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data === password) {
            sessionStorage.setItem("user", uname);
            if (uname === "profe") {
                location.replace("./validar.html");
            } else {
                location.replace("./gymkana.html");
            }
        } else {
            let err = document.getElementById("msg");
            err.innerHTML = "Usuario o contraseña incorrectos"
        }
    });
}