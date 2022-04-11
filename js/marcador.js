const firebase = "<FIREBASE REAL-TIME DATABASE ROOT URL>";

/**
 * Retrieves the leaderboard list from database.
 */
function fetchGroups() {
    fetch(firebase + "marcador.json").then(function (response) {
        return response.json();
    }).then(function (data) {
        let groups = [];
        for (let id in data) {
            groups.push(formatGroup(id, data[id]))
        }
        orderGroups(groups);
    });
}

/**
 * Creates a DTO for the Group data retrieved from the database.
 * 
 * @param {string} id group name
 * @param {object} group database object containing the points and 
 *      time of last submission of that group
 * @returns object representing the important info of a group for 
 *          the leaderboard: group name, points and time of last submission
 */
function formatGroup(id, group) {
    return {
        nombre: id,
        puntos: group.puntos,
        tiempo: new Date(group.tiempo)
    }
}

/**
 * Orders a list of groups, first by points, then by submission time.
 * After the array has been ordered, the list is forwarded to the createTable Method.
 * 
 * @param {object[]} groups list of Group DTOs
 */
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

/**
 * Creates a string with a timestamp in a way its "pretty to see"
 * 
 * @param {Date} diff timestamp we wish to format
 * @returns formated string of the timestamp in the HH:MM:SS format
 */
function formatTime(diff) {
    let hours = diff.getHours();
    let mins = diff.getMinutes();
    let secs = diff.getSeconds();
    if (hours < 10)
        hours = "0" + hours;
    if (mins < 10)
        mins = "0" + mins;
    if (secs < 10)
        secs = "0" + secs;

    return hours + ":" + mins + ":" + secs;
}

/**
 * Displays an ordered group list in a table.
 * First 3 groups have a "special" background color (gold, silver and bronze). The rest
 * have alternating lightgray and white stripes for easier visualization.
 * 
 * @param {object[]} orderedGroups 
 */
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