function register() {
    var uname = document.getElementById("uname").value;
    var passwd = document.getElementById("passwd").value;
    var repeat = document.getElementById("repeat").value;
    var msg = document.getElementById("msg");

    msg.innerHTML = "";

    if (uname === "" || uname == null) {
        classAddRemove(msg, "ko-text", "ok-text");
        msg.innerHTML = "¡El nombre de usuario no puede estar vacío!";
    }else if(passwd === "" || passwd == null){
        classAddRemove(msg, "ko-text", "ok-text");
        msg.innerHTML = "¡La contraseña no puede estar vacía!";
    } else if (passwd !== repeat) {
        classAddRemove(msg, "ko-text", "ok-text");
        msg.innerHTML = "¡La contraseña y la repetición de la misma no coinciden!";
    } else if (unameTaken(uname)) {
        classAddRemove(msg, "ko-text", "ok-text");
        msg.innerHTML = "Ese nombre de usuario ya esta cogido :(";
    } else {
        var token = generateToken(uname, passwd);
        registerGroup(uname, passwd, token);
        classAddRemove(msg, "ok-text", "ko-text");
        msg.innerHTML = "Grupo registrado con éxito!";
    }
}

function classAddRemove(div, add, remove) {
    if (div.classList.contains(remove)) {
        div.classList.remove(remove);
    }
    if (!div.classList.contains(add)) {
        div.classList.add(add)
    }
}

function unameTaken(uname) {
    // TODO
    // Comprobar que el nombre de usuario existe ya en la BD

    // TODO: stub!
    return false;
}

function generateToken(user, passwd) {
    let aux = user + passwd;
    return hashCode(aux);
}

function registerGroup(uname, passwd, token) {
    // TODO: enviar datos a la BD para el registro

    // TODO: stub!
    alert(`Uname: ${uname}\n Password: ${passwd}\n Token: ${token}`)
}

/**
 * Returns a hash code for a string.
 * (Compatible to Java's String.hashCode())
 *
 * The hash code for a string object is computed as
 *     s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} s a string
 * @return {number} a hash code value for the given string.
 */
hashCode = function (s) {
    var h = 0, l = s.length, i = 0;
    if (l > 0)
        while (i < l)
            h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
};