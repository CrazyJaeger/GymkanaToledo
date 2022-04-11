/**
 * Navigates to a new window.
 * Originally, this method was intended to play an important role when it
 * came down to authentication and navigation within the app. Unforseen time
 * restrictions made it so this method was no longer that necesary, but keeping
 * it was simpler than discarding it.
 * 
 * Technically speaking, we could say this method is deprecated
 * 
 * @param {string} destination name of the destination page
 */
function navigateTo(destination) {
    let target = "./" + destination + ".html";
    location.replace(target);
}