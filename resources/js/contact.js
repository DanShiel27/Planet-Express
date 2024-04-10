window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    document.getElementById("option").addEventListener("input", calculate);
    document.getElementById("check").addEventListener("input", calculate);
}



function calculate(e) {
    /**
     this section just gets the proper cost and sets up and gets the value for what ever is changed
     */
    let temp1 = document.getElementById("price").innerHTML;
    
    let trimmed = temp1.trim();
   
    let cost = parseInt(trimmed.substring(1));
    
    const optionId = e.target.id;
    const optionValue = document.getElementById(optionId).value;


    /**this part is for when the option is changed, various delivery speeds have different rates and they are doubled if the 
     check is checked but it hasn't changed
     */
    let checked = false;
    if (document.getElementById("check").checked == true){
        checked = true;
    }

    if (optionValue === "emergency"){
        cost = 1000;
        if (checked === true){
            cost = 2000;
        }
    }
    else if(optionValue === "rapid"){
        cost = 500;
        if (checked === true){
            cost = 1000;
        }
    }
    else if(optionValue === "standard"){
        cost = 250;
        if (checked === true){
            cost = 500;
        }
    }
    else if(optionValue === "discount"){
        cost = 100;
        if (checked === true){
            cost = 200;
        }
    }
    

    /*this section is for when the change is if the check mark got checked and should either double it if it was check
    or if it was already check and its being changed to unchecked then the cost is divided by 2 */
    if(optionValue === "yes"){
        if (document.getElementById("check").checked == true){
            cost = 2 * cost;
        }
        else{
            cost = cost / 2;
        } 
    }


    document.getElementById("price").innerHTML = "$" + cost;
}