// // Person Constructor
// {
//     function Person (name,surname) {
//         this.name = name
//         this.surname = surname

//         this.getFullName = function () {
//         let fatherName = this.fatherName || ""
//         return `${surname} ${name}  ${fatherName}`
//         }
//     }
//     const a = new Person("Вася", "Пупкін")
//     const b = new Person("Ганна", "Іванова")
//     const c = new Person("Єлизавета", "Петрова")
    
//     console.log(a.getFullName()) // Василь Пупкін
//     a.fatherName = 'Іванович' // Василь Іванович Пупкін
//     console.log(a.getFullName())
//     console.log(b.getFullName()) // Ганна Іванова
// }


// // Person Prototype

// {
//     function Person (name, surname) {
//         this.name = name
//         this.surname = surname
//     }
    
//     Person.prototype.getFullName = function () {
//         let fatherName = this.fatherName || ""
//         return `${this.name} ${fatherName} ${this.surname} `
//     }
    
//     const a = new Person("Вася", "Пупкін")
//     const b = new Person("Ганна", "Іванова")
//     const c = new Person("Єлизавета", "Петрова")
    
//     console.log(a.getFullName()) // Василь Пупкін
//     a.fatherName = 'Іванович' // Василь Іванович Пупкін
//     console.log(a.getFullName())
//     console.log(b.getFullName()) // Ганна Іванова
// }

// // Store

// function Store(reducer) {
//     let state = reducer (undefined, {})
//     let cbs = []

//     this.getState = function () {
//         return state
//     }
//     this.subscribe = function (cb) {
//         cbs.push(cb)
//         return function () {
//             cbs = cbs.filter(c => c !== cb)
//         }
//     }

//     this.dispatch = function (action) {
//         const newState = reducer(state, action)
//         if(newState !== state) {
//             state = newState
//             for (let cb of cbs) cb()
//         }
//     }
// }

// const store = new Store(reducer)

// Password

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

function PasswordVerify (parent) {
    const form = document.createElement("form")
    parent.append(form)

    const loginForm = new LoginForm(form)

    const inputCheck = document.createElement("input")
    inputCheck.type = "text"

    const password = loginForm.password()
    let isOpen = password.getOpen()
    password.onOpenChange = function (open) {
       isOpen = open 
       createInputChecked ()
    }
   
    // password.onChange = () => { // если comparePasswords() запускать при изменения пароля она перезаписывает 
        // comparePasswords() // btnState () и кнопка не становится активной много чего пробывал получалось хреново 
    // } 

    inputCheck.oninput =  () => {
        comparePasswords()
    }
    
    const comparePasswords = () => {
        const passwordValue = password.getValue()
        const confirmPasswordValue = inputCheck.value
        
        if (passwordValue === "" && confirmPasswordValue === "" ) {
            password.setStyle({border: ""})
            inputCheck.style.border = ""
        } else if ( passwordValue !== confirmPasswordValue && !password.getOpen()) {
            password.setStyle({border: "solid red"})
            inputCheck.style.border = "solid red"
        } else if (!password.getOpen()) {
            password.setStyle({border: "solid green"})
            inputCheck.style.border = "solid green"
        }
    }

    function createInputChecked () {
        if (isOpen) {
            inputCheck.remove()
            password.setStyle({border: ""})
        } else {
            form.children[1].insertAdjacentElement('afterend', inputCheck)
            comparePasswords()
        }
    } 
    createInputChecked ()
}

const passwordVerify = new PasswordVerify (document.body)
