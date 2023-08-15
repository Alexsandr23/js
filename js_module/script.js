function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        if (typeof action === 'function'){ //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb(state) //и запускаем подписчиков
        }
    }

    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

function combineReducers(reducers){
    function totalReducer(state={}, action){
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)){
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]){
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length){
            return {...state, ...newTotalState}
        }
        return state
    }

    return totalReducer
}
const wrappedAuthReducer = localStoredReducer(authReducer, 'auth')
const wrappedCartReducer = localStoredReducer(cartReducer, 'cart')

const reducers = {
    promise: promiseReducer, //допилить много имен для многих промисо
    auth: wrappedAuthReducer,     //часть предыдущего ДЗ
    cart: wrappedCartReducer,     //часть предыдущего ДЗ
}

const totalReducer = combineReducers(reducers)

// promiseReducer
function promiseReducer(state={}, {type, status, promiseName, payload, error}){
        if (type === 'PROMISE'){
            return {
            ...state,
            [promiseName]: {status, payload, error}
        }
        }
        return state
    }
    
    const actionPending   = promiseName => ({type: 'PROMISE', status: 'PENDING', promiseName})
    const actionFulfilled = (promiseName, payload) => ({type: 'PROMISE', status: 'FULFILLED', payload, promiseName})
    const actionRejected  = (promiseName, error)   => ({type: 'PROMISE', status: 'REJECTED',  error, promiseName})
    
    const actionPromise = (promiseName, promise) =>
        async dispatch => { 
            dispatch(actionPending(promiseName)) //сигнализируем redux, что промис начался
            try{
                const payload = await promise //ожидаем промиса
                dispatch(actionFulfilled(promiseName, payload)) //сигнализируем redux, что промис успешно выполнен
                return payload //в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
            }
            catch (error){
                dispatch(actionRejected(promiseName, error)) //в случае ошибки - сигнализируем redux, что промис несложился
            }
        }


// проверка токена 
function jwtDecode (token) {
    if (!token) {
        return undefined
    }
    let parts = token.split(".")
    if (parts.length !== 3) {
        return undefined
    }
    const [, identifyingInformation, ] = parts
    try {
        return JSON.parse(atob(identifyingInformation))
    } catch (error) {
        return undefined
    }
}
// authReducer 
function authReducer(state={}, {type, token}){
        const payload = jwtDecode(token)
        if (type === 'AUTH_LOGIN' && payload){
            return {
                ...state,
                token,
                payload,
            }
        } else if (type === 'AUTH_LOGOUT') {
            return {}
        }
        return state
    }

const actionAuthLogin  = token => ({type: 'AUTH_LOGIN', token})
const actionAuthLogout = ()    => ({type: 'AUTH_LOGOUT'})

// cartReducer
function cartReducer(state={}, {type, count, good}){
        if (type === 'CART_CLEAR'){ 
            return {}
        } else if (type === 'CART_DEL' ) {
            const {[good._id]:_, ...newState} = state
            return  newState
        } else if (type === 'CART_SET') {
            if (count <= 0) {
                const {[good._id]:_, ...newState} = state
                return  newState
            }
            return  {
                ...state,
                [good._id]:{
                    count: count,
                    good
                }
            }
        } else if (type === 'CART_ADD') {
            const stateKeys = Object.keys(state)
            return {
                ...state,
                [good._id]: {
                    count: stateKeys.includes(good._id) ? state[good._id].count + count : count,
                    good
                }
            }
        } else if (type === 'CART_SUB') {
            const stateKeys = Object.keys(state)
            const updatedCount = stateKeys.includes(good._id) ? state[good._id].count - count : 0
            if (updatedCount <= 0) {
                const {[good._id]:_, ...newState} = state
                return  newState
            }
            return {
                ...state,
                [good._id]: {
                    count: updatedCount,
                    good
                }
            }
        }
        return state
    }

// добавление товара
const actionCartAdd = (good, count=1) => ({type: 'CART_ADD', count, good})
// уменьшение количиства товара 
const actionCartSub = (good, count=1) => ({type: 'CART_SUB', count, good})
// удаление товара
const actionCartDel = (good) => ({type: 'CART_DEL', good})
// установка количества товара 
const actionCartSet = (good, count=1) => ({type: 'CART_SET', count, good})
// очистка корзины 
const actionCartClear = () => ({type: 'CART_CLEAR'})


// GraphQL запити

//корневые категории
const gqlRootCats = () => gql (
    `query cats ($parent:String){
        CategoryFind (query: $parent) {
          _id name, 
            goods {name},
          parent {name}
          subCategories {name,
            goods {name}
            subCategories {name,
              goods {name}
            }
          }
        }
      }`,{parent: JSON.stringify([{parent: null}])}
)
const actionRootCats = () => actionPromise("rootCats", gqlRootCats())

// Получение одной категории
const gqlFindOneCat = (_id) => gql(
    `query catOne($idCat:String){
        CategoryFindOne (query: $idCat) {
            name,
            goods {_id price name,
              images {url}}, 
            parent {name _id}
            subCategories {
                _id name, 
              goods {_id price name, images { url}}
              subCategories {_id name 
                goods {_id price name, images {url}}
              }
            }
          }
        }`,{idCat: JSON.stringify([{_id}])}
)
const actionFindOneCatId = (_id) => actionPromise("oneCat", gqlFindOneCat(_id))

// получение одного товара 
const gqlGoodOne = (_id) => gql (
    `query gf($idGood:String){
        GoodFindOne (query: $idGood) {
          name price description images {url} 
          categories {
            _id name   
          }
        }
      }`,{idGood: JSON.stringify([{_id}])}
)
const actionGoodOne = (_id) => actionPromise("goodOne", gqlGoodOne(_id))

// запрос на реестрацию 
const gqlUserRegistration = (login, password, nick) => gql (
    `mutation reg($login:String, $password:String, $nick:String) {
        UserUpsert(user:{login:$login, password:$password, nick:$nick}) {
          _id createdAt login nick
        }
        }`, {login, password, nick}
)
const actionUserRegistration = (login, password, nick) => actionPromise("userRegistration", gqlUserRegistration(login, password, nick))

const actionFullRegister = (login, password, nick) =>
    async dispatch => {
        try {
            const result = await dispatch(actionUserRegistration(login, password, nick))
            if(result) {
                const token = await dispatch(actionLogin(login, password))
                if (typeof token === 'string') {
                    dispatch(actionAuthLogin(token))
                } else {
                    dispatch(actionAuthLogout())
                }
            }
        } catch (error) {
            dispatch(actionAuthLogout())
        }
    }

// запрос на логин
const gqlLogin = (login, password) => gql (
    `query login ($login:String, $password: String) {
        login(login:$login, password:$password)
      }`,{login, password}
)
const actionLogin = (login, password) => actionPromise("login", gqlLogin(login, password))

const actionFullLogin = (login, password) =>
    async dispatch => {
        try {
        const token = await dispatch(actionLogin(login, password))
        if (typeof token === 'string') {
            dispatch(actionAuthLogin(token))
        } else {
            dispatch(actionAuthLogout())
        }
        } catch (error) {
        dispatch(actionAuthLogout())
        }
    }

// запрос на историю закозов 
const gqlOrderFind = () => gql(
    `query orderFind {
        OrderFind  (query: "[{}]") {
          _id total
          orderGoods {
            price total count good {name images {url}}
          }
        }
      }`
)
const actionOrderFind = () => actionPromise("orderFind", gqlOrderFind())

// запрос на оформление заказа 
const gqlFullOrde = (order) => gql(
    `mutation fullOrder ($order: OrderInput) {
        OrderUpsert(order:$order){
            _id
        }
    }`, {order}
)
const actionFullOrder = () =>
    async (dispatch, getState) => {
        const cartState = getState().cart

        const orderGoods = Object.keys(cartState).map(key => {
            const {_id} = cartState[key].good
            const count = cartState[key].count
            return {good: {_id},count}
        })

        const order = {orderGoods}
        try {
            const result = await dispatch(actionPromise("fullOrder", gqlFullOrde(order)))
            dispatch(actionCartClear())
        } catch (error) {
            console.log(error)
        }
    }

function getGQL (url) {
    return function gql (query, variables={}) {
        const auth = store.getState().auth
        
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
        if (auth.token) {
            headers.Authorization = `Bearer ${auth.token}`
        }

        return fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({query,variables})
        })
        .then (response => { 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } 
            return response.json()
        })
        .then(data => {
            if (data && data.data) {
                const keys = Object.keys(data.data)
                return data.data[keys[0]]
            } else if (data && data.errors) {
                throw new Error(data.errors[0].massega)
            } else {
                return {}
            }
        })
    }
}

const backendURL = "http://shop-roles.node.ed.asmer.org.ua/graphql"
const gql = getGQL(backendURL)

function localStoredReducer(originalReducer, localStorageKey){
    function wrapper(state, action){
        if (state === undefined) {
            let oldState = localStorage[localStorageKey]
            try {
                return JSON.parse(oldState)
            } 
            catch (error) {
                console.log(error)
            }
        }
        let newState = originalReducer(state, action)
        localStorage[localStorageKey] = JSON.stringify(newState)

        return newState
    }
    return wrapper
}

//-------------------------
const main = document.getElementById("main")
const aside = document.getElementById("aside")
const header = document.getElementById("header")
// -------------------------
const store = createStore(totalReducer)
store.subscribe(() => console.log(store.getState()))


store.dispatch(actionRootCats())
// category
store.subscribe(() => {
    const {status, payload, error} = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED'){
        aside.innerHTML = ''
        for (const {_id, name} of payload){
            aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
        }
    }
    
})

// cats
store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'category') return
    
    const {status, payload, error} = store.getState().promise.oneCat || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }

    if (status === 'FULFILLED'){
        main.innerHTML = ""
        const {name, goods, parent, subCategories} = payload

        const title = document.createElement("div")
        title.style.display = "flex"
        title.style.fontSize = "15px"
        title.style.alignItems = "center"
        title.style.gap = "5px"
        main.append(title)
        
        if (parent) {
            const {name, _id} = parent
            const parentLink = document.createElement("a")
            parentLink.href = `#/category/${_id}`
            parentLink.innerText = `${name} /`
            title.append(parentLink)
        }
        const nameCats = document.createElement("h1")
        nameCats.innerText = `${name} /`
        title.append(nameCats)
        if(subCategories) {
            for (const {_id, name} of subCategories){
                const subCatLink = document.createElement("a")
                subCatLink.href = `#/category/${_id}`
                subCatLink.innerText = `${name} /`
                title.append(subCatLink)
            }
        }

        const boxGood = document.createElement("div")
        boxGood.style = `
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            gap: 1.25rem;
        `
        if (goods) {
            for (const {name, images, _id, price} of goods) {
                const link = document.createElement("a")
                link.href = `#/good/${_id}`
                const goodsCards = document.createElement("div")
                goodsCards.style = `
                    width: 300px;
                    height: 500px;   
                    border: 1px solid black;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 5px;
                    text-align: center;
                    
                `
                const [data] = images

                const img = document.createElement("img")
                img.src = `http://shop-roles.node.ed.asmer.org.ua/${data.url}`
                img.style = `
                    width: 300px; 
                    height: 350px;
                    overflow: hidden;
                `
                link.append(img)
                goodsCards.append(link)
                
                const goodName = document.createElement("p")
                goodName.style.flexShrink = "0"
                goodName.innerHTML = `${name}`
                goodsCards.append(goodName)

                const priceGood = document.createElement("p")
                priceGood.innerText = `Ціна: ${price} грн.`
                goodsCards.append(priceGood)

                const btnBuyCard = document.createElement("button")
                btnBuyCard.innerText = "Купити"
                btnBuyCard.addEventListener("click", () => buyGoodOfCard(`${_id}`))
                goodsCards.append(btnBuyCard)

                boxGood.append(goodsCards)     
            }
        }
        main.append(boxGood)
    }   
})

//GoodOne
store.subscribe(() => {
    const [,route,_id] = location.hash.split('/')
    if (route !== 'good') return
    const {status, payload, error} = store.getState().promise.goodOne || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
        
    }
    if (status === 'FULFILLED') {
        main.innerHTML = ""
        const title = document.createElement("div")
        title.style.display = "flex"
        title.style.fontSize = "15px"
        title.style.gap = "5px"
        main.append(title)

        const {categories, name, images, description, price} = payload

        if (categories) {
            const [data] = categories
            const linkCat = document.createElement("a")
            linkCat.href = `#/category/${data._id}`

            const nameCat = document.createElement("p")
            nameCat.style.fontWeight = "900"
            nameCat.innerText = `${data.name}  /`
            linkCat.append(nameCat)
            title.append(linkCat)
            
        }
        if (name){
            const nameGood = document.createElement("p")
            nameGood.innerText = `  ${name}`
            title.append(nameGood)
            const nameGoodTitle = document.createElement("p")
            nameGoodTitle.style.fontSize = "40px"
            nameGoodTitle.style.fontWeight = "900"
            nameGoodTitle.innerText = `${name}`
            main.append(nameGoodTitle)
        }
        if(images) {
            const arrImg = []
            for(const data of images) {
                arrImg.push(`${data.url}`)
            } 
            createSlider(arrImg,main)
        }
        if(description) {
            const descriptionText = document.createElement("p")
            descriptionText.style.fontSize = "20px"
            descriptionText.innerHTML = `${description}`
            descriptionText.style.padding = "30px 0"
            main.append(descriptionText)
        }
        if(price) {
            const priceElem = document.createElement("p")
            priceElem.style.fontSize = "25px"
            priceElem.style.fontWeight= "900"
            priceElem.innerText = `Ціна: ${price} грн.`
            main.append(priceElem)
        }
        const btnBuy = document.createElement("button")
        btnBuy.innerText = "Купити"
        btnBuy.addEventListener("click", clickOnBuy)
        main.append(btnBuy)        
    }
})

// login
store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'login') return

    const {status, payload, error} = store.getState().promise.login || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    
    if (status === 'FULFILLED') { 
        if (payload) {
            main.innerHTML = `<p>Ви успішно війшли в свій акаунт</p>`
        } else if (!payload) {
            main.innerHTML = `<p>Не вірний пароль або логін</p>`
        }
    }
})
store.subscribe(() => {
    const {status, payload, error} = store.getState().promise.userRegistration || {}
    if (status === 'FULFILLED') { 
        if (payload) {
            main.innerHTML = `<p>Ви успішно війшли в свій акаунт</p>`
        }  
        
    }

    const statusAuth = store.getState().auth
    const btnLogin = document.getElementById("btnLogin")
    const btnLogout = document.getElementById("btnLogout")

    if (Object.keys(statusAuth).length !== 0 && !btnLogout){
        
        btnLogin.style.display = "none"
        const logout = document.createElement("button")
        logout.innerText = "Logout"
        logout.id = "btnLogout"
        logout.onclick = () => {
            store.dispatch(actionAuthLogout())
        }
        header.prepend(logout)
    } else if (Object.keys(statusAuth).length === 0 && btnLogout) {
        btnLogin.style.display = "block"
        btnLogout.remove()
    }
})

// register
store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'register') return
    const {status, payload, error} = store.getState().promise.login || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    
    if (status === 'FULFILLED') { 
        if (payload) {
            main.innerHTML = `<p>Ви успішно війшли в свій акаунт</p>`
        } 
            
        
        
    }

})
const elem = document.createElement("p")
elem.id = "cartCount"
elem.style.backgroundColor = "white"
elem.style.borderRadius = "50%"
elem.style.padding = "5px"
header.append(elem)
// cart
store.subscribe(() => {
    createdCountAll(store.getState().cart) 
})

// history
store.subscribe(() => {
    const [,route] = location.hash.split('/')
    if (route !== 'history') return

    main.innerHTML = ""

    const title = document.createElement("h1")
    title.innerText = `Історія замовлень`
    main.append(title)

    const conteiner = document.createElement("div")
    conteiner.id = "conteiner"
    main.append(conteiner)

    const {status, payload, error} = store.getState().promise.orderFind || {}
 
    if (status === 'FULFILLED') { 
        const conteiner = document.getElementById("conteiner")
        
        for (const {total,orderGoods} of payload) {
            for(const {price,count,good} of orderGoods) {
                const {name,images} = good
            const url = images[0].url
            const boxGoods = document.createElement("div")
            boxGoods.style = "display: flex; padding: 20px 10px; gap: 15px; border: solid 1px black"
            boxGoods.innerHTML += `
                <img src="http://shop-roles.node.ed.asmer.org.ua/${url}" style = "width: 30px; height: 50px;"/>
                <p><em>${name}</em></p>
                <p>Кількість: ${count} шт.</p>
                <p><strong>Ціна за одиницю товару: ${price}</strong></p>

            `
            conteiner.prepend(boxGoods)
            
            }
            const totalElem = document.createElement("p")
            totalElem.style = "text-align: right;"
            totalElem.innerHTML = `<strong>Сума замовлення: ${total}</strong>`
            conteiner.prepend(totalElem)
            
        }  
        
    }
 
})
window.onhashchange = () => {

    const [,route, _id] = location.hash.split('/')

    const routes = {
        category() {
            store.dispatch(actionFindOneCatId(_id))
        },
        good(){
            store.dispatch(actionGoodOne(_id))
        },
        login(){
            main.innerHTML = ""

            function Password (parent, open) {

                const titleLogin = document.createElement("h1")
                titleLogin.innerText = "Вхід"
                main.append(titleLogin)
    
                const inputPassword = document.createElement("input")
                const labelPassword = document.createElement("label")
                labelPassword.innerText = "Пароль: "
                inputPassword.id = "inputPassword"
                inputPassword.type = open ? "text" : "password"
                parent.append(labelPassword)
                parent.append(inputPassword)
            
                const inputCheck = document.createElement("input")
                const brCheck = document.createElement("br")
                inputCheck.type = "checkbox"
                inputCheck.checked = open ? true : false
                parent.append(inputCheck)
                parent.append(brCheck)
            
            
                let passwordValue = ""
                let isOpen = open
            
                this.getValue = function () {
                    return passwordValue
                }
                this.setValue = function (value) {
                    inputPassword.value = value
                    passwordValue = value
                }
            
                this.getOpen = function () {
                    return isOpen
                }
                this.setOpen = function (checked) {
                    isOpen = checked
                    inputPassword.type = checked ? "text" : "password"
                    inputCheck.checked = checked
                }
                
                inputPassword.oninput = () => {
                    onPasswordInputChange(inputPassword, this)
                }
            
                inputCheck.onchange = () => {
                    onPasswordCheckChange(inputCheck, this)
                }
            
                this.setStyle = function (style) {
                    return Object.assign(inputPassword.style,style)
                }
            }
            
            function LoginForm (parent) {
            
                const password = new Password(parent, false)
            
                const inputLogin = document.createElement("input")
                const labelLogin = document.createElement("label")
                const brLogin = document.createElement("br")
                labelLogin.innerText = "Логін: "
                inputLogin.id = "inputLogin"
                inputLogin.style.margin = "15px 0"
                inputLogin.type = "text"
                parent.append(labelLogin)
                parent.append(inputLogin)
                parent.append(brLogin)
                
                
                const btnForm = document.createElement("button")
                btnForm.innerText = "Війти"
                btnForm.id = "btnForm"
                btnForm.type = "submit"
                btnForm.addEventListener("click", loginOnClick)
                btnForm.disabled = true 
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
                    onLoginInputChange(inputLogin, this)
                }
                
                this.password = function () {
                    return password
                }
            }

            const loginForm = document.createElement("form")
            loginForm.style = "padding: 20px"
            const newForm = new LoginForm(loginForm)
            main.append(loginForm)
            const linkReg = document.createElement("a")
            linkReg.id = "btnReg"
            linkReg.href = "#/register/"
            linkReg.innerText = "Зареєструватись"
            main.append(linkReg)
            
        },
        register(){
            main.innerHTML = ""
                
            function Password (parent, open) {

                const inputPassword = document.createElement("input")
                const labelPassword = document.createElement("label")
                labelPassword.innerText = "Пароль: "
                inputPassword.style.marginBottom = "5px"
                inputPassword.id = "inputPassword"
                inputPassword.type = open ? "text" : "password"
                parent.append(labelPassword)
                parent.append(inputPassword)

                const inputCheck = document.createElement("input")
                const brCheck = document.createElement("br")
                inputCheck.type = "checkbox"
                inputCheck.checked = open ? true : false
                parent.append(inputCheck)
                parent.append(brCheck)


                let passwordValue = ""
                let isOpen = open

                this.getValue = function () {
                    return passwordValue
                }
                this.setValue = function (value) {
                    inputPassword.value = value
                    passwordValue = value
                }

                this.getOpen = function () {
                    return isOpen
                }
                this.setOpen = function (checked) {
                    isOpen = checked
                    inputPassword.type = checked ? "text" : "password"
                    inputCheck.checked = checked
                }
                
                inputPassword.oninput = () => {
                    onPasswordInputChange(inputPassword, this)
                }

                inputCheck.onchange = () => {
                    onPasswordCheckChange(inputCheck, this)
                }

                this.setStyle = function (style) {
                    return Object.assign(inputPassword.style,style)
                }
            }

            function LoginForm (parent) {

                const password = new Password(parent, false)

                const inputLogin = document.createElement("input")
                const labelLogin = document.createElement("label")
                const brLogin = document.createElement("br")
                labelLogin.innerText = "Логін: "
                inputLogin.id = "inputLogin"
                inputLogin.style.marginTop = "5px"
                inputLogin.type = "text"
                parent.append(labelLogin)
                parent.append(inputLogin)
                parent.append(brLogin)

                
                const labelNick = document.createElement("label")
                labelNick.innerHTML = "Нікнейм: "
                parent.append(labelNick)
                const inputNick = document.createElement("input")
                inputNick.type = "text"
                inputNick.id = "inputNick"
                inputNick.style.marginTop = "10px"
                parent.append(inputNick)
                const brNick = document.createElement("br")
                parent.append(brNick)
                
                
                const btnForm = document.createElement("button")
                btnForm.innerText = "Війти"
                btnForm.style.margin = "20px 0"
                btnForm.id = "btnForm"
                btnForm.type = "submit"
                btnForm.addEventListener("click", clickOnReg)
                btnForm.disabled = true 
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
                    onLoginInputChange(inputLogin, this)
                }
                
                this.password = function () {
                    return password
                }
            }


            function PasswordVerify (parent) {
                const form = document.createElement("form")
                const titleForm = document.createElement("h1")
                titleForm.innerText = "Реєстрація"
                parent.append(titleForm)
                parent.append(form)
                form.style.padding = "20px"

                const loginForm = new LoginForm(form)

                const inputCheck = document.createElement("input")
                inputCheck.id = "inputCheck"
                inputCheck.type = "text"
                
                const password = loginForm.password()
                password.onChange = () => {
                    comparePasswords(password, inputCheck)
                }
                
                password.onOpenChange = function () {
                    createInputChecked(password, inputCheck, form)
                    comparePasswords(password, inputCheck)
                }

                inputCheck.oninput =  () => {
                    comparePasswords(password, inputCheck)
                }
                createInputChecked(password, inputCheck, form)
            }

            const form = new PasswordVerify(main)

        },
        cart() {
            creatPageCart(store.getState().cart, main)

        }, 
        history() {
            store.dispatch(actionOrderFind())
        }
    }

    if (route in routes){
        routes[route]()
    }
}
window.onhashchange()


function createdCountAll(statusCart) {
    const cartCount = document.getElementById("cartCount")
        let countAll = 0
        for (const key in statusCart) {
            countAll += Number(statusCart[key].count)
        }
        elem.innerText = `${countAll}`
}

// для корзини
function creatPageCart (cartState, parent) {
    parent.innerHTML = ""
    const title = document.createElement('h1')
    title.innerText = "Кошик" 
    parent.append(title)      

    if(Object.keys(cartState).length === 0) {
        main.innerHTML += `<p>Кошик порожній</p>`
    } else {
        let priceCount = 0
        for(const key in cartState) {
            const {count,good} = cartState[key]
            const {name, price,images} = good.payload
            const url = images[0].url
            priceCount += Number(`${count * price}`)

            const divBoxGood = document.createElement("div")
            divBoxGood.style.display = "flex"
            divBoxGood.style.padding = "20px 10px"
            divBoxGood.style.gap = "15px"

            const imgGood = document.createElement("img")
            imgGood.style.width = "30px"
            imgGood.style.height = "50px"
            imgGood.src = `http://shop-roles.node.ed.asmer.org.ua/${url}`

            const nameGood = document.createElement("p")
            nameGood.style.fontStyle = "italic" 
            nameGood.innerText = `${name}`

            const priceGood = document.createElement("p")
            priceGood.style.fontWeight = "bolder"
            priceGood.innerText = `Сума: ${count * price}`

            const btnMinus = document.createElement("button")
            btnMinus.innerText = "-"
            btnMinus.addEventListener("click", () => goodSub(`${good._id}`))

            const inputCount = document.createElement("input")
            inputCount.type = "text"
            inputCount.id = `inputCount${good._id}`
            inputCount.value = `${count}`
            inputCount.addEventListener("change", () => chanchCount(`${good._id}`))

            const btnAdd = document.createElement("button")
            btnAdd.innerText = "+"
            btnAdd.addEventListener("click", () =>addGood(`${good._id}`))

            const btnRemove = document.createElement("button")
            btnRemove.innerText = "Видалити"
            btnRemove.addEventListener("click", () => removeCart(`${good._id}`))

            divBoxGood.append(imgGood)
            divBoxGood.append(nameGood)
            divBoxGood.append(priceGood)
            divBoxGood.append(btnMinus)
            divBoxGood.append(inputCount)
            divBoxGood.append(btnAdd)
            divBoxGood.append(btnRemove)

            parent.append(divBoxGood)
        }
        const priceAll = document.createElement("p")
        priceAll.innerText = `Сума замовлення: ${priceCount} грн.`
        priceAll.style.fontWeight = "900"
        parent.append(priceAll)

        const btnClear = document.createElement("button")
        btnClear.innerHTML = "Очистити корзину"
        btnClear.style.margin = "20px 0"
        btnClear.addEventListener("click", clearCart)
        parent.append(btnClear)
        const btnOrder = document.createElement("button")
        btnOrder.innerHTML = "Оформити замовлення"
        btnOrder.style.margin = "0 30px"
        btnOrder.addEventListener("click", placeOrder)
        parent.append(btnOrder)
    }
    const br = document.createElement("br")
    main.append(br)
    const historyLink = document.createElement("a")
    historyLink.innerText = "Історія замовлень"
    historyLink.href = "#/history/"
    main.append(historyLink)
    
}

async function buyGoodOfCard (goodId) {
    await store.dispatch(actionGoodOne(goodId))
    const {status, payload, error} = store.getState().promise.goodOne || {}

    if (status === 'FULFILLED') {
        store.dispatch(actionCartAdd({_id: goodId,payload}))   
    } 
}

function clickOnBuy () {
    const [,route, _id] = location.hash.split('/')
    const {status, payload, error} = store.getState().promise.goodOne || {}
    if (status === 'FULFILLED') {
        store.dispatch(actionCartAdd({_id,payload}))   
    }  
}
function clearCart () {
    store.dispatch(actionCartClear())
    const cartState = store.getState().cart
    creatPageCart(cartState, main)
}
async function placeOrder() {
    await store.dispatch(actionFullOrder())
    store.dispatch(actionCartClear())
    const cartState = store.getState().cart
    creatPageCart(cartState, main)
}

function removeCart(goodId) {
    store.dispatch(actionCartDel({_id: goodId}))
    const cartState = store.getState().cart
    creatPageCart(cartState, main)
}

function addGood(goodId) {
    const input = document.getElementById(`inputCount${goodId}`)
    const value = Number(input.value) 
    const cartState = store.getState().cart
    if (cartState[goodId]) {
        const good = cartState[goodId].good
        store.dispatch(actionCartSet(good, value + 1))
    } 
    const updatedCartState = store.getState().cart
    creatPageCart(updatedCartState, main)
}

function goodSub(goodId) {
    const cartState = store.getState().cart
    if (cartState[goodId]) {
        const good = cartState[goodId].good
        store.dispatch(actionCartSub(good))

        const updatedCartState = store.getState().cart
        creatPageCart(updatedCartState, main)
    }
}
function chanchCount(goodId) {
    const input = document.getElementById(`inputCount${goodId}`)
    const value = input.value
    const cartState = store.getState().cart
    if (cartState[goodId]) {
        const good = cartState[goodId].good
        store.dispatch(actionCartSet(good, value))
    } 
    const updatedCartState = store.getState().cart
    creatPageCart(updatedCartState, main)
}
// -----------------------------
// function login
function loginOnClick () {
    const loginInput = document.getElementById("inputLogin")
    const passwordInput = document.getElementById("inputPassword")
    
    const login = loginInput.value
    const password = passwordInput.value
    store.dispatch(actionFullLogin(login, password))

    loginInput.value = ""
    passwordInput.value = ""
}
// function reg
function clickOnReg () {
    const loginInput = document.getElementById("inputLogin")
    const passwordInput = document.getElementById("inputPassword")
    const nickInput = document.getElementById("inputNick")
    const login = loginInput.value
    const password = passwordInput.value
    const nick = nickInput.value
    console.log(login,password, nick)
    store.dispatch(actionFullRegister(login, password, nick))

    loginInput.value = ""
    passwordInput.value = ""
    nickInput.value = ""
}

//-----------
function onPasswordInputChange(input, password) {
    password.setValue(input.value)
    if (typeof password.onChange === 'function') {
        password.onChange(input.value)
    }
}
function onPasswordCheckChange(checkbox, password) {
    const isOpen = checkbox.checked
    password.setOpen(isOpen)
    if (typeof password.onOpenChange === 'function') {
        password.onOpenChange(isOpen)
    }
}
function btnState() {
    const inputPassword = document.getElementById("inputPassword")
    const inputLogin = document.getElementById("inputLogin")
    const btnForm = document.getElementById("btnForm")

    const loginValue = inputLogin.value
    const passwordValue = inputPassword.value

    if (loginValue !== "" && passwordValue !== "") {
        btnForm.disabled = false
    } else {
        btnForm.disabled = true
    }
}
function onLoginInputChange(inputLogin, loginForm) {
    const loginValue = inputLogin.value
    loginForm.setValueLogin(loginValue)
    if (typeof loginForm.onChangeLogin === 'function') {
        loginForm.onChangeLogin(loginValue)
    }
    btnState(loginForm)
}
// ---------
const comparePasswords = (password, inputCheck) => {
    const passwordValue = password.getValue()
    const confirmPasswordValue = inputCheck.value
    
    if (passwordValue === "" && confirmPasswordValue === "" ) {
        password.setStyle({border: ""})
        inputCheck.style.border = ""
    } else if ( passwordValue !== confirmPasswordValue && !password.getOpen()) {
        password.setStyle({border: "solid red"})
        inputCheck.style.border = "solid red"
    } else if (!password.getOpen() || passwordValue === confirmPasswordValue) {
        password.setStyle({border: "solid green"})
        inputCheck.style.border = "solid green"
    }
}

function createInputChecked(password, inputCheck, form) {
    const isOpen = password.getOpen()
    if (isOpen) {
        inputCheck.remove()
        password.setStyle({ border: "" })
    } else {
        form.children[2].insertAdjacentElement("afterend", inputCheck)
    }
}


// slider
function createSlider (arrImg, parent) {
    const sliderContainer = document.createElement("div")
    sliderContainer.style = `
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 15px;
    `
    sliderContainer.style.position = "relative"
    sliderContainer.style.width = "600px"
    sliderContainer.style.height = "500px"
    parent.append(sliderContainer)

    const sliderImg = document.createElement("img")
    sliderImg.style.width = "100%"
    sliderImg.style.height = "100%"
    sliderContainer.append(sliderImg)

    let currentImgIndex = 0

    function chancheImg (index) {
        if (index >= 0 && index < arrImg.length) {
            sliderImg.src = `http://shop-roles.node.ed.asmer.org.ua/${arrImg[index]}`
            currentImgIndex = index
        }
    }

    chancheImg(currentImgIndex)
     
    const prevBtn = document.createElement("button")
    prevBtn.innerHTML = "&#10094"
    prevBtn.style = `
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
    `
    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = "&#10095"
    nextBtn.style = `
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translate(50%, -50%);
        padding: 15px;
    `

    prevBtn.addEventListener("click", () => chancheImg(currentImgIndex - 1))
    nextBtn.addEventListener("click", () => chancheImg(currentImgIndex + 1))

    sliderContainer.append(prevBtn)
    sliderContainer.append(nextBtn)

}