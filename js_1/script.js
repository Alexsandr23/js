// Calc converter dollar
let hryvniaSum = prompt("Введіть суму у гривні: ");
let exchangerRateDollar = prompt("Введіть обміний курс долару: ");


if (isNaN(hryvniaSum) || isNaN(exchangerRateDollar)) {
    alert("Введені некоректні дані. Повторіть спробу !!!!")
} else {
    alert(hryvniaSum / exchangerRateDollar + " $")
}

// form
const credentials = {
    login: 'admin',
    password: 'qwerty',
};

let btn = document.getElementById("btn");

btn.onclick = function() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if (credentials.login === login && credentials.password === password) {
        document.getElementById("blockGreen").style.display = "block";
    } else {
        document.getElementById("blockRed").style.display = "block";
    }
}


 
        
        
        

