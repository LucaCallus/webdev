import {Car} from './Cars.js';

const key = "Soc94sdA1rpD5cJS0KR0Ag==helcxLhOhotfuYp2";
const url = `https://api.api-ninjas.com/v1/cars?make=audi`;

document.addEventListener("DOMContentLoaded", () => {
    fetch(url, {
        headers: {
            "X-api-key": key
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log("Error:", error));


    // can calculate price using formula
    // find efficient way to get car images
    // add sir to github repo

    // ---------------------------------------------------------------------------------------

    // Add images?
    let cars = {
        c1: new Car("Mazda", "Demio 2", "2002", 95, "A", 5000),
        c2: new Car("Toyota", "Celica GT", "1999", 180, "M", 7500),
        c3: new Car("Subaru", "Impreza WRX", "2005", 276, "M", 27000),
        c4: new Car("Audi", "R8", "2006", 420, "M", 89000),
        c5: new Car("Ferrari", "F40", "1987", 478, "M", 399000) // price now is 1.5M
    }


})