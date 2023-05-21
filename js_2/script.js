// evaluation
var a = 5;
var b, c;
b = (a * 5); // вычесляется выражение (а * 5) и результат присвается переменой b, (b = 25).

// b = (c = b / 2); // происходит двойное присваивание. b / 2 и присваивается переменой с (c = 12.5), потом это значение присваивается b (b = 12.5)
b = (c = (b / 2)); // измененый код 


//age

let age = prompt("Скільки вам років?")
let yearNow = 2023;
let yearOfBirth = yearNow - age;
alert("Ви народилсь " + yearOfBirth + " року!");

// temperature Fahrenheit

let degreesCelsius = prompt("Введіть значення у градусах Целсія: ");
let degreesFahrenheit = Math.ceil(degreesCelsius * 1.8 + 32);
alert("У градусах Фаренгейта буде дорувнюваті: " + degreesFahrenheit + " F");

// temperature Celsius

let tempFahrenheit = prompt("Введіть значення у градусах Фаренгейтах: ");
let tempCelsius = Math.ceil((tempFahrenheit - 32) / 1.8);
alert("У градусах Целсія буде дорувнюваті: " + tempCelsius + " C");

// divide

let firstNum = prompt("Введіть перше число: ");
let secondNum = prompt("Введіть друге число: ");
let resultDivison = Math.floor(firstNum / secondNum);

if (isNaN(firstNum) || isNaN(secondNum)) {
    alert("Введіть числові значення!");
} else {
    alert("Результат цілочисленого ділення: " + resultDivison);
}

// currency

const rate = 36.95;
let hryvnia = prompt("Ведіть суму у гривні для обміну на долари: ");
let resultExchange = (hryvnia / rate).toFixed(2)
alert(`Peзультат обміну ${hryvnia} грн. у долари становить ${resultExchange} $`)


// RGB

const redColor = Number(prompt("Введить число від 0 до 255 для червоного кольору: ")).toString(16);
const greenColor = Number(prompt("Введить число від 0 до 255 для зеленого кольору: ")).toString(16);
const blueColor = Number(prompt("Введить число від 0 до 255 для синього кольору: ")).toString(16);
alert(`Результат кольору у шістнадцятковій системі числення: #${redColor}${greenColor}${blueColor}`)


// flats

let totalFloor = prompt("Введіть кількість поверхів у будинку: ");
let flatsPerFloor = prompt("Введить кількість квартир на поверсі: ");
let numFlat = prompt("Введіть номер квартири: ");

let entrance = Math.ceil(numFlat / (totalFloor * flatsPerFloor));
let floor = Math.ceil((numFlat % (totalFloor * flatsPerFloor)) / flatsPerFloor);

alert(`Квартира номер ${numFlat} знаходится у ${entrance} підїзді на ${floor} поверсі.`);