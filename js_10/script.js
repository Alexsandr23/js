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
{
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
}


// chess
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

    const createPersonClosure = (name,surname) => {
        let fatherName,age
        const getName = () => name
        const getSurname = () => surname
        const getFatherName = () => fatherName
        const getAge = () => age
        const getFullName = () => (name ? name : "") + (fatherName ? " " + fatherName : "") + (surname ? " " + surname : "")
        
        const setName = (newName) => {
            if (newName && typeof newName === "string") {
                 name = newName
            }
           return name
        } 
        const setSurname = (newSurname) => {
            if (newSurname && typeof newSurname === "string") {
                surname = newSurname
            }
           return surname
        } 
        const setFatherName = (newFatherName) => {
            if (newFatherName && typeof newFatherName === "string") {
                fatherName = newFatherName
            }
           return fatherName
        } 
        const setAge = (newAge) => {
            newAge = +newAge
            if (newAge && newAge >= 0 && newAge <= 100 ) {
                age = newAge
            }
            return age
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
    const b2 = createPersonClosure("Ганна", "Іванова")
    console.log(a.getName())
    console.log(a.getFullName())
    a.setAge(15)
    a.setAge(150)
    console.log(a.getAge())
    b2.setFullName("Петрова Ганна Миколаївна")
    console.log(b2.getFatherName()) 


 // createPersonClosureDestruct

function createPersonClosureDestruct ({name, surname, fatherName = "", age = 0}) {
    let validatedName = validateName(name) ? name : ''
    let validatedSurname = validateName(surname) ? surname : ''
    let validatedFatherName = validateName(fatherName) ? fatherName : ''
    let validatedAge = validateAge(age) ? age : 0
    
    function validateName(value) {
        return typeof value === "string" && /^[A-Z][a-z]*$/.test(value)
      }
    
      function validateAge(value) {
        return typeof value === "number" && value >= 0 && value <= 100
      }
    
    const getName = () => validatedName
    const getSurname = () => validatedSurname
    const getFatherName = () => validatedFatherName
    const getAge = () => validatedAge
    const getFullName = () => `${validatedSurname} ${validatedName} ${validatedFatherName}`
    
    function setName(newName) {
        if (validateName(newName)) {
          validatedName = newName
        }
        return validatedName
      }
    
      function setSurname(newSurname) {
        if (validateName(newSurname)) {
          validatedSurname = newSurname
        }
        return validatedSurname
      }
    
      function setFatherName(newFatherName) {
        if (validateName(newFatherName)) {
          validatedFatherName = newFatherName
        }
        return validatedFatherName
      }
    
      function setAge(newAge) {
        if (validateAge(newAge)) {
          validatedAge = newAge
        }
        return validatedAge
      }
    
      function setFullName(fullName) {
        const parts = fullName.split(' ')
        if (parts.length === 3 && validateName(parts[0]) && validateName(parts[1]) && validateName(parts[2])) {
          validatedSurname = parts[0]
          validatedName = parts[1]
          validatedFatherName = parts[2]
        }
        return `${validatedSurname} ${validatedName} ${validatedFatherName}`
      }

    return {
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
  

//   Test isSorted

const isSortedTest = () => {
    const params = []
    let value
    while(value = prompt("Введіть дані, які потряплять в масив")) {
        params.push(Number(value))
    }

    const sorted = isSorted(...params)
    return sorted
}

  console.log(isSortedTest())

// personForm
// const b = createPersonClosure("Ганна", "Іванова")
// b.setAge(15)
// b.setFullName("Петрова Ганна Миколаївна")

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

// personForm(document.body,b)

// getSetForm
let car
{
    let brand = 'BMW', model = 'X5', volume = 2.4
    car = {
        getBrand(){
            return brand
        },
        setBrand(newBrand){
            if (newBrand && typeof newBrand === 'string'){
                brand = newBrand
            }
            return brand
        },
        
        getModel(){
            return model
        },
        setModel(newModel){
            if (newModel && typeof newModel === 'string'){
                model = newModel
            }
            return model
        },
        
        getVolume(){
            return volume
        },
        setVolume(newVolume){
            newVolume = +newVolume
            if (newVolume && newVolume > 0 && newVolume < 20){
                volume = newVolume
            }
            return volume
        },
        
        getTax(){
            return volume * 100
        }
    }
}

function getSetForm(parent, getSet){
    const inputs = {} // реєстр
    console.log(inputs)
    
    const updateInputs = () => { 
        for (const key in inputs) {
            const getValue = getSet["get" + key] // получаю метод get
            if (typeof getValue === "function") { // проверка 
                const input = inputs[key]
                const value = getValue() // получаю значение 
                input.value = value !== undefined ? value : "" // добавляю значение + проверка 

                if (typeof value === "number") {
                    input.type = "number"
                } else {
                    input.type = "text"
                }
            }
        }
    }
    
    for (const getSetName in getSet) {
        const fieldName = getSetName.slice(3)
        const setKey = `set` + fieldName
        
        if (typeof getSet[getSetName] === "function") {
            if (!inputs[fieldName]) { // Проверяем, существует ли уже поле для данного имени
                const input = document.createElement('input')
                input.placeholder = fieldName
                
                input.addEventListener("change", () => { // с событием "change" меняется при потере фокуса или нажать кнопки
                                                        // если добавлять "input" то полносью в поле вводе не удаляется 
                    const setValue = getSet[setKey] // получаю метод set
                    if (typeof setValue === "function") {
                        if (input.value === "") { // Проверяем, является ли поле пустым
                            input.placeholder = fieldName // Устанавливаем placeholder, если поле пустое
                        } else {
                            setValue(input.value) // установка значения
                        }
                        updateInputs() // обновление полей ввода
                    }
                })
                
                if (!getSet[setKey]) {
                    input.disabled = true
                }

                inputs[fieldName] = input
                parent.append(input)
            } else {
                inputs[fieldName].placeholder = fieldName // Устанавливаем placeholder для существующего поля
            }
        }
    }
    
    updateInputs()
}

getSetForm(document.body, createPersonClosure('Анон', "Анонов"))
getSetForm(document.body, car)
