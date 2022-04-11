const firebase = "<FIREBASE REAL-TIME DATABASE ROOT URL>";

/**
 * Checks if the user is logged in AND that the user corresponds to the
 * teacher role.
 * The user will be redirected to the login page if criteria are not met.
 */
function checkLogin(){
    const usr = sessionStorage.getItem("user");
    if (usr !== "profe") {
        location.replace("./login.html");
    } else {
        fetchValidaciones();
    }
}

/**
 * Retrieves all latest posts from the the group participants.
 */
function fetchValidaciones(){
    fetch(firebase + "posts.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let posts = data;
        fetch(firebase + "soluciones.json").then(function (response) {
            return response.json();
        }).then(function (data) {
            let soluciones = data;
            loadPosts(posts, soluciones);
        });
    });
}

/**
 * Prints the submissions on screen for the teacher to validate them.
 * 
 * @param {object[]} posts list of post objects with the submited picture, group name and puzzle id
 * @param {string[]} soluciones string array with the puzzle solutions
 */
function loadPosts(posts, soluciones){
    let section = document.getElementById("seccion-validaciones");
    for(var postid in posts){
        let div = document.createElement("div");
        div.setAttribute("id", postid);

        let b = document.createElement("b");
        b.setAttribute("value", posts[postid].grupo);
        b.innerHTML = posts[postid].grupo;

        let p = document.createElement("p");
        p.setAttribute("value", posts[postid].acertijo);
        p.innerHTML = soluciones[posts[postid].acertijo]

        let imgdiv = document.createElement("div");
        imgdiv.classList.add("display_image");
        imgdiv.style.backgroundImage = `url(${posts[postid].imagen})`;

        let moment = document.createElement("input");
        moment.setAttribute("type", "hidden");
        moment.setAttribute("value", posts[postid].instante)

        let btns = document.createElement("div");
        btns.classList.add("validate-btns")

        let ok = document.createElement("button");
        ok.classList.add("ok-btn")
        ok.innerHTML = "CORRECTO"
        ok.addEventListener("click", () => validatePost(postid, true));

        let ko = document.createElement("button");
        ko.classList.add("ko-btn")
        ko.innerHTML = "ERROR"
        ko.addEventListener("click", () => validatePost(postid, false));

        btns.appendChild(ok);
        btns.appendChild(ko);

        div.appendChild(b);
        div.appendChild(p);
        div.appendChild(moment)
        div.appendChild(imgdiv);
        div.appendChild(btns);

        section.appendChild(div);
    }
}

/**
 * Sets the group state to "pass" or "fallo", depending on wether the submission is valid or not.
 * Either way, the submission is deleted from the database.
 * 
 * @param {string} postid randomly generated id that identifies the submission
 * @param {boolean} valid validity of the submission
 */
function validatePost(postid, valid){
    let div = document.getElementById(postid);
    let grupo = div.getElementsByTagName("b").item(0).getAttribute("value");
    let acertijo = parseInt(div.getElementsByTagName("p").item(0).getAttribute("value"));
    if(valid){
        let momento = div.getElementsByTagName("input").item(0).getAttribute("value");
        let body = {
            acertijoactual: acertijo + 1, 
            estado: "pass"
        }
        fetch(firebase + "grupos/" + grupo + ".json", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(body)
        }).then(res => {
            let body2 = {
                puntos: acertijo + 1,
                tiempo: momento
            }
            fetch(firebase + "marcador/" + grupo + ".json",{
                method: "PUT",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(body2)
            }).then(res => {
                fetch(firebase + "posts/" + postid + ".json", {
                    method: "DELETE"
                }).then(res => {
                    div.remove();
                });
            });
        });
    }else{
        let body = {
            acertijoactual: acertijo,
            estado: "fallo"
        }
        fetch(firebase + "grupos/" + grupo + ".json", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(body)
        }).then(res => {
            fetch(firebase + "posts/" + postid + ".json", {
                method: "DELETE"
            }).then(res => {
                div.remove();
            });
        });
    }
}