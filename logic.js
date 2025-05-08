let money = 0;
let rate = 1;
let rates = [1, 0, 0, 0, 0, 0];
let cost = [10, 75, 100, 125, 150, 200];
let levels = [1, 0, 0, 0, 0, 0];

function countAuto(){
    money += rate;
    document.querySelector("#money").innerHTML = money;
}

function count(){
    money += 1; // expsenive upgrade to be able to upgrade this
    document.querySelector("#money").innerHTML = money;
}

setInterval(countAuto, 1000);

function upgrade(index){
    if(money >= cost[index]){
        money -= cost[index]; // decrease money

        // Update Rate
        if(levels[index]==0) rates[index] = 2; // set rate to 2
        else rates[index] *= 2; // multiply rate by 2 (2^n)
        document.querySelector(`#rate${index+1}`).innerHTML = rates[index];

        // Update Level
        levels[index] += 1;
        document.querySelector(`#level${index+1}`).innerHTML = levels[index];

        // Update Cost
        cost[index] = Math.round(2.5 * cost[index]); // multiply cost by 2.5 (2.5^n)
        document.querySelector(`#cost${index+1}`).innerHTML = cost[index];

        // Update overall rate
        rate = rates.reduce((a, b) => a+b, 0);
        document.querySelector("#rate").innerHTML = rate;
        
    }
    else alert("Not Enough Money");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#money").innerHTML = money;

    document.querySelector("#wheelButton").onclick = count;

    // Add onclick property for each mechanic
    for(let i=0; i<6; i++){
        document.querySelector(`#mechanic${i+1}`).onclick = () => upgrade(i);
    }
    // mechanic (for each one) - need to: increase cost, increase $/s, check if player has enough money



})