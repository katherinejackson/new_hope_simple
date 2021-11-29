export function getDogs() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:8080/doglist`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status >= 200 && xhttp.status < 300 && xhttp.responseText) {

            return JSON.parse(xhttp.responseText)
        }
    };

}

export function getStaff() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:8080/stafflist`, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status >= 200 && xhttp.status < 300 && xhttp.responseText) {

            return JSON.parse(xhttp.responseText)
        }
    };
}