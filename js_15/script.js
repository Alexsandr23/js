// fetch basic //fetch improved
const startTime = performance.now()
function displayTableJSON ( url, parent=document.body) {
    return fetch(url).then(res => res.json())
        .then(person => {
            const endTime = performance.now();
            console.log(`${endTime - startTime}`)

            const table = document.createElement("table")
            table.style = 'border-collapse: collapse'
           
            for (const [key,value] of Object.entries(person)) {
                const tr = document.createElement("tr")
                const th = document.createElement("th")
                th.style = "border: 1px solid black; padding: 0 5px"
                th.innerText = key
                const td = document.createElement("td")
                td.style = "border: 1px solid black"

                if (Array.isArray(value)) {
                    for (const value2 of value){
                        newPromise(value2).then(data => {
                                const name = Object.values(data)[0]
                                const btn = document.createElement("button")
                                btn.innerText = name
                                td.append(btn)
                                btn.onclick = () => {
                                    divContainer.innerHTML = ""
                                    displayTableJSON(value2, divContainer)
                                }
                        })           
                    }
                } else {
                    if (typeof value === 'string' && value.includes("https://swapi.dev/api/")) {
                        newPromise(value).then(data => {
                            const name = Object.values(data)[0]
                            const btn = document.createElement("button")
                            btn.innerText = name
                            td.append(btn)
                            btn.onclick = () => {
                                divContainer.innerHTML = ""
                                displayTableJSON(value, divContainer)
                            }
                    })     
                    } else {
                        td.innerText = value
                    }
                }              
                tr.append(th)
                tr.append(td)
                table.append(tr)
                
            }
            parent.append(table)
        })
}
const divContainer = document.createElement("div")
document.body.prepend(divContainer)
// displayTableJSON('https://swapi.dev/api/people/1/', divContainer)

function newPromise (url) {
    function executor(resolve,reject) {
        fetch(url).then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    }
    return new Promise(executor)
}

// race
function myFetch() {
    const dely = Math.random() * 1000 + 800
    console.log(dely)
    return new Promise(resolve => {
            setTimeout(() => resolve("myFetch"), dely)
    })        
}
Promise.race([myFetch(),displayTableJSON('https://swapi.dev/api/people/1/')])
    .then((value) => {
        if (value === "myFetch") {
            console.log("Переміг myFetch")
        } else {
            console.log("Запит API перміг")
        }
    })

// Promisify: confirm
function confirmPromise(text){  
    function executor(resolve,reject) {
            const confirm = window.confirm(text)
            if (confirm){
                resolve()
            } else {
                reject()
            }
    }
    return new Promise(executor)     
}
   confirmPromise('Проміси це складно?').then(() => console.log('не так вже й складно'),
                                               () => console.log('respect за посидючість і уважність'))
 //    Promisify: prompt
 function promptPromise(text){
    function executor(resolve,reject) {
        const prompt = window.prompt(text)
        if (prompt === null){
            reject()
        } else {
            resolve(prompt)
        }
}
return new Promise(executor) 
}
promptPromise("Як тебе звуть?").then(name => console.log(`Тебе звуть ${name}`),
                                      () => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))

// Promisify: LoginForm
function Password (parent, open) {
    
    const inputPasaword = document.createElement("input")
    inputPasaword.type = open ? "text" : "password"
    parent.append(inputPasaword)

    const inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    inputCheck.checked = open ? true : false
    parent.append(inputCheck)


    let passwordValue = ""
    let isOpen = open

    this.getValue = function () {
        return passwordValue
    }
    this.setValue = function (value) {
        inputPasaword.value = value
        passwordValue = value
    }

    this.getOpen = function () {
        return isOpen
    }
    this.setOpen = function (checked) {
        isOpen = checked
        inputPasaword.type = checked ? "text" : "password"
        inputCheck.checked = checked
    }
    
    inputPasaword.oninput = () => {
        passwordValue = inputPasaword.value
        if (typeof this.onChange === "function") {
            this.onChange(passwordValue)
        }
    }

    inputCheck.onchange = () => {
        isOpen = inputCheck.checked
        inputPasaword.type = isOpen ? "text" : "password"
        if (typeof this.onOpenChange === "function") {
            this.onOpenChange(isOpen)
        }
    }

    this.setStyle = function (style) {
        return Object.assign(inputPasaword.style,style)
    }
}

function LoginForm (parent) {

    const password = new Password(parent, false)

    const inputLogin = document.createElement("input")
    inputLogin.type = "text"
    parent.append(inputLogin)

    const btnForm = document.createElement("button")
    btnForm.innerText = "Війти"
    btnForm.type = "submit"
    parent.append(btnForm)
    
    let loginValue = ""
    let passwordValue = ""

    this.setValueLogin = function (value) {
        inputLogin.value = value
        return loginValue = value
    }  

    this.getValueLogin = function () {
        return loginValue
    }
    this.getBtnForm = function () {
        return btnForm
    }

    password.onChange = (data) => {
        passwordValue = data
        btnState ()
    }

    inputLogin.oninput = () => {
        loginValue = inputLogin.value
        if (typeof this.onChangeLogin === "function") {
            this.onChangeLogin(loginValue)
        }
        btnState ()
    }

    function btnState () {
        if (loginValue !== "" && passwordValue !== "") {
            btnForm.disabled = false
        } else {
            btnForm.disabled = true
        }
    }
    btnState ()
    
    this.password = function () {
        return password
    }
}


function loginPromise(parent){
    function executor(resolve, reject){// как я понял reject для примера,он нужнен будет чтобы выдавать
        const form = new LoginForm(parent) // ошибку если пасворд или логин не совпадают писать не нужно так как нет ниже catch
        const btnForm = form.getBtnForm()
        btnForm.onclick = () => {
            let login = form.getValueLogin()
            let password = form.password().getValue()
            resolve({login, password})
        }
    }
    return new Promise(executor)
}
loginPromise(document.body).then(({login, password}) => console.log(`Ви ввели ${login} та ${password}`))