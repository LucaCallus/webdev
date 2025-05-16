// Add images?
// const cars = {
//         c1: new Car("Mazda", "Demio 2", "2002", 95, "A", 5000),
//         c2: new Car("Toyota", "Celica GT", "1999", 180, "M", 7500),
//         c3: new Car("Subaru", "Impreza WRX", "2005", 276, "M", 27000),
//         c4: new Car("Audi", "R8", "2006", 420, "M", 89000),
//         c5: new Car("Ferrari", "F40", "1987", 478, "M", 399000) // price now is 1.5M
//     }


// INCLUDE THIS CODE IN main.js - done

const cars = [
    ["Mazda Demio 2", 5000],
    ["Toyota Celica GT", 7500],
    ["Subaru Impreza WRX", 27000],
    ["Audi R8", 89000],
    ["Ferrai F40", 399000],
];

// Buy Car logic
function buy(index){
    if(money >= cars[index][1]){
        money -= cars[index][1]; // decrease money

        saveGameState();
    
        const owned = document.createElement("span");
        owned.innerHTML = "OWNED";

        let carDiv = document.querySelector(`#car${index+1}`);
        let buyBtn = carDiv.querySelector("button");

        carDiv.replaceChild(owned, buyBtn);
    }
    else alert("Not Enough Money");
}

document.addEventListener("DOMContentLoaded", () => {
    for(let i=0; i<cars.length; i++){
        let carDiv = document.querySelector(`#car${i+1}`);
        carDiv.querySelector("h4").innerHTML = cars[i][0];
        carDiv.querySelector("h5").innerHTML = `$${cars[i][1]}`;
        carDiv.querySelector("button").onclick = () => buy(i);
    }

})