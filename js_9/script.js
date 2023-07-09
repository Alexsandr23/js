// while confirm
while (!confirm("Так чи ні")) {
    alert("Ще раз?")
}

// array fill
const arr = []
let value
while(value = prompt("Введіть дані, які потряплять в масив")) {
    arr.push(value)
}
console.log(arr)

// array fill nopush
{
    const arr2 = []
    let value2
    let i = 0
    while(value2 = prompt("Введіть дані, які потряплять в масив")) {
        arr2[i] = value2
        i++
    }
    console.log(arr2)
}
// infinite probability

let i = 1
while(true) {
    if(Math.random() > 0.9) {
        break
    }
    i++
}
alert(`Кількість ітерацій - ${i}`)

// empty loop
let text
while(text = prompt("Зробіть щось")){
    ;
}
console.log(text)

// progression sum
let result = 0
for (let i = 1; i <= 100; i += 3) {
    result += i
}
console.log(result)

// chess one line

const strLength = 6
let str = ""
for(i = 1; i <= strLength; i++) str += i % 2 === 0 ? "#" : " "
console.log(str, str.length)

// numbers
{
    let str = ""
    for (i = 0; i <= 9; i++){
        for (j = 0; j <= 9; j++){
          str += j 
        }
        str += "\n"
    }
    console.log(str)
}

// chess
const chessBoard = (row,column) => {
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

// cubes
const arrNumCube = []
let userText = +prompt("Введіть кількість елементів")

for (i = 0; i < userText; i++) {
    arrNumCube.push(i ** 3)
}

console.log(arrNumCube)

// multiply table

const multiplyTable = []
for (i = 0; i < 10; i++) {
    multiplyTable[i] = []
    for (j = 0; j < 10; j++) {
        multiplyTable[i].push(i * j) 
    }
}
console.log(multiplyTable)

// read array of objects

const readArrayOfObjects = () => {
    const arrayOfObjects = []
    
    while (true) {
        const obj = {}
        while(input) {
            const key = prompt("Введіть ключ")
            if (key === null) {
                input = false
                break
            }
            const value = prompt("Введіть значення")
            if (value === null) {
                input = false
                break
            }
            obj[key] = value
        }
        arrayOfObjects.push(obj)
        const questionUser = confirm("Хочите ще один об'єкт додати")
        if (!questionUser) {
            break
        } 
    }
    return arrayOfObjects
}

console.log(readArrayOfObjects())

// Ромбік

const makeDiamound = (size) => {
    size /= 2
    size = Math.ceil(size)
    let strDiamound = ""
    for (let i = 1; i <= size; i++) {
        for(let j = 1; j <= size - i; j++) {
            strDiamound += "."
        }
        for (let n = 1; n <= 2 * i - 1; n++) {
            strDiamound += "#"
        }
        for (let k = 1; k <= size - i; k++) {
            strDiamound += "."
        }
        strDiamound += "\n"
    }
    for(let i = size - 1; i >= 1; i--) {
        for(let j = 1; j <= size - i; j++) {
            strDiamound += "."
        }
        for (let n = 1; n <= 2 * i - 1; n++) {
            strDiamound += "#"
        }
        for (let k = 1; k <= size - i; k++) {
            strDiamound += "."
        }
        strDiamound += "\n"
    }
    return strDiamound
}

console.log(makeDiamound(11))

// DOM: multiply table DOM: highlight cell
    
const table = document.createElement("table")
document.body.prepend(table)
for (i = 1; i <= 9; i++) {
    const tr = document.createElement("tr")
    table.append(tr)
    for (j = 1; j <= 9; j++) {
        const td = document.createElement("td")
        
        td.style.padding = "5px"
        td.style.border = "solid 1px black"
        td.innerText = i * j
        const closure = (elem) => {
            elem.addEventListener("mouseover", () => {
                td.style.backgroundColor = "red"               
            })
            elem.addEventListener("mouseout", () => {
                td.style.backgroundColor = ""
            })
        }
        closure(td)
        tr.append(td) 
         
    }
}

// DOM: Highlight cross

{
    const table = document.createElement("table")
    document.body.prepend(table)

    for (let i = 1; i <= 9; i++) {
        const tr = document.createElement("tr")
        table.append(tr)

        for (let j = 1; j <= 9; j++) {
            const td = document.createElement("td")
            
            td.style.padding = "5px"
            td.style.border = "solid 1px black"
            td.innerText = i * j
            
            td.addEventListener("mouseover", () => {
                tr.style.backgroundColor = "red"
                for(let n = 0; n < table.rows.length; n++) {
                    table.rows[n].cells[j - 1].style.backgroundColor = "red"
                }
            })
            
            td.addEventListener("mouseout", () => {
                tr.style.backgroundColor = ""
                    for(let n = 0; n < table.rows.length; n++) {
                        table.rows[n].cells[j-1].style.backgroundColor = ""
                }
            })
            
            
            tr.append(td) 
        }
    }

   
}