const firebase = "https://gymkanatoledo-default-rtdb.europe-west1.firebasedatabase.app/";

function fetchGroups(){
    fetch(firebase + "marcador.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let groups = [];
        for(let id in data){
            groups.push(formatGroup(id, data[id]))
        }
        orderGroups(groups);
    });
}

function formatGroup(id, group){
    return {
        nombre: id,
        puntos: group.puntos,
        tiempo: new Date(group.tiempo)
    }
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

function formatTime(diff) {
    let hours = diff.getHours();
    let mins = diff.getMinutes();
    let secs = diff.getSeconds();
    if(hours < 10)
        hours = "0" + hours;
    if (mins < 10)
        mins = "0" + mins;
    if (secs < 10)
        secs = "0" + secs;

    return hours + ":" + mins + ":" + secs;
}

function createTable(orderedGroups) {
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
        tiempo.innerHTML = formatTime(orderedGroups[i].tiempo);

        // Annadimos los elementos
        tr.appendChild(puesto);
        tr.appendChild(grupo);
        tr.appendChild(puntos);
        tr.appendChild(tiempo);
        tbody.appendChild(tr);
    }

}