"use strict"

window.onload = function () {
    document.getElementById("discountDiv").style.display = "none"; //hides discount fields onload
    const rateBtn = document.getElementById("rateBtn");
    rateBtn.onclick = getRoomRate;
}

function getRoomRate() {
    let date = new Date(document.getElementById("checkinField").value);
    let month = date.getMonth();
    let queen = document.getElementById("queen").checked;
    let king = document.getElementById("king").checked;
    let twoBed = document.getElementById("twoBed").checked;
    let summer;
    let costPerNight;
    let numberOfNights = Number(document.getElementById("nightsField").value);

    // determines cost per night based on time of year and type of room
    if (month >= 5 && month <= 7) {
        summer = true;
    }
    else {
        summer = false;
    }

    if (summer && queen) {
        costPerNight = 250;
    }
    else if (summer && king) {
        costPerNight = 250;
    }
    else if (summer && twoBed) {
        costPerNight = 350;
    }
    else if (!summer && twoBed) {
        costPerNight = 210;
    }
    else {
        costPerNight =  150;
    }

    let discount;
    let discountDiv = document.getElementById("discountDiv"); // separate div created to hide or show discount fields depending on whether or not discount is applied
    let none = document.getElementById("none").checked;
    let AAA = document.getElementById("AAA/Senior").checked;
    let military = document.getElementById("military").checked;
    let subtotal = (costPerNight * numberOfNights).toFixed(2);

    let displayRoomCost = document.getElementById("displayRoomCost");
    displayRoomCost.innerHTML = "Room Cost: $" + subtotal;

    // determines which discount is applied if any
    if (none) {
        discountDiv.style.display = "none";
    }
    else {
        discountDiv.style.display = "block";
    }

    if (AAA) {
        discount = "10%";
        subtotal = (subtotal * .90).toFixed(2);
    }
    else if (military) {
        discount = "20%";
        subtotal = (subtotal * .80).toFixed(2);
    }

    //gets total price and how much tax is to be paid
    let total = (subtotal * 1.12).toFixed(2);
    let tax = (Number(subtotal) * .12).toFixed(2)


    let displayDiscount = document.getElementById("displayDiscount");
    let displayDiscountedPrice = document.getElementById("displayDiscountedPrice");
    let displayTax = document.getElementById("displayTax");
    let displayTotalCost = document.getElementById("displayTotalCost");
    
    //displays totals in their respective places
    displayDiscount.innerHTML = "Discount: " + discount;
    displayDiscountedPrice.innerHTML = "Discounted Price: $" + subtotal;
    displayTax.innerHTML = "Tax: $" + tax;
    displayTotalCost.innerHTML = "Total Cost: $" + total;

    //gets and adds number of occupants
    let adults = Number(document.getElementById("adultsField").value);
    let children = Number(document.getElementById("childrenField").value);
    let occupants = adults + children;

    //prints error message if party is too large for selected room
    if ((queen && (occupants > 5)) || (king && (occupants > 2)) || (twoBed && (occupants > 6))) {
        document.getElementById("displayTotalsDiv").style.display = "none";
        document.getElementById("tooMany").innerHTML = "The room you selected will not hold your party";
    }
    //prints error message if more than 28 days is selected or less than one day is selected
    else if (numberOfNights > 28 || numberOfNights < 1) {
        document.getElementById("displayTotalsDiv").style.display = "none";
        document.getElementById("tooMany").innerHTML = "Please enter a number of days between 0 and 28";
    }

}
