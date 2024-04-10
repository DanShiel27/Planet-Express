window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    let buttons = document.querySelectorAll("td button");
    
    for (let i = 0; i < buttons.length; i++){
        let button = buttons[i];
        button.addEventListener("click", delRow);
    }

    setInterval(setDates, 1000);
    
}

//learned how to use .remove from https://www.w3schools.com/jsref/met_element_remove.asp no code copied
async function delRow(e) {

    const buttonId = e.target.id;

    let response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({id: buttonId})
    });

    if (response.ok || response.status == 404){
        document.getElementById("t" + buttonId).remove();
    }
}
function setDates() {
    let dates = document.getElementsByClassName("until");

    for (let j = 0; j < dates.length; j++){
        let date = dates[j];
        const tempDate = document.getElementById("date" + j).innerHTML;
        
        const futureDate = new Date(tempDate);
       
        const currentDate = new Date;
        

        //in miliseconds
        const difference = futureDate - currentDate;

        console.log(difference);
        if (difference > 0){
            let differenceDate = new Date(difference);
            date.innerHTML = "days: " + differenceDate.getDay() + " hours: " + differenceDate.getHours() + " seconds: " + differenceDate.getSeconds();
        }
        else {
            date.innerHTML = "Past";
        }

    }
}
