const task = prompt("Введіть назву завдання");
const taskChoice = task ? task.toLowerCase() : "";

if (taskChoice === "number: odd") {
    let num = +prompt('Введіть будь яке число');

    if (isNaN(num) || num === 0) {
        alert("Введено не коректне число");
    } else {
        alert(`Введeне число ${num}`);
    }
    if (num === 0 || isNaN(num)) {
        alert("Введіть число")
    } 
    else if (num % 2 === 0) {
        alert("Число парне!!")
    } else {
        alert("Число не парне!!")
    }
} else if (taskChoice === "string: lexics") {
    let str = prompt("Введіть будь який текст я перевірю на нявність некоректніх слів:");

    if (str.includes("скотиняка") || str.includes("дурак") || str.includes("ідіот")) {
        alert("В вашому тексты є некоректні слова")
    } else {
        alert("З вашим текстом все гаразд.")
    }
} else if (taskChoice === "boolean") {
    let questionUser1 = confirm("Ви вживаете алкоголь?");
        console.log(questionUser1);
} else if (taskChoice === "boolean: if") {
    let questionUser2 = confirm("Ваша стать чоловіча?");
    if (questionUser2) {
        alert("Ви чоловік");
    } else {
        alert("Ви жінка");
    }
} else if (taskChoice === "comparison: sizes") {
    let coverageTilia = +prompt("Введіть охват талії та я визначу ваш міжнародній розмір жіночої білизні:");

    if ( coverageTilia >= 63 && coverageTilia <= 65) {
        alert("Ваш міждународній розмір - XXS");
    } else if (coverageTilia >= 66 && coverageTilia <= 69) {
        alert("Ваш міждународній розмір - XS");
    } else if (coverageTilia >= 70 && coverageTilia <= 74) {
        alert("Ваш міждународній розмір - S");
    } else if (coverageTilia >= 75 && coverageTilia <= 78) {
        alert("Ваш міждународній розмір - M");
    } else if (coverageTilia >= 79 && coverageTilia <= 83) {
        alert("Ваш міждународній розмір - L");
    } else if (coverageTilia >= 84 && coverageTilia <= 89) {
        alert("Ваш міждународній розмір - XL");
    } else if (coverageTilia >= 90 && coverageTilia <= 94) {
        alert("Ваш міждународній розмір - XXL");
    } else if (coverageTilia >= 95 && coverageTilia <= 97) {
        alert("Ваш міждународній розмір - XXXL");
    } else {
        alert("Розмір не знайдено.");
    }
} else if (taskChoice === "ternary") {
    let gander = confirm("Ваша стать чоловіча?") ? alert("Ви чоловік") : alert("Ви жінка");
} else if (taskChoice === "prompt: or") {
    let numAge = +prompt("Введіть свій вік") || alert("Ви не ввелі свій вік");
    let yearBrith = numAge ? alert("Ви " + 2023 - numAge + " року народження") : alert("Введіть ше раз"); 
} else if (taskChoice === "confirm: or this days") {
    let shopingQuestion = confirm("шопінг?") || alert("Ти бяка!");
} else if (taskChoice === "default: or") {
    let name = prompt("Введіть свое ім'я") || "Іван";
    let surname = prompt("Введіть свое прізвище") || "Іванов";
    let middleName = prompt("Введіть свое ім'я побатькові") || "Іванович";
    alert(`Вітаємо ${surname} ${name} ${middleName}`);
} else if (taskChoice === "default: if") {
    let name2 = prompt("Введіть свое ім'я");
    if (!name2) {
        name2 = "Іван";
    }
    let surname2 = prompt("Введіть свое прізвище");
    if(!surname2) {
        surname2 = "Іванов";
    }
    let middleName2 = prompt("Введіть свое ім'я побатькові");
    if (!middleName2) {
        middleName2 = "Іванович";
    }
    alert(`Вітаємо ${surname2} ${name2} ${middleName2}`);
} else if (taskChoice === "login and password") {
    const login = "admin";
    const  password = "qwerty";
    const inputLogin = prompt("Введіть логін");

    if (login === inputLogin) {
        const inputPassword = prompt("Введіть пароль");
        if ( inputPassword === password) {
            alert("Вітаємо!")
        } else {
            alert("Ви ввели не вірній пароль")
        }
    } else {
        alert("Ви ввели не вірній логін")
    }
} else if (taskChoice === "currency exchange") {
    const currency = prompt("Оберіть валюту для обміну(USD, EUR, PLN, GBP)");
    const exchange = confirm(`Ви хочите купити валюту?`);
    let rate;
    if (!currency) {
        alert("Выберіть валюту");
    } else if (currency.toUpperCase() === "USD") {
        rate = exchange ? 37.6 : 37.2;
    } else if (currency.toUpperCase() === "EUR") {
        rate = exchange ? 40.8 : 40.1;
    } else if (currency.toUpperCase() === "PLN") {
        rate = exchange ? 9 : 8.5;
    } else if (currency.toUpperCase() === "GBP") {
        rate = exchange ? 46.9 : 44.2;
    } else {
        alert("Выберіть валюту");
    } 

    const amount = +prompt("Ведіть суму для обміну");
    const result = (exchange ? amount / rate : amount * rate).toFixed(2);
    alert(`Результат обміну  ${result} ${currency}`);
} else if (taskChoice === "scissors") {
    const variantUser = prompt("Зіграй зі мною гру! Введіть камень, ножиці або папір");
    const randomNum = Math.floor(Math.random() * 3);
    const userChoice = variantUser ? variantUser.toLowerCase() : "";

    if (userChoice === "камень" && randomNum === 0 || userChoice === "ножиці" && randomNum === 1 || userChoice === "папір" && randomNum === 2) {
        alert("нічия");
    } else if (userChoice === "камень" && randomNum === 1 || userChoice === "ножиці" && randomNum === 2 || userChoice === "папір" && randomNum === 0) {
        alert("Ви перемогли!!!!");
    } else if (userChoice === "камень" && randomNum === 2 || userChoice === "ножиці" && randomNum === 0 || userChoice === "папір" && randomNum === 1) {
        alert("Я переміг!!! Спробуй ще....");
    } else {
        alert("Вы не правильно ввели. Спробуйте ще...");
    }
} else if (taskChoice === "scissors ternary") {
    const variantUser2 = prompt("Зіграй зі мною гру! Введіть камень, ножиці або папір");
    const randomNum2 = Math.floor(Math.random() * 3);
    const userChoice2 = variantUser2 ? variantUser2.toLowerCase() : "";
    const output =  
    userChoice2 === "камень" && randomNum2 === 0 || 
    userChoice2 === "ножиці" && randomNum2 === 1 || 
    userChoice2 === "папір" && randomNum2 === 2 ? "нічия" 
    : userChoice2 === "камень" && randomNum2 === 1 || 
    userChoice2 === "ножиці" && randomNum2 === 2 || 
    userChoice2 === "папір" && randomNum2 === 0 ? "Ви перемогли!!!!" 
    : userChoice2 === "камень" && randomNum2 === 2 ||
    userChoice2 === "ножиці" && randomNum2 === 0 || 
    userChoice2 === "папір" && randomNum2 === 1 ? "Я переміг!!! Спробуй ще...." : "Вы не правильно ввели. Спробуйте ще...";

    alert(output);
}
else {
    alert("Ввели не правельну назву завдання")
}

