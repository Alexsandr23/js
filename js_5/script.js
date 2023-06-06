//Confirms
const arrAnswer = [
    confirm("Питання 1"),
    confirm("Питання 2"),
    confirm("Питання 3")
];
console.log(arrAnswer);

// Prompts
const arrPrompts = [];
arrPrompts[0] = prompt("Введіть перше слово або число");
arrPrompts[1] = prompt("Введіть друге слово або число");
arrPrompts[2] = prompt("Введіть трете слово або число");
console.log(arrPrompts);

//Item access
let arrNum = [1, 2, 3];
let index = +prompt("Введіть індекс у масиві");
let resultItemAccess = index && index < arrNum.length ? arrNum[index] : "Ви не ввели індекс або не правельне значення";
alert(resultItemAccess)

// Item change
let newArr = [];
let indexValue = prompt("Введіть індек у масиві та через кому його значення.");
let indexValueCheck = indexValue ? indexValue.split(",") : "";
if (indexValueCheck.length === 2) {
    if (parseInt(indexValueCheck[0])) {
        newArr[indexValueCheck[0]] = indexValueCheck [1];
        alert("Значення змінено");
    } else {
        alert("Введіть правельний індекс");
    }
    
} else {
    alert("Не коректні значення");
}
console.log(newArr);

// Multiply table
const arrTable = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
]
console.log(arrTable[4][2]);

//Multiply table slice
const newArrTable = arrTable.slice(1).map(a => a.slice(1));
console.log(newArrTable);

// IndexOf Word
let line = prompt("Введвть рядок з декілька слів");
let word = prompt("Введіть слово, яке потрібно знайти у рядку");

if (!line || !word) {
    alert("Введіть значення")
} else {  
    let indexLine = line.split(" ").indexOf(word);
    if (indexLine === -1) {
        alert("Такого слова не знайдено")
    } else {
        alert(`Слов "${word}" у рядку ${indexLine + 1}`)
    }   
}

// Reverse
const arrOriginal = [];

for (let i = 0; i < 5; i++) {
    const element = prompt(`Введіть значення ${i +1}`);
    arrOriginal.push(element);
}
console.log(arrOriginal);

const arrReverse = [];

for (; 0 < arrOriginal.length;) {
    const elemArrOriginal = arrOriginal.pop();
    arrReverse.push(elemArrOriginal);
}
console.log(arrReverse);

const arrReverse3 = arrOriginal.slice().reverse();
console.log(arrReverse3)

// Reverse 2
const arrReverse2 = [];
for (; 0 < arrReverse.length;) {
    const elem = arrReverse.shift();
    arrReverse2.unshift(elem);   
}
 console.log(arrReverse2)

// Copy
const copy1 = arrTable.slice();
console.log(copy1);
const copy2 = [...arrTable];
console.log(copy2);

//Deep Copy
const copyDeep = arrTable.map(a => [...a]);
console.log(copyDeep);

//Array Equals
{
    const arr = [1, 2,"d"];
    const arr2 = arr;
    console.log(arr === arr2);
}

// Flat
const arrFlat = [...arrTable[0], ...arrTable[1], ...arrTable[2], ...arrTable[3], ...arrTable[4]];
console.log(arrFlat);
const arrFlat2 = arrTable.flat(); //[...arrTable.flat()]
console.log(arrFlat2);

// Destruct
let text = prompt("Введіть будь-який текст");
let [firstLetter,,,,fivethLetter,,,,ninethLetter] = text;
alert(`Перша літера - ${firstLetter}, П'ята літера - ${fivethLetter}, Дев'ята літера - ${ninethLetter}`);

//Destruct default
let text2 = prompt("Введіть будь-який текст");
let [,secondLetter = "!",,fourthLetter = "!",fivethLetter2 = "!"] = text2;
alert(`Друга літера - ${secondLetter}, Четверта літера - ${fourthLetter}, П'ята літера - ${fivethLetter2}`);

// Multiply table rest
let [,[,...secondArr],[,...threthArr],[,...fourthArr],[,...fivethArr]] = arrTable;
const arrRest = [secondArr,threthArr,fourthArr,fivethArr]
console.log(arrRest);

// For Alert
const arrName = ["John", "Paul", "George", "Ringo"];
for ( const name of arrName) {
    alert(`Привіт ${name}`)
}

// For Select Option
const currencies = ["USD", "EUR", "GBP", "UAH"]
let   str = "<select>"
for (const currency of currencies){
    str += `<option value = ${currency}>${currency}</option>`;
}
str+= "</select>"
document.write(str)

// For Table Horizontal
{
    const names = ["John", "Paul", "George", "Ringo"];
    let   str = "<table style ='border: 1px solid black'>";
    str+= "<tr>"
    for (const name of names){
        str += `<th style ='border: 1px solid black'>${name}</th>`;
    }
    str += "</tr>"
    str+= "</table>";
    document.write(str)
}

// For Table Vertical
{
    const names = ["John", "Paul", "George", "Ringo"]
    let str = "<table style ='border: 1px solid black'>"
    for (const name of names){
        str += `<tr>`;
        str += `<td style ='border: 1px solid black'>${name}</td>`;
        str += `</tr>`;
    }
    str += "</table>";
    document.write(str)
}

// For Table Letters
{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<table style='border-collapse: collapse'>";
        str += `
        <tr>
        <th style ='border: 1px solid black; background-color: grey; padding: 5px'></th>
        <th style ='border: 1px solid black; background-color: grey; padding: 5px'></th>
        <th style ='border: 1px solid black; background-color: grey; padding: 5px'></th>
        </tr>
        `
    for (const currency of currencies){ 
        str += `<tr>`;
    for (const letter of currency){ 
        str += `<td style ='border: 1px solid black;  padding: 5px'>${letter}</td>`;
        }
    str += `</tr>`;
    }
    str+= "</table>";
    document.write(str)
}

// For Multiply Table
{
    let str = `<table style='border-collapse: collapse'>`;
    for ( const [rowIndex, row] of arrTable.entries()) {
        let colorBg = rowIndex % 2 === 0 ? "#00ff00" : "#ff0000";
        str += `<tr style ='background-color: ${colorBg}'>`;
        for (const column of row) {
            str += `<td style = "border: 1px solid black; padding: 5px;">${column}</td>`;
        }
    str += `</tr>`;
    }
    str += `</table>`;
    document.write(str)
}

// Function Capitalize
const capitalize2 = str => {
    let [firstLetter,...nextLetter] = str;
    let result = [...firstLetter.toUpperCase(),...nextLetter.join("").toLowerCase()].join("");  
    return result
}
console.log(capitalize2("cANBerRa"))

const capitalize = str => { 
    return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
}
console.log(capitalize("cANBerRa"))

// Map Capitalize
const capitalizeLine = str => { 
    return str.split(" ").map(word => word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase()).join(" ");  
}
alert(capitalizeLine(prompt("Введіть будь який рядок")));

// Filter Lexics
let inappropriateWords = ["дурак", "козел"];
let strInput =  prompt("Введіть будь який рядок").split(" ");
let filterWords = strInput.filter(word => !inappropriateWords.includes(word.toLowerCase())).join(" ");
console.log(filterWords)

// Beep Lexics
let strInput2 =  prompt("Введіть будь який рядок").split(" ");
let beepWord = strInput2.map(word =>  inappropriateWords.includes(word.toLowerCase()) ? "BEEP" : word  ).join(" ");
console.log(beepWord);

// Reduce HTML
{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<select>"
    str += currencies.reduce( (a,b) =>   a + "<option>" + b + "</option>", "");
    console.log(str)
    str += "</select>"
    document.write(str)
}

//For Brackets Hell Check
{
    const line = prompt("Введіть будь-яким парними дужками")
    const bracketsStack = [];
    let i = 0;
    let errorPosition = -1;
    for (const character of line){
    if (character === "[" || character === "(" || character === "{") {
        bracketsStack.push(character);
        } else if (character === "]" || character === ")" || character === "}") {
            const bracketsStackLast = bracketsStack.pop();
            if (
                (character === ']' && bracketsStackLast !== '[') ||
                (character === ')' && bracketsStackLast !== '(') ||
                (character === '}' && bracketsStackLast !== '{')
            ) {
                errorPosition = i;
                break;
            }          
        } 
        i++ 
    } 
    if (bracketsStack.length === 0 && errorPosition === -1) {
        alert('Рядок дужок коректний');
      } else {
        alert(`Помилка в позиції ${errorPosition}`);
      }
    
}