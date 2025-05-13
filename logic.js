// IMP -- cost[0]=50 (temporarily is 10 for testing) -- IMP
// include this at top:
let money = 0;
let rate = 1;
let rates = [1, 0, 0, 0, 0, 0];
let cost = [10, 75, 100, 125, 150, 200]; // FIX PRICING - make more expensive
let levels = [1, 0, 0, 0, 0, 0];

// Save state
function saveGameState(){
    fetch("http://localhost:3000/gameState", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({money, rate, rates, cost, levels})
    })
    .then(res => {
        if(res.ok) console.log("Game Saved");
        else console.error("Failed to save");
    })
}

// Auto increment money
function countAuto(){
    money += rate;
    document.querySelector("#money").innerHTML = money;
}

// Manually increment money
function count(){
    money += 1; // expsenive upgrade to be able to upgrade this
    document.querySelector("#money").innerHTML = money;
}

// Mechanic Upgrade logic
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
        
        saveGameState(); // working?

    }
    else alert("Not Enough Money");
}

// Automatic updates
setInterval(countAuto, 1000); // run every 1s
setInterval(saveGameState, 30000);

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Load state
    fetch("http://localhost:3000/gameState")
    .then(res => res.json())
    .then(state => {
        money = state.money;
        rate = state.rate;
        rates = state.rates;
        cost = state.cost;
        levels = state.levels;

        console.log(state);

        // Update UI
        document.querySelector("#money").innerHTML = money; // money
        document.querySelector("#rate").innerHTML = rate; // rate
        for(let i=0; i<6; i++){ // mechanics - cost, level, rate
            document.querySelector(`#cost${i+1}`).innerHTML = cost[i];
            document.querySelector(`#level${i+1}`).innerHTML = levels[i];
            document.querySelector(`#rate${i+1}`).innerHTML = rates[i];
        }

        document.querySelector("#wheelButton").onclick = count;

        // Add onclick property for each mechanic
        for(let i=0; i<6; i++){
            document.querySelector(`#mechanic${i+1}`).onclick = () => upgrade(i);
        }


    })


})

//  NOT WORKING
// // Save game state when the user closes the tab or navigates away - usign sendBeacon()
// window.addEventListener("beforeunload", () => {
//     const data = JSON.stringify({money, rate, rates, cost, levels});
//     const blob = new Blob([data], {type: "application/json"});
//     navigator.sendBeacon("http://localhost:3000/gameState", blob);
// });