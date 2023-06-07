// Temperature
const tempCelsius = tempFahrenheit => Math.round((tempFahrenheit - 32) / 1.8);

// RGB
const rgb = (r,g,b) => {
    let red = r <= 15 ? "0" + r.toString(16) : r.toString(16);
    let green = g <= 15 ? "0" + g.toString(16) : g.toString(16);
    let blue= b <= 15 ? "0" + b.toString(16) : b.toString(16);
    let result = `#${red}${green}${blue}`;
    return result
}
console.log (rgb(15,1,255));

// Flats
const searchFlat = (totalFloor,flatsPerFloor,numFlat) => {
    let entrance = Math.ceil(numFlat / (totalFloor * flatsPerFloor));
    let floor = Math.ceil((numFlat % (totalFloor * flatsPerFloor)) / flatsPerFloor);
    return {entrance,floor}
}
console.log(searchFlat(9,4,16))

// Credentials

const askPerson = () => {

    const capitalize = str => { 
        return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
    }

    let ask1 = prompt(`Введіть своє ім'я.`);
    let name = ask1 ? capitalize(ask1.trim()) : "";
    let ask2 = prompt(`Введіть свою прізвище.`);
    let surname= ask2 ? capitalize(ask2.trim()): "";
    let ask3 = prompt(`Введіть своє ім'я по батькові.`);
    let fatherName = ask3 ? capitalize(ask3.trim()) : "";
    
    let fullName = `${surname} ${name} ${fatherName}`; 

    return {name, surname, fatherName, fullName}
}
console.log(askPerson())

// New line

const rowTransfer = line => line.split("\\n").join("\n");
console.log(rowTransfer("wqwq  qwewqe \n asdasasd\n asdasdsad\\n"));

// Prompt OR

const promptOr = (promptText, defaultValue)  => prompt(promptText) || alert(defaultValue);
promptOr("Введіть свій вік","Ваш вік 0, як ви не коректно ввели данні" );

// Login And Password
 const dataCheck = (login, password) => {
    let loginUser = prompt("Введіть логін");
    if (login === loginUser) {
        let passwordUser = prompt("Введіть пароль");
        if ( passwordUser === password) {
            alert("Вітаємо!")
        } else {
            alert("Ви ввели не вірній пароль")
            }
    } else {
        alert("Ви ввели не вірній логін")
    }
 } 
 dataCheck("admin","qwerty")

// For Table 

const makeTable = arr => {
    let str = `<table style='border-collapse: collapse'>`;
    for ( const [rowIndex, row] of arr.entries()) {
        let colorBg = rowIndex % 2 === 0 ? "#00ff00" : "#ff0000";
        str += `<tr style ='background-color: ${colorBg}'>`;
        for (const column of row) {
            str += `<td style = "border: 1px solid black; padding: 5px;">${column}</td>`;
        }
        str += `</tr>`;
        }
        str += `</table>`;
    return document.write(str)
}
makeTable([
    [0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4],
    [0, 2, 4, 6, 8],
    [0, 3, 6, 9, 12],
    [0, 4, 8, 12, 16]
])

// Filter Lexics

const filterLexics = (rowOfWords,arrIncorrectWords) => rowOfWords.split(" ").filter(word => !arrIncorrectWords.includes(word.toLowerCase())).join(" ");
console.log(filterLexics('сам пошел бляха век віава вав ва муха ів',['бляха', 'муха', "пляшка", "шабля"]))

// Currency Table
{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        let dataArr = [Object.keys(data.rates), Object.values(data.rates)];
        makeTable(dataArr)
    })
    
}

// Form
 const makeForm = obj => {
    let str ="<form>";
    for(const [key,value] of Object.entries(obj)) {
        let type;
        let checked;
        if(typeof value === "number" ){
            type = "number";
        } else if (typeof value === "string" ) {
            type = "text";
        } else if (typeof value === "boolean" ) {
            type = "checkbox";
            if(value) {
                checked = "checked";
            }
            
        }
        str += `<label>${key}<input type = ${type} ${checked} value = ${value}></label>`
    }

    str += "</form>";
    return document.write(str)
 }

 const car = {
    "Name":"chevrolet chevelle malibu",
    "Cylinders":8,
    "Displacement":307,
    "Horsepower":130,
    "Weight_in_lbs":3504,
    "Origin":"USA",
    "in_production": true,
} 
 makeForm(car)

// Array of objects sort
var persons = [
    {name: "Іван", age: 17},
    {name: "Марія", age: 35},
    {name: "Олексій", age: 73},
    {name: "Яків", age: 12},
]

const sort = (arr, nameKey, boolean = true) => {
    let objKey = []
    for (const obj of arr) {
        for(const key in obj) {
            objKey.push(key)
        }
    }
   
    if(!arr || !nameKey) {
        return "задайте правельні параметри";
    } else if (!objKey.includes(nameKey)) {
        return "Ключ не знайдено";
    }

    arr.sort((a,b) => {
        if(boolean) {
            return  a[nameKey] > b[nameKey] ? 1 : -1;
    } else {
        return  a[nameKey] > b[nameKey] ? -1 : 1;
    }
    })

    return arr;
}

console.log(sort(persons, "name", ));

// Table

const makeTableSort = (arr,key,boolean = true) => {
    let arrObj = arr.slice();
    sort(arrObj, key, boolean);

    const foundKey = [];
    for ( const obj of arrObj) {
        for (const key in obj) {
            if(!foundKey.includes(key)) {
                foundKey.push(key);
            }
        }
    }
    
    let str = "<table style = 'border-collapse: collapse'><tr>";
    for ( const value of foundKey) {
        str += `<th style ='border: 1px solid black; background-color: grey; padding: 8px'>${value}</th>`
    }
    str += "</tr>"
    
    for (const obj of arrObj) {
        str += "<tr>";
        for (const key of foundKey) {
            const rowValue = obj[key] || "";
            str += `<td style ='border: 1px solid black; padding: 8px'>${rowValue}</td>`;
        }
        str += "</tr>";
    }
    str += "</table>";
    return document.write(str)
}


const persons2 = [
    {
        name: 'Марія',
        fatherName: 'Іванівна',
        surname: 'Іванова',
        sex: 'female'
    },
    {
        name: 'Миколай',
        fatherName: 'Іванович',
        surname: 'Іванов',
        age: 15
    },
    {
        name: 'Петро',
        fatherName: 'Іванович',
        surname: 'Іванов',
        married: true
    },
]
// makeTableSort(persons2, "name")

// Divide
const calcResult = () => {
    if(!firstNumber.value || !secondNumber.value) {
        divisionResult.innerHTML = "Націло не ділиця або не коректно введені данні" 
    } else {
        divisionResult.innerHTML = "Результат ділення націло - " + Math.floor(firstNumber.value / secondNumber.value);
    }
}
firstNumber.oninput = secondNumber.oninput = calcResult

// Calc Func

const conversionOfLength = (input1, input2) => {
    const sum = input1 + input2;
    const subtracting = input1 - input2;
    const multiplication  = input1 * input2;
    const division = input1 / input2;
    const result = {
        sum,
        subtracting,
        multiplication,
        division
    };

    return result
     
}

// Calc Live
const transactionResult = () => {
    const num1Parse = num1 ? parseFloat(num1.value) : "";
    const num2Parse = num2 ? parseFloat(num2.value) : "";

    const result = conversionOfLength(num1Parse,num2Parse);
    if ( !num1Parse || !num2Parse) {
        resultOutput.innerHTML = "Введіть коректно числа";
    } else {
        resultOutput.innerHTML = `
        <p>Результат додавання - ${result.sum}</p>
        <p>Результат віднівання - ${result.subtracting} </p>
        <p>Результат множення - ${result.multiplication}</p>
        <p>Результат ділення - ${result.division} </p>
        `
    }
}
num1.oninput = num2.oninput = transactionResult
