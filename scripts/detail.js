// const FIXED_PRICE = 1000;

// let calculatePrice = () => {
//     let adultInput = document.getElementById("adult");
//     let totalPrice = document.getElementById("price");
//     let toDateInput = document.getElementById("toDate");
//     let fromDateInput = document.getElementById("fromDate");
//     let toDateValue = new Date(toDateInput.value);
//     let fromDateValue = new Date(fromDateInput.value);

//     toDateInput.min = fromDateInput.value;

//     let days = (toDateValue - fromDateValue)/(24*60*60*1000);

//     if(adultInput.value && toDateInput.value && fromDateInput.value){
//         totalPrice.value = "Rs. " + parseInt(adultInput.value)*FIXED_PRICE*days;
//     }else{
//         totalPrice.value = "Rs.0";
//     }
// }

const PRICE_PER_ROOM = 1000;

/* Function to update the Price field in the booking form, according to the dates, number of adults and total price */
let updatePrice = () => {
    let adultElement = document.getElementById("adult");
    let totalPriceElement = document.getElementById("price");
    let toDateElement = document.getElementById("toDate");
    let fromDateElement = document.getElementById("fromDate");

    let toDateValue = new Date(toDateElement.value);
    let fromDateValue = new Date(fromDateElement.value);

    toDateElement.min = fromDateElement.value;

    let days = (toDateValue - fromDateValue)/(24*60*60*1000);
    
    if(adultElement.value && toDateElement.value && fromDateElement.value)
        totalPriceElement.value = "Rs. " + parseInt(adultElement.value)*PRICE_PER_ROOM*days;
    else
        totalPriceElement.value = "Rs.0";   

}