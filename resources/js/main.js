
window.addEventListener("DOMContentLoaded", domLoaded);



function domLoaded() {
    document.getElementById("themeBtn").addEventListener("click", toggle_style);
    if (window.localStorage.getItem("theme") == "light") {
        document.getElementById("stylesheet").href = "/resources/css/main.css";
    }
    else {
        window.localStorage.setItem("theme", "dark");
        document.getElementById("stylesheet").href = "/resources/css/main.dark.css";
    }

    document.getElementById("setSale").addEventListener("click", setSale);
    document.getElementById("deleteSale").addEventListener("click", deleteSale);
    

    
}
function setSale(){
    let m = document.getElementById("saleInput").value;
    result = {message: m};
    let response = fetch("/api/sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(result)
    })
}

function deleteSale(){
    let response = fetch("/api/sale", {
        method: "DELETE"
    });
}


function toggle_style(){
    let link = document.getElementById("stylesheet");
    if (window.localStorage.getItem("theme") == "dark") {
        link.href = "/resources/css/main.css";
        window.localStorage.setItem("theme", "light");
    }
    else {
        link.href = "/resources/css/main.dark.css";
        window.localStorage.setItem("theme", "dark");
    }
}