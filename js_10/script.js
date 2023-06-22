// Arrow to Functions

//age
function age () {
    let age = prompt("Скільки вам років?")
    let yearNow = 2023;
    let yearOfBirth = yearNow - age;
    return alert("Ви народилсь " + yearOfBirth + " року!");
}

//word count

function wordCount () {
    let str = prompt("Введіть будь який рядок, я підрахую кількість слів у ньому.").split(" ").length;
    return alert(`${str} слів у цьому речені.`);
}


//For Brackets Hell Check

function bracketsCheck (line) {
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
       return alert('Рядок дужок коректний');
      } else {
        return alert(`Помилка в позиції ${errorPosition}`);
      }
    
}

// Form
    const car = {
        "Name":"chevrolet chevelle malibu",
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Origin":"USA",
        "in_production": false
    } 

function madeForm (obj) {

    let str ="<form>";
    for(const [key,value] of Object.entries(car)) {
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

// // chess
function chessBoard (row,column) {
    let strChess = ""
    for (i = 1; i <= row; i++) {
        for (j = 1; j <= column; j++) {
            if ((i + j) % 2 !== 0) {
                strChess += "#"
            } else {
                strChess += "."
            }
        }
        strChess += "\n"
    }
    return strChess
}

console.log(chessBoard(20,15))

// createPerson
{
    const createPerson =  (name,surname) => ({name,surname,getFullName})
    function getFullName () {
        let fatherName = this.fatherName || ""
        return `${this.surname} ${this.name}  ${fatherName}`
    }
    const a = createPerson("Вася", "Пупкін")
    const b = createPerson("Ганна", "Іванова")
    const c = createPerson("Єлизавета", "Петрова")

    console.log(a,b,c)
    console.log(a.getFullName()) 
    a.fatherName = 'Іванович'    
    console.log(a.getFullName())
    console.log(b.getFullName())
}


// createPersonClosure 
{
    const createPersonClosure = (name,surname) => {
        let fatherName,age
        const getName = () => name
        const getSurname = () => surname
        const getFatherName = () => fatherName
        const getAge = () => age
        const getFullName = () => (name ? name : "") + (fatherName ? " " + fatherName : "") + (surname ? " " + surname : "")
        
        const setName = (newName) => name = newName
        const setSurname = (newSurname) => surname = newSurname
        const setFatherName = (newFatherName) => fatherName = newFatherName
        const setAge = (newAge) => {
            if (checkNewAge(newAge)) age = newAge
            function checkNewAge (newAge) {
                return typeof newAge === "number" && newAge >= 0 && newAge <= 100 
            }
        } 
        const setFullName = (value) => { 
            const arr = value.trim().split(" ")
            if (arr.length >= 2 && arr.length <= 3) {
                const [surname,name,fatherName = "не вказано"] = arr.map(x => x[0].toUpperCase() + x.slice(1).toLowerCase())
                setName(name)
                setFatherName(fatherName)
                setSurname(surname)
            } 
        }
        return {
            name,
            surname,
            fatherName,
            age,
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName
        }
    }
    
    const a = createPersonClosure("Вася", "Пупкін")
    console.log(a)
    const b = createPersonClosure("Ганна", "Іванова")
    console.log(a.getName())
    console.log(a.getFullName())
    a.setAge(15)
    a.setAge(150)
    console.log(a.getAge())
    b.setFullName("Петрова Ганна Миколаївна")
    console.log(b.getFatherName()) 
}

// createPersonClosureDestruct

function createPersonClosureDestruct ({name = "не вказано", surname = "не вказано", fatherName = "не вказано", age = 0, getName, getSurname, getFatherName, getAge, getFullName, setName, setSurname, setFatherName, setAge,setFullName}={}) {
    return {
        name,
        surname, 
        fatherName, 
        age,
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName,
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName
    }
}
const a1 = createPersonClosureDestruct(createPersonClosure("Вася Пупкін"))
console.log(a1)
const b1 = createPersonClosureDestruct({name: 'Миколай', age: 75})
console.log(b1)

// isSorted
  const isSorted = (...params) => {
    for (let i = 0; i < params.length; i++) {
        if (params[i] > params[i + 1] || typeof params[i] !== "number") {
            return false
        }
    }
    return true
  }

  console.log(isSorted(1,2,3,4,5,6))
  console.log(isSorted(1,2,3,8,5,6))
  console.log(isSorted(2,3,4,5,6,"we"))
  console.log(isSorted())
  

// //   Test isSorted

const isSortedTest = () => {
    const params = []
    let value
    while(value = prompt("Введіть дані, які потряплять в масив")) {
        params.push(Number(value))
    }
    console.log(params)
    for (let i = 0; i < params.length; i++) {
        if (params[i] > params[i + 1] || isNaN(params[i])) {
            return false
        }
    }
    return true
  }

  console.log(isSortedTest())

// personForm
const b = createPersonClosure("Ганна", "Іванова")
b.setAge(15)
b.setFullName("Петрова Ганна Миколаївна")

function personForm (perent,person) {
    const inputName = document.createElement("input")
    const inputSurname = document.createElement("input")
    const inputFatherName = document.createElement("input")
    const inputAge = document.createElement("input")
    const inputFullName = document.createElement("input")

    inputName.value = person.getName()
    inputSurname.value = person.getSurname()
    inputFatherName.value = person.getFatherName()
    inputAge.value = person.getAge()
    inputFullName.value = person.getFullName()
    
    inputName.oninput = () => {
        person.setName(inputName.value)
        inputFullName.value = person.getFullName()
    }
    inputSurname.oninput = () => {
        person.setSurname(inputSurname.value)
        inputFullName.value = person.getFullName()        
    }
    inputFatherName.oninput = () => {
        person.setFatherName(inputFatherName.value)
        inputFullName.value = person.getFullName()
    }
    inputAge.oninput = () => person.setAge(inputAge.value) 
    
    inputFullName.oninput = () => {
        person.setFullName(inputFullName.value)
        inputName.value = person.getName()
        inputFatherName.value = person.getFatherName()
        inputSurname.value = person.getSurname()
    }

    perent.prepend(inputFullName)
    perent.prepend(inputAge)
    perent.prepend(inputSurname)
    perent.prepend(inputFatherName)
    perent.prepend(inputName)
    
}

personForm(document.body,b)
