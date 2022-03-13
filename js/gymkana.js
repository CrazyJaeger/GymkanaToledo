function loop() {
    let flag = updateTimer();
    if (flag) {
        setTimeout(loop, 60000);
    }
}

function login() {
    var uname = document.getElementById("uname").value;
    var passwd = document.getElementById("passwd").value;

    let token = getUserToken(uname, passwd);

    if (token == null) {
        var msg = document.getElementById("msg");
        msg.innerHTML = "¡Usuario o contraseña incorrectos!";
    } else {
        let target = "./gymkana.html?token=" + token;
        location.replace(target);
    }
}

function getUserToken() {
    // TODO
    // Obtener el token desde backend

    // TODO: stub
    return "1234";
}

function tokenOk() {
    let href = window.location.href.split("?token=");
    if (href.length != 2) {
        return false;
    } else {
        let token = href[1];
        // TODO: combrobar con backend que el token es correcto


        // TODO: stub!
        return true;
    }
}

function setPageVisibility() {
    if (tokenOk()) {
        document.getElementById("login-form").classList.add("hidden");
        document.getElementById("task").classList.remove("hidden");
        const image_input = document.querySelector("#image_input");
        image_input.addEventListener("change", function () {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const uploaded_image = reader.result;
                document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
            });
            reader.readAsDataURL(this.files[0]);
        });
    }
}

function submitImg() {
    alert("Image submited!");
}