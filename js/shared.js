function navigateTo(destination) {
    let target = "./" + destination + ".html";
    let href = window.location.href.split("?token=");
    if (href.length == 2) {
        let token = href[1];
        target += "?token=" + token;
    }
    location.replace(target);
}