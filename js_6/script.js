//Literals,  Literals expand, Literals copy
    const cat = {
        breed: "британец",
        hairtype: "короткошерстный",
        size: "крупный",
        weight: "7кг",
        color: "кремовый",
        [prompt("Введіть властивісь для об'єкту Cat")]: prompt("Введіть для властивості значення")

    }
    const smartPhone = {
        brand: "Apple",
        model: "iPhone 12",
        operatingSystem: "iOS",
        color: "Blu",
        [prompt("Введіть властивісь для об'єкту Smart Phone")]: prompt("Введіть для властивості значення")
    }
    const user = {
        name: "Steve",
        surname: "Kerr",
        age: "45",
        address: {
            country: "USA",
            city: "San Francisco",
            street: "Lombard"
        },
        [prompt("Введіть властивісь для об'єкту User")]: prompt("Введіть для властивості значення")
    }

    const cat2 = {...cat};
    cat2[prompt("Введіть ще одну властивісь для нового об'єкту Cat")] = prompt("Введіть для властивості значення");
    const newKeySmatrPhone = prompt("Введіть ще одну властивісь для нового об'єкту Smart Phone");
    const newValueSmatrPhone = prompt("Введіть для властивості значення");
    const smartPhone2 = {...smartPhone};
    smartPhone2[newKeySmatrPhone] = newValueSmatrPhone;

    console.log(cat)
    console.log(cat2)
    console.log(smartPhone)
    console.log(smartPhone2)
    console.log(user)

// Html tree
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {
                        tagName: "span",
                        children: ["Enter a data please:"],
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                                type: "text",
                                id: "name",
                            },
                    },
                    {
                        tagName: "input",
                        attrs: {
                                type: "text",
                                id: "surname",
                            },
                    },
                ]
            },
            {
                tagName: "div",
                children: [
                    {
                        tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: ["OK"],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: ["Cancel"],
                    }
                ]
            }
        ]
    };

    console.log(body.children[1].children[1].children[0]);
    console.log(body.children[0].children[3].attrs.id);

    // Parent
    body.children[0].parent = body;
    body.children[1].parent = body;
    body.children[0].children[0].parent = body;
    body.children[0].children[1].parent = body;
    body.children[0].children[2].parent = body;
    body.children[0].children[3].parent = body;
    body.children[1].children[0].parent = body;
    body.children[1].children[1].parent = body;

    // Change OK
    body.children[1].children[0].attrs[prompt("Введіть новий атрибут для button")] = prompt("Введіть значення атрибута");
    console.log(body);
    // Destructure
    const {children: [{children: [{children: [spanText]}, {}, {}, {attrs: {id: inputId}}]}, {children: [{}, {children: [buttonText]}]}]} = body;
    console.log(spanText,inputId,buttonText);
    


// Destruct array
{
    let arr = [1,2,3,4,5, "a", "b", "c"];
    const [,,,,,...str] = arr;
    const {0:odd1, 1:even1, 2:odd2, 3:even2, 4:odd3} = arr;
    console.log(odd1, even1, odd2, even2, odd3, str);
}
// Destruct string
{
    let arr = [1, "abc"];
    const {0:number, 1:[s1,s2,s3]} = arr;
    console.log(number,s1,s2,s3);
}
// Destruct 2
{
    let obj = {
        name: 'Ivan',
        surname: 'Petrov',
        children: [
            {
                name: 'Maria'
            },
            {
                name: 'Nikolay'
            }
        ]
    }
    const {children: [{name: name1}, {name: name2}]} = obj;
    console.log(name1,name2);
}
// Destruct 3
{
    let arr = [1,2,3,4, 5,6,7,10];
    const {0:a, 1:b, length} = arr;
    console.log(a,b,length)
}
// Copy delete
{
    const {[prompt("Введіть ключ для вилучення")]:inputUser,...newUser} = user;
    console.log(newUser)
}
// Currency real rate
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
            // получение даных от пользователя
            const currency = prompt("Введіть вхідну валюту (наприклад eur,usd)");
            const currencyChoice = currency ? currency.toLocaleUpperCase() : "";
            const currencyExchange = prompt("Ввeдить валюту, в яку буде відбуватися конвертація");
            const currencyExchangeChoice = currencyExchange ? currencyExchange.toLocaleUpperCase() : "";
            const sum = +prompt("Введіть суму у вхідній валют");

            // Обьект для хранения найденых значения
            const foundValue = {};
            // проверка коректности ввода от пользователя
            if(!currencyChoice || !currencyExchangeChoice || isNaN(sum) || !sum) {
                alert("Введіть коректно дані");
            } else {
                // поиск значение по ключам в обьекте rates
                for(const [key, value] of Object.entries(data.rates)) {
                    if (key === currencyChoice) {
                        foundValue.value1 = value;
                    }
                    if ( key === currencyExchangeChoice) {
                        foundValue.value2 = value;
                    }
                }

                //деструктуризация объект foundValue
                const {value1,value2} = foundValue;

                // проверка на коректность вводимых валют
                if (!value1 || !value2) {
                    alert("Не коректне введеня валюти")
                } else {
                    // вывод обмена валют
                    alert(`Сума обміну - ${((sum / value1) * value2).toFixed(2)} ${currencyExchangeChoice}`)
                }
            }
         })
// Currency drop down
{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
            let str = "<select>";
            for( const currency of Object.keys(data.rates)) {
                str += `<option value = ${currency}> ${currency} </option>`
            }
            str += "</select>";
            document.write(str)
           console.log(Object.keys(data.rates))
        })
}
// Currency table
{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
            let str = "<table style = 'border-collapse: collapse'>";
            str += "<tr><th style ='border: 1px solid black; background-color: grey; padding: 8px'></th>";
            for(const key of Object.keys(data.rates)) {
                str += `<th style ='border: 1px solid black; background-color: grey; padding: 8px'>${key}</th>`;
            }
            str += "</tr>";
            for(const key2 of Object.keys(data.rates)) {
                str += "<tr>"
                str += `<td style ='border: 1px solid black; padding: 8px; font-weight: 900'>${key2}</td>`
                for(const value of Object.values(data.rates)) {
                    const crossCourse = value / data.rates[key2];
                    const fixed = Number.isInteger(crossCourse) ? crossCourse.toString() : crossCourse.toFixed(2);
                    str += `<td style ='border: 1px solid black; padding: 8px'>${fixed}</td>`
                }
                str += "</tr>"
            }
            str +="</table>";
            document.write(str)
        })
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
    document.write(str)
}

// Table 
{
    const persons = [
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
    // Поиск ключей в обьектах и фильтр
    const foundKey = [];
    for ( const obj of persons) {
        for (const key in obj) {
            if(!foundKey.includes(key)) {
                foundKey.push(key);
            }
        }
    }
    // Ряд таблицы с заголовками
    let str = "<table style = 'border-collapse: collapse'><tr>";
    for ( const value of foundKey) {
        str += `<th style ='border: 1px solid black; background-color: grey; padding: 8px'>${value}</th>`
    }
    str += "</tr>"
    // 
    for (const obj of persons) {
        str += "<tr>";
        for (const key of foundKey) {
            const rowValue = obj[key] || "";
            str += `<td style ='border: 1px solid black; padding: 8px'>${rowValue}</td>`;
        }
        str += "</tr>";
    }
    str += "</table>";
    document.write(str)
}

//Тестові дані
{
    const persons = [
        {
           "Name":"chevrolet chevelle malibu",
           "Cylinders":8,
           "Displacement":307,
           "Horsepower":130,
           "Weight_in_lbs":3504,
           "Origin":"USA"
        },
        {
           "Name":"buick skylark 320",
           "Miles_per_Gallon":15,
           "Cylinders":8,
           "Displacement":350,
           "Horsepower":165,
           "Weight_in_lbs":3693,
           "Acceleration":11.5,
           "Year":"1970-01-01",
        },
        {
           "Miles_per_Gallon":18,
           "Cylinders":8,
           "Displacement":318,
           "Horsepower":150,
           "Weight_in_lbs":3436,
           "Year":"1970-01-01",
           "Origin":"USA"
        },
        {
           "Name":"amc rebel sst",
           "Miles_per_Gallon":16,
           "Cylinders":8,
           "Displacement":304,
           "Horsepower":150,
           "Year":"1970-01-01",
           "Origin":"USA"
        },
     ]

         // Поиск ключей в обьектах и фильтр
    const foundKey = [];
    for ( const obj of persons) {
        for (const key in obj) {
            if(!foundKey.includes(key)) {
                foundKey.push(key);
            }
        }
    }
    // Ряд таблицы с заголовками
    let str = "<table style = 'border-collapse: collapse'><tr>";
    for ( const value of foundKey) {
        str += `<th style ='border: 1px solid black; background-color: grey; padding: 8px'>${value}</th>`
    }
    str += "</tr>"
    // 
    for (const obj of persons) {
        str += "<tr>";
        for (const key of foundKey) {
            const rowValue = obj[key] || "";
            str += `<td style ='border: 1px solid black; padding: 8px'>${rowValue}</td>`;
        }
        str += "</tr>";
    }
    str += "</table>";
    document.write(str)
}