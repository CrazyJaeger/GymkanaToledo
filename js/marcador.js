function getGroups() {
    // TODO
    // Conectar con la base de datos para obtener los grupos

    // TODO: stub!
    let groups = [
        {
            nombre: "Grupo 1",
            puntos: "5",
            tiempo: 1643672470000
        }, {
            nombre: "Grupo 2",
            puntos: "3",
            tiempo: 1643671446000
        }, {
            nombre: "Grupo 3",
            puntos: "5",
            tiempo: 1643672366000
        }, {
            nombre: "Grupo 4",
            puntos: "0",
            tiempo: 1643670000000
        }, {
            nombre: "Grupo 5",
            puntos: "1",
            tiempo: 1643671152000
        }
    ];

    orderGroups(groups);
}

function orderGroups(groups) {
    groups.sort((a, b) => {
        let diff = b.puntos - a.puntos;

        if (diff == 0) {
            diff = a.tiempo - b.tiempo
        }

        return diff;
    });

    createTable(groups)
}

function getStartingTime() {
    // TODO
    // Pedir a la base de datos el momento en el que empezo la prueba

    // TODO: stub!
    return 1643670000000;
}

function formatTime(diff) {
    let mins = diff.getMinutes();
    let secs = diff.getSeconds();
    if (mins < 10)
        mins = "0" + mins;
    if (secs < 10)
        secs = "0" + secs;

    return mins + ":" + secs;
}

function createTable(orderedGroups) {
    let startTime = getStartingTime();

    // Creamos la tabla
    let tbody = document.getElementById("leaderboard-body");
    for (let i = 0; i < orderedGroups.length; i++) {
        let tr = document.createElement("tr");
        tr.classList.add("leaderboard-row");

        // CSS
        if (i == 0) {
            tr.classList.add("leader-first");
        } else if (i == 1) {
            tr.classList.add("leader-second");
        } else if (i == 2) {
            tr.classList.add("leader-third");
        } else if (i % 2 == 0) {
            tr.classList.add("leader-even");
        } else {
            tr.classList.add("leader-odd");
        }

        let puesto = document.createElement("td");
        puesto.classList.add("leaderboard-col");
        puesto.innerHTML = i + 1;
        let grupo = document.createElement("td");
        grupo.classList.add("leaderboard-col");
        grupo.innerHTML = orderedGroups[i].nombre;
        let puntos = document.createElement("td");
        puntos.classList.add("leaderboard-col");
        puntos.innerHTML = orderedGroups[i].puntos;
        let tiempo = document.createElement("td");
        tiempo.classList.add("leaderboard-col");
        let diff = orderedGroups[i].tiempo - startTime;
        tiempo.innerHTML = formatTime(new Date(diff));

        // Annadimos los elementos
        tr.appendChild(puesto);
        tr.appendChild(grupo);
        tr.appendChild(puntos);
        tr.appendChild(tiempo);
        tbody.appendChild(tr);
    }

}

function loop(){
    let flag = updateTimer();
    if(flag){
        setTimeout(loop, 1000);
    }
}