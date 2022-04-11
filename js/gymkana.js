const firebase = "<FIREBASE REAL-TIME DATABASE ROOT URL>";

/**
 * Checks if user is logged in.
 * 
 * If the user is not logged in, window navigates to the log-in page.
 */
function checkLogin() {
    const usr = sessionStorage.getItem("user");
    if (usr == null) {
        location.replace("./login.html");
    } else {
        fetchState(usr);
    }
}

/**
 * Checks the current state of the user.
 * 
 * This function will call the database to determine the current puzzle. After that the state of the last submission will be
 * checked to determine what to do next.
 * 
 * @param {string} user username
 */
function fetchState(user) {
    fetch(firebase + "grupos/" + user + "/acertijoactual.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let acertijoactual = data;

        // Last puzzle is number 7. If this value return 8, the Gymkana is over
        if (parseInt(acertijoactual) == 8) {
            alert("¡ENHORABUENA! ¡HAS TERMINADO! Quédate en el Alcazar hasta que finalice la actividad")
            return;
        }

        document.getElementById("acertijoid").setAttribute("value", acertijoactual);

        fetch(firebase + "grupos/" + user + "/estado.json").then(function (response) {
            return response.json();
        }).then(function (data) {
            let estado = data;
            if (estado != "pass") {
                // We are still in that puzzle number
                fetchPuzzle(acertijoactual, estado);
            } else {
                // We got a pass! Retrieve next puzzle and update current state.
                let body = {
                    acertijoactual: parseInt(acertijoactual) + 1,
                    estado: "ok"
                }
                fetch(firebase + "grupos/" + user + ".json", {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }).then(res => {
                    // Refresh page to get changes
                    location.replace("./gymkana.html");
                });
            }

        });
    });
}

/**
 * Retrieves the corresponding puzzle.
 * If the current state is an "error" state (fallo), it retrieves an extra clue to help
 * the user solve it.
 * 
 * @param {int} acertijoactual current puzzle number
 * @param {string} estado current state. Can be 'ok' or 'fallo'
 */
function fetchPuzzle(acertijoactual, estado) {
    fetch(firebase + "acertijos/" + acertijoactual + ".json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let puzzle = data;
        if (estado === "ok") {
            loadPuzzle(puzzle, null);
        } else if (estado === "fallo") {
            fetch(firebase + "pistas/" + acertijoactual + ".json").then(function (response) {
                return response.json();
            }).then(function (data) {
                let pista = data;

                loadPuzzle(puzzle, pista);
            });
        }
    });
}

/**
 * Prints the puzzle on the screen.
 * 
 * @param {object} puzzle object containing the puzzle description, the puzzle clues or images
 * @param {string} pista puzzle extra clue. May be null if no extra clue is given
 */

function loadPuzzle(puzzle, pista) {
    let acertijo = document.getElementById("acertijo");
    let texto = document.getElementById("texto");
    let imagenes = document.getElementById("imagenes");
    let pistatxt = document.getElementById("pista");

    // Sets puzzle description
    acertijo.innerHTML = puzzle.acertijo;

    // Sets puzzle texts (clues required to solve it)
    if (puzzle.texto != null) {
        for (var text of puzzle.texto) {
            let b = document.createElement("b");
            let br = document.createElement("br");
            let p = document.createElement("p");
            b.innerHTML = text.titulo;
            p.innerHTML = text.cuerpo;
            texto.appendChild(b);
            texto.appendChild(br);
            texto.appendChild(p);
        }
    }

    // Sets puzzle images required to solve it
    if (puzzle.imagenes != null) {
        for (var img of puzzle.imagenes) {
            let div = document.createElement("div");
            div.classList.add("puzzle_image");
            div.style.backgroundImage = `url(${img})`;
            imagenes.appendChild(div);
        }
    }

    // Sets extra clue if given
    if (pista != null) {
        pistatxt.innerHTML = pista;
    }
}

/**
 * Activates submit button.
 * If no submission is given, button is disabled to avoid sending an accidental null to the database.
 * This function also turns a submited image into base64 format and display's it in a preview for the
 * user to verify that that is the image they want to submit.
 */
function activateSubmit() {
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

/**
 * Retrieves uploaded image from preview and converts it to b
 */
function submitImg() {
    let div = document.getElementById("display_image");
    let styles = window.getComputedStyle(div);
    let image = styles.backgroundImage;
    if (image != "none") {
        let b64 = image.slice(5, -2);
        postB64(b64);
    }
}

/**
 * Submits an image to the database.
 * Image is expexted to be in base64 format
 * 
 * @param {string} b64 an image in base 64 format
 */
function postB64(b64) {
    let acertijoid = document.getElementById("acertijoid").value;
    let grupo = sessionStorage.getItem("user");
    let post = {
        "acertijo": parseInt(acertijoid),
        "grupo": grupo,
        "instante": new Date(),
        "imagen": b64
    }

    fetch(firebase + "posts.json", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    }).then(res => {
        console.log("Request complete! response:", res);
        alert("Imagen enviada. Espera un poco y refresca la pagina. Si te aparecen letras rojas has fallado. Si la dan por buena pasareis a la siguiente prueba");
    });
}
