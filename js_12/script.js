function reducer (state, {type, product, howMany, money}) {
    if(!state) {
        return {
            пиво: {quantli: 100, price: 50},
            чіпси: {quantli: 100, price: 65},
            сігі: {quantli: 100, price: 80},
            cash: 0
        }
    }
    if (type === "КУПИТИ" && howMany <= state[product].quantli && money >= state[product].price * howMany) {
        return {
            ...state,
            [product]: {
                ...state[product],
                quantli: state[product].quantli - howMany
            },
            cash: state.cash + money
        }
    }
    return state
}

function createStore(reducer) {
    let state = reducer(undefined,{})
    let cbs = []

    const getState = () => state
    const subscribe = cb => (cbs.push(cb),() => cbs = cbs.filter(c => c !== cb))
    
    const dispatch = action => {
        const newState = reducer(state, action)
        if(newState !== state) {
            state = newState
            for (let cb of cbs) cb()
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

const store = createStore(reducer)
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
    document.title = `Каса - ${store.getState().cash} грн.`
})

// select product
const select = document.createElement("select")
for (const key in store.getState()) {
    if (key !== "cash") {
        const option = document.createElement("option")
    option.innerText = key
    select.append(option)
    }   
}
document.body.append(select)

// input quantli
const labelQuantli = document.createElement("label")
labelQuantli.innerText = "Скільки в наявності: "
document.body.append(labelQuantli)
const inputQuantli = document.createElement("input")
inputQuantli.type = "number"
labelQuantli.append(inputQuantli)
inputQuantli.disabled = true


// input howMany
const labelNum = document.createElement("label")
labelNum.innerText = "Скільки потрібно: "
document.body.append(labelNum)
const inputNum = document.createElement("input")
inputNum.type = "number"
labelNum.append(inputNum)

// input money
const labelMoney = document.createElement("label")
labelMoney.innerText = "Гроші: "
document.body.append(labelMoney)
const inputMoney = document.createElement("input")
inputMoney.type = "number"
labelMoney.append(inputMoney)

// btn
const btn = document.createElement("button")
btn.innerText = "КУПИТИ"
document.body.append(btn)

// inpnt cash
const labelCash = document.createElement("label")
labelCash.innerText = "Каса: "
document.body.append(labelCash)
const inputCash = document.createElement("input")
inputCash.type = "number"
labelCash.append(inputCash)
inputCash.disabled = true

inputCash.value = store.getState().cash
store.subscribe(() => {
    inputCash.value = store.getState().cash
})


// Value
let selectValue = select.value
inputQuantli.value = store.getState()[selectValue].quantli
store.subscribe(() => {
    inputQuantli.value = store.getState()[selectValue].quantli
})
select.onchange = () => {
    selectValue = select.value
    inputQuantli.value = store.getState()[selectValue].quantli
    // обновление количества товара 
    store.subscribe(() => {
        inputQuantli.value = store.getState()[selectValue].quantli
    })
}

const inputChange = inputNum.oninput =  () => {
    const howMany = parseInt(inputNum.value) 
    const money = parseInt(inputMoney.value)
    store.dispatch({type: "КУПИТИ", product: selectValue, howMany, money})
}

btn.addEventListener("click", () => {
    inputChange()
    inputNum.value = ""
    inputMoney.value = ""
})

