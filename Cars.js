export class Car{
    constructor(brand, model, year, bhp, trans, price){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.bhp = bhp;
        this.trans = trans;
        this.price = price;
    }

    getDetails(){
        return `Brand: ${this.brand}, 
        Model: ${this.model}, 
        Year: ${this.year}, 
        BHP: ${this.bhp}, 
        Trans: ${this.trans}, 
        Price: $${this.price}`;
    }  
}