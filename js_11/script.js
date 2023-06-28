// makeProfileTimer
function makeProfileTimer () {
    const start = performance.now()
    return function () {
        return performance.now() - start
    }
}
const timer = makeProfileTimer() 
    alert('Вимiрюємо час роботи цього alert');  //якийсь код, час виконання якого ми хочемо виміряти з високою точністю
    alert(timer()); //alert повинен вивести час у мілiсекундах від виконання makeProfileTimer до моменту виклику timer(), 
                   // тобто виміряти час виконання alert
const timer2 = makeProfileTimer()
    prompt('')
    alert(`Час роботи двух аlert та одного prompt ${timer()}`)
    alert(`Час роботи prompt та попереднього alert ${timer2()}`)

// makeSaver
function makeSaver (func) {
    let box
    let flag = false
    function saved () {
        if (!flag) {
            box = func()
            flag = true
        }
        return box
    }
    return saved
}

let saver = makeSaver(Math.random) //створює функцію-сховище результату переданої як параметр функції (Math.random 
                                 // у прикладі). На цьому етапі Math.random НЕ ВИКЛИКАЄТЬСЯ
let value1 = saver()              //saver викликає передану в makeSaver функцію, запам'ятовує результат і повертає його
let value2 = saver()              //saver надалі просто зберігає результат функції, і більше НЕ викликає передану 
                                  //в makeSaver функцію;
alert(`Random: ${value1} === ${value2}`)

let saver2 = makeSaver(() => {
    console.log('saved function called');
    return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random()*6)]
})
let value3 = saver2()
let value4 = saver2()

value3 === value4 // теж має бути true
    
console.log(value3 === value4)
console.log(`${value3} === ${value4}`)
    
let namePrompt = prompt.bind(window, 'Як тебе звуть?')
let nameSaver = makeSaver(namePrompt)
alert(`Привіт! Prompt ще не було!`)
alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`)
alert(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`)

// myBind
function myBind (func,obj,arr) {
        return function (...value) {
                let copyArr = arr.slice()
                let valueIndex = 0;
                for (let i = 0; i < copyArr.length; i++) {
                    if (copyArr[i] === undefined) {
                        copyArr[i] = value[valueIndex]; 
                        valueIndex++; 
                    }
                }
                return func.bind(obj,...copyArr)()
            }       
    }



let pow5 = myBind(Math.pow, Math, [, 5]) // перший параметр - функція для біндингу значень за замовчуванням, 
                                                  // другий - this для цієї функції, третій - масив, в якому undefined означає
                                                  // параметри, які мають передаватися під час виклику,
                                                  // інші значення є значеннями за замовчуванням:
let cube = myBind(Math.pow, Math, [, 3]) // cube зводить число в куб

pow5(2) // => 32, викликає Math.pow(2,5), співвіднесіть з [undefined, 5]
pow5(4) // => 1024, викликає Math.pow(4,5), співвіднесіть з [undefined, 5]
cube(3) // => 27
console.log(pow5(2),pow5(4),cube(3))

let chessMin = myBind(Math.min, Math, [, 4, , 5,, 8,, 9])
chessMin(-1,-5,3,15) // викликає Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

console.log(chessMin(-1,-5,3,15))


let zeroPrompt = myBind(prompt, window, [undefined, "0"]) // аналогічно, тільки тепер задається "0" як текст за замовчанням в prompt,
                                                          // а текст запрошення користувача задається під час виклику zeroPrompt
let someNumber = zeroPrompt("Введіть число") // викликає prompt("Введіть число","0")
console.log(someNumber) 
const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f'])//('a','c','d') === 'abcdef'
bindedJoiner('a','c','d') === 'abcdef'
bindedJoiner('1','2','3') === '1b23ef'

console.log(bindedJoiner('a','c','d')) 
console.log(bindedJoiner('1','2','3')) 

// checkResult

function checkResult(original, validator){
    function wrapper(...params){
        let result
        do {
            result = original.call(this,...params)
        } while (result === " " || result === null || !validator(result))
        return result
    }
    return wrapper
}

// //numberPrompt - це функція, яка буде запускати prompt до тих пір, поки користувач не введе число
const numberPrompt = checkResult(prompt, x => !isNaN(+x)) 
let   number       = +numberPrompt("Введіть число", "0")  //параметри передаються наскрізь до оригіналу. Не забудьте передати це, використовуючи call або apply

// //gamePrompt - це функція, яка буде запускати prompt доти, доки користувач не введе одне зі слів 'камінь', 'ножиці', 'папір'
const gamePrompt   = checkResult(prompt, x => ['камень', 'ножиці', 'папір'].includes(x.toLowerCase())) 
const turn         = gamePrompt("Введіть щось зі списку: 'камень', 'ножиці', 'папір'")


// RandomHigh
const randomHigh = checkResult(Math.random, x => 0.5 <= x && x <= 1)
console.log(randomHigh())

// AlwaysSayYes
const alwaysSayYes = checkResult(confirm, x => x === true)
console.log(alwaysSayYes("Натисни відміну"))

// respectMe
const dataCheck = (login, password) => {
    let loginUser = prompt("Введіть логін");
    if (login === loginUser) {
        let passwordUser = prompt("Введіть пароль");
        if ( passwordUser === password) {
            alert("Вітаємо!")
            return true
        } else {
            alert("Ви ввели не вірній пароль")
            }
    } else {
        alert("Ви ввели не вірній логін")
    }
    return false
} 
const respectMe = checkResult(dataCheck, () => true )
respectMe("admin","qwerty")


