const firebase = "https://gymkanatoledo-default-rtdb.europe-west1.firebasedatabase.app/";

function checkLogin() {
    const usr = sessionStorage.getItem("user");
    if (usr == null) {
        location.replace("./login.html");
    } else {
        fetchState(usr);
    }
}

function fetchState(user) {
    fetch(firebase + "grupos/" + user + "/acertijoactual.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let acertijoactual = data;

        if(parseInt(acertijoactual) == 8){
            alert("¡ENHORABUENA! ¡HAS TERMINADO! Quédate en el Alcazar hasta que finalice la actividad")
            return;
        }

        document.getElementById("acertijoid").setAttribute("value", acertijoactual);

        fetch(firebase + "grupos/" + user + "/estado.json").then(function (response) {
            return response.json();
        }).then(function (data) {
            let estado = data;
            if (estado != "pass") {
                fetchPuzzle(acertijoactual, estado);
            } else {
                let body = {
                    acertijoactual: parseInt(acertijoactual) + 1,
                    estado: "ok"
                }
                fetch(firebase + "grupos/" + user + ".json", {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }).then(res => {
                    location.replace("./gymkana.html");
                });
            }

        });
    });
}

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

function loadPuzzle(puzzle, pista) {
    let acertijo = document.getElementById("acertijo");
    let texto = document.getElementById("texto");
    let imagenes = document.getElementById("imagenes");
    let pistatxt = document.getElementById("pista");

    acertijo.innerHTML = puzzle.acertijo;
    if(puzzle.texto != null){
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
    
    if(puzzle.imagenes != null){
        for (var img of puzzle.imagenes) {
            let div = document.createElement("div");
            div.classList.add("puzzle_image");
            div.style.backgroundImage = `url(${img})`;
            imagenes.appendChild(div);
        }
    }

    if (pista != null) {
        pistatxt.innerHTML = pista;
    }
}

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

function submitImg() {
    let div = document.getElementById("display_image");
    let styles = window.getComputedStyle(div);
    let image = styles.backgroundImage;
    if (image != "none") {
        let b64 = image.slice(5, -2);
        postB64(b64);
    }
}

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
