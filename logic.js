let money = 0;
let rate = 1;
let cost = [50, 50, 50, 50, 50, 50];

function count(){
    money += rate;
    document.querySelector("#money").innerHTML = money;
}

setInterval(count, 1000)

function upgrade(index, costNo){
    if(money >= cost[index]){
        money -= cost[index];
        cost[index] = Math.round(2.5 * cost[index]);
        document.querySelector(`${costNo}`).innerHTML = cost[index];
    }
    else alert("Not Enough Money");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#money").innerHTML = money;

    document.querySelector("#wheelButton").onclick = count;

    // Add onclick property for each mechanic
    for(let i=0; i<6; i++){
        document.querySelector(`#mechanic${i+1}`).onclick = () => upgrade(i, `#cost${i+1}`);
    }
    // mechanic (for each one) - need to: increase cost, increase $/s, check if player has enough money



})