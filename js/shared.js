function navigateTo(destination) {
    let target = "./" + destination + ".html";
    let href = window.location.href.split("?token=");
    if (href.length == 2) {
        let token = href[1];
        target += "?token=" + token;
    }
    location.replace(target);
}

function getEndingTime() {
    // TODO
    // Pedir a la base de datos el momento en el que empezo la prueba

    // TODO: stub!
    // Console >>> new Date().getTime() + 60000;
    return 1647184749581;
}

function updateTimer(){
    let end = getEndingTime();
    let current = new Date().getTime();
    let diff = end - current;

    let timer = document.getElementById("time");

    if(diff > 0){
        timer.innerHTML = formatTime(new Date(diff));
        return true;
    }else{
        timer.innerHTML = "00:00";
        timer.classList.add("ko-text");
        let home = document.getElementById("home");
        home.classList.add("ko-text");
        home.innerHTML = "¡Se acabó el tiempo!¡Dirígete al Alcazar para terminar la Gymkana!"
        return false;
    }

}