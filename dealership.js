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
})