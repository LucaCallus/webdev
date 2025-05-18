// IMP -- cost[0]=50 (temporarily is 10 for testing) -- IMP
// include this at top:
let money = 0;
let rate = 0;

// Initialise mechanics
const mechanics = [
    // name, $/sec, price
    ["Apprentice", 1, 100],
    ["Junior", 5, 500],
    ["Experienced", 15, 2500],
    ["Senior", 50, 10000],
    ["Master", 200, 50000],
    ["Legendary", 1000, 250000]
]

// Initialise cars
const cars = [ // save that cars are bought - IMP
    // name, price
    ["Mazda Demio 2", 5000],
    ["Toyota Celica GT", 7500],
    ["Subaru Impreza WRX", 27000],
    ["Audi R8", 89000],
    ["Ferrai F40", 399000],
];

let hired = Array(mechanics.length).fill(0);
let bought = Array(cars.length).fill(0);
let achievements = [0, 0, 0, 0]; // [First Click, First Mechanic, First Car, Millionaire]

// Save state func
function saveGameState(){
    fetch("http://localhost:3000/gameState", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({money, rate, hired, bought, achievements})
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
    rotateSW();
    if (!achievements[0]) { // First Click
        achievements[0] = 1;
        updateAchievementsUI();
        saveGameState();
    }
}

// Steering wheel rotation animation
function rotateSW(){
    const wheelImg = document.getElementById('steeringWheelImg');
    if (wheelImg) {
        const angle = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 10); // random -20 to +20 deg
        wheelImg.style.transition = 'transform 0.2s cubic-bezier(.4,2,.6,1)';
        wheelImg.style.transform = `rotate(${angle}deg)`;
        setTimeout(() => {
            wheelImg.style.transform = 'rotate(0deg)';
        }, 200);
    }
}

// Buy Mechanics logic
function buyMechanic(index){
    if(money >= mechanics[index][2]){
        money -= mechanics[index][2]; // decrease money
        rate += mechanics[index][1]; // update rate
        document.querySelector("#rate").innerHTML = rate;
        hired[index] = 1; // Mark as hired
        const hiredSpan = document.createElement("span");
        hiredSpan.innerHTML = "Already Hired";
        let mechDiv = document.querySelector(`#mechanic${index+1}`);
        let hireBtn = mechDiv.querySelector("button");
        mechDiv.replaceChild(hiredSpan, hireBtn);
        if (!achievements[1]) { // First Mechanic
            achievements[1] = 1;
            updateAchievementsUI();
        }
        saveGameState();
    }
    else alert("Not Enough Money");
}

// Buy Car logic
function buyCar(index){
    if(money >= cars[index][1]){
        money -= cars[index][1]; // decrease money
        bought[index] = 1; // Mark as bought
        const ownedSpan = document.createElement("span");
        ownedSpan.innerHTML = "OWNED";
        let carDiv = document.querySelector(`#car${index+1}`);
        let buyBtn = carDiv.querySelector("button");
        carDiv.replaceChild(ownedSpan, buyBtn);
        if (!achievements[2]) { // First Car
            achievements[2] = 1;
            updateAchievementsUI();
        }
        saveGameState(); // save game state
    }
    else alert("Not Enough Money");
}

// Update achievements UI function
function updateAchievementsUI() {
    for(let i = 0; i < achievements.length; i++) {
        const achBox = document.getElementById(`ach${i+1}`);
        if(achBox) achBox.checked = !!achievements[i];
    }
}

// Automatic updates
setInterval(countAuto, 1000); // run every 1s
setInterval(saveGameState, 30000); // run every 30s

// Millionaire achievement check (auto)
setInterval(() => {
    if (!achievements[3] && money >= 1000000) {
        achievements[3] = 1;
        updateAchievementsUI();
        saveGameState();
    }
}, 1000); // run every 1s

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Load state
    fetch("http://localhost:3000/gameState")
    .then(res => res.json())
    .then(state => {
        money = state.money;
        rate = state.rate;
        hired = state.hired;
        bought = state.bought;
        achievements = state.achievements;

        console.log(state);

        // Update UI
        document.querySelector("#money").innerHTML = money; // money
        document.querySelector("#rate").innerHTML = rate; // rate
        for(let i=0; i<mechanics.length; i++){ // update mechanics - hired?
            let mechDiv = document.querySelector(`#mechanic${i+1}`);
            let hireBtn = mechDiv.querySelector("button");
            if(hired[i]){
                const hiredSpan = document.createElement("span");
                hiredSpan.innerHTML = "Already Hired";
                if(hireBtn) mechDiv.replaceChild(hiredSpan, hireBtn);
            }
        }
        for(let i=0; i<cars.length; i++){ // update cars - bought?
            let carDiv = document.querySelector(`#car${i+1}`);
            let buyBtn = carDiv.querySelector("button");
            if(bought[i]){
                const ownedSpan = document.createElement("span");
                ownedSpan.innerHTML = "OWNED";
                if(buyBtn) carDiv.replaceChild(ownedSpan, buyBtn);
            }
        }
        updateAchievementsUI(); // update achievements

        // Add onclick property to the main button
        const wheelButton = document.querySelector("#wheelButton");
        if(wheelButton) wheelButton.onclick = count;

        // Add html content and buy function for each mechanic
        for(let i=0; i<mechanics.length; i++){
            let mechDiv = document.querySelector(`#mechanic${i+1}`);
            if(!mechDiv) continue;
            mechDiv.classList.add("mechanic-card"); // ensure class for styling
            const h4 = mechDiv.querySelector("h4");
            if(h4) h4.innerHTML = mechanics[i][0];
            const rateSpan = mechDiv.querySelector(".rate");
            if(rateSpan) rateSpan.innerHTML = mechanics[i][1];
            let btn = mechDiv.querySelector("button");
            if(btn) {
                const span = btn.querySelector("span");
                if (span) span.innerHTML = mechanics[i][2];
                btn.onclick = () => buyMechanic(i);
            }
        }

        // Add html content and buy function for each car
        for(let i=0; i<cars.length; i++){
            let carDiv = document.querySelector(`#car${i+1}`);
            if(!carDiv) continue;
            carDiv.classList.add("car-card"); // ensure class for styling
            // Set car image src and alt
            let carImg = carDiv.querySelector(".car-img");
            if(carImg) {
                const carImgSrcs = [
                    "cars/mazda_demio.png",
                    "cars/toyota_celica.png",
                    "cars/subaru_impreza.png",
                    "cars/audi_r8.png",
                    "cars/ferrari_f40.png"
                ];
                const carImgAlts = [
                    "Mazda Demio 2",
                    "Toyota Celica GT",
                    "Subaru Impreza WRX",
                    "Audi R8",
                    "Ferrari F40"
                ];
                carImg.src = carImgSrcs[i];
                carImg.alt = carImgAlts[i];
            }
            const h4 = carDiv.querySelector("h4");
            if(h4) h4.innerHTML = cars[i][0];
            const h5 = carDiv.querySelector("h5");
            if(h5) h5.innerHTML = `$${cars[i][1]}`;
            let btn = carDiv.querySelector("button");
            if(btn) btn.onclick = () => buyCar(i);
        }


    });


});

//  NOT WORKING
// // Save game state when the user closes the tab or navigates away - usign sendBeacon()
// window.addEventListener("beforeunload", () => {
//     const data = JSON.stringify({money, rate, rates, cost, levels});
//     const blob = new Blob([data], {type: "application/json"});
//     navigator.sendBeacon("http://localhost:3000/gameState", blob);
// });