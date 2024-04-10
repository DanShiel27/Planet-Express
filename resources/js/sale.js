window.addEventListener("DOMContentLoaded", domLoaded);



function domLoaded() {
    setInterval(checkSale, 1000);

}

async function checkSale(){
    let response = await fetch("/api/sale");

    if(response.ok){
        let json = await response.json();

        console.log(json);
        console.log(json.active);
        if(json.active){
            console.log("active");
            document.getElementById("message").innerHTML = json.message;
            document.getElementById("sale").style.setProperty("display", "block");
            
        }
        else{
            console.log("not active");
            document.getElementById("sale").style.setProperty("display", "none");
        }
    }
}