// blocks
let a = 10 //100 
{
    let b = 20 //21 //521 //1000
    {
        let c = 30
        //які тут будуть значення змінних a - 10, b - 20, c - 30, d (is not defined)     
        b++
        a *= 10 
    }
    {
        let c = 50
        //які тут будуть значення змінних a - 100, b - 21, c - 50 , d (is not defined) 
        b += 500
    }
    {
        const a = 100500
        const d = "value"
        //які тут будуть значення змінних a - 100500, b - 521, c, d - value
        {
            let a = -50
            b     = 1000
            //які тут будуть значення змінних a - -50, b - 1000, c(is not defined) , d - value
        }
        //які тут будуть значення змінних a - 100500, b - 1000, c (is not defined) , d - value
    }
    //які тут будуть значення змінних a - 100, b-1000, c(is not defined) , d(is not defined) 
}
//які тут будуть значення змінних a - 100, b(is not defined) , c(is not defined) , d(is not defined) 

// comparison if

let age = + prompt ("Скільки вам років?", "");
if (age < 18) 
    alert("школяр");

else {
    if (age > 18 && age < 30)
        alert("молодь");
    
    else {
        if (age > 30 && age < 45)
            alert("зрілість");
        
        else {
            if (age > 45 && age < 60)
                alert("захід сонця");
            
            else {
                if (age > 60) 
                    alert("як пенсія?");
                
                else 
                    alert("чи кіборг, чи KERNESS");
            }
        }
    }
}

// switch: sizes
let coverageTilia = prompt("Введіть охват талії та я визначу ваш міжнародній розмір жіночої білизні:");

switch (coverageTilia) {
    case "63":
    case "64":
    case "65":
        alert("Ваш міждународній розмір - XXS")
        break;
    
    case "66":
    case "67":
    case "68":
    case "69":
        alert("Ваш міждународній розмір - XS")
        break;
    
    case "70":
    case "71":
    case "72":
    case "73":
    case "74":
        alert("Ваш міждународній розмір - S")
        break;
    
    case "75":
    case "76":
    case "77":
    case "78":
        alert("Ваш міждународній розмір - M")
        break;
    
    case "79":
    case "80":
    case "81":
    case "82":
    case "83":
        alert("Ваш міждународній розмір - L")
        break;
    
    case "84":
    case "85":
    case "86":
    case "87":
    case "88":
    case "89":
        alert("Ваш міждународній розмір - XL")
        break;
    
    case "90":
    case "91":
    case "92":
    case "93":
    case "94":
        alert("Ваш міждународній розмір - XXL")
        break;
    
    case "95":
    case "96":
    case "97":
        alert("Ваш міждународній розмір - XXXL")
        break;
    
    default: alert("Розмір не знайдено.");
}

// switch: if

let color = prompt("Введіть колір","");

if  (color === "red") {
    document.write("<div style='background-color: red;'>червоний</div>")
    document.write("<div style='background-color: black; color: white;'>чорний</div>")
} else if (color === "black") {
    document.write("<div style='background-color: black; color: white;'>чорний</div>")
} else if (color === "blue") {
    document.write("<div style='background-color: blue;'>синій</div>")
    document.write("<div style='background-color: green;'>зелений</div>")
} else if (color === "green") {
    document.write("<div style='background-color: green;'>зелений</div>")
} else {
    document.write("<div style='background-color: gray;'>Я не зрозумів</div>")
}

// noswitch

const noSwitch = (key, cases, defaultKey='default') => {
    if (key in cases) {
        cases[key]()
    } else {
        cases[defaultKey]()
    }
}
 
const drink = prompt("Що ви любите пити")
noSwitch(drink, {
    воду: () => console.log('Найздоровіший вибір!'),
    чай(){
        console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
    },
    "пиво": () => console.log('Добре влітку, та в міру'),
    віскі: function(){
        console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
    },
    default(){
        console.log('шото я не зрозумів')
    }
})

// closure calc

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
        const divElement = document.getElementById("currency-box")
        for (const key in data.rates){
            const btn = document.createElement("button")
            btn.style.margin = "5px"
            btn.innerHTML = key

            btn.onclick = () => {
                const dataUser = + prompt(`Введіть суму в ${key}`)
                if (!dataUser) {
                    return alert("Введіть коректні дані")
                } else {
                    const result = dataUser / data.rates[key]
                    return alert(`${dataUser} ${key} дорівнюе ${result.toFixed(2)} USD`)
                }
                  
            }
            divElement.append(btn)
        }      
})

// closure calc 2

fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {     
            const selectFrom = document.getElementById("form")
            const selectTo = document.getElementById("to")
            const divRate = document.getElementById("rate")
            const inputAmount = document.getElementById("amount")
            const divResult = document.getElementById("result")

            for (const key in data.rates) {
                const option1 = document.createElement("option")
                const option2 = document.createElement("option")
                option1.innerText = key
                option2.innerText = key
                selectFrom.append(option1)
                selectTo.append(option2)
            }

            selectFrom.onchange = () => rate()
            selectTo.onchange = () => rate()

            const rate = () => {
                const fromValue = selectFrom.value
                const toValue = selectTo.value
                const crossCourse = data.rates[toValue] / data.rates[fromValue] 
                divRate.innerHTML = `Кроскурс між валютами: ${crossCourse.toFixed(2)}`
                result ()
            }

            inputAmount.oninput = () => result ()
            
            const result = () => {
                const fromValue = selectFrom.value
                const toValue = selectTo.value
                const crossCourse = data.rates[toValue] / data.rates[fromValue]

                const inputValue = inputAmount.value
                const result = inputValue * crossCourse
                divResult.innerText = `Результат обміну: ${inputValue} ${fromValue} на ${toValue} дорівнюе ${result.toFixed(2)} ${toValue}`
            }

        })

// countries and cities
fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.min.json').then(res => res.json())
     .then(data => {
            const selectCoutries = document.getElementById("countries")
            const selectCities = document.getElementById("cities")
            
            for ( const key in data) {
                const option1 = document.createElement("option")
                option1.innerText = key
                selectCoutries.append(option1)
                
            }
            for (const arrValue of Object.values(data)[0]) {
                const option2 = document.createElement("option")
                option2.innerText = arrValue
                selectCities.append(option2)
            }

            selectCoutries.onchange = () => {
                selectCities.innerHTML = "";
                const coutriesValue = selectCoutries.value
                for (const arrValue of data[coutriesValue]) {
                    const option2 = document.createElement("option")
                    option2.innerText = arrValue
                    selectCities.append(option2)
                }
            }
            console.log(data)
         })