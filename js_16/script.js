// Chat

// function jsonPost(url, data) {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();   
//         x.onerror = () => reject(new Error('jsonPost failed'))
//         //x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))
//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200){
//                 resolve(JSON.parse(x.responseText))
//             }
//             else if (x.status != 200){
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }
function jsonPost(url,data) { // не получичается переписать функцию не пойму в чем ошибка
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(data)
    })
    .then (response => { 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        } 
        return response.json()
    })
}

let nextMessageId = 0
const nick = document.getElementById('nickInput')
const message = document.getElementById('messageInput')

async function sendMessage(nick,message) {
    const response = await jsonPost("http://students.a-level.com.ua:10012",{func: "addMessage", nick, message})
    return response
}

async function getMessages () {
    const response = await jsonPost("http://students.a-level.com.ua:10012",{func: "getMessages", messageId: nextMessageId})
    const messages = response.data
    const chatContainer = document.getElementById('chatContainer')
    
    messages.forEach((message) => {
        const div = document.createElement('div')
        div.innerHTML = `<strong>${message.nick}</strong>:<span>${message.message}</span>`
        chatContainer.prepend(div)
    })

    nextMessageId = response.nextMessageId
}

async function sendAndCheck() {
    await sendMessage(nick.value,message.value)
    await getMessages()

}

async function checkLoop() {
    while (true) {
        await getMessages()
        await new Promise(resolve => setInterval(resolve, 5000))
    }
}

const btn = document.getElementById("btnSend")
btn.onclick = () => {
    sendAndCheck()
    nick.value = ""
    message.value = ""

}
checkLoop()

// SWAPI Links
async function swapiLinks(url) {
    const response = await fetch(url)
    const data = await response.json()

    const promises = []

    for ( const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            const linkPromis = value.map(link => fetch(link).then(response => response.json()))
            promises.push(...linkPromis)
        } else if (typeof value === "string" && value.includes('https://swapi.dev/api/') && key !== "url") {
            promises.push(fetch(value).then(response => response.json()))
        }
    }

    const loade = await Promise.all(promises)
    
    for (const [key,value] of Object.entries(data)) {
        if (Array.isArray(value)) {
            data[key] = value.map(link => loade.find(item => item.url === link))
          } else if (typeof value === 'string' && value.includes('https://swapi.dev/api/') && key !== "url") {
            data[key] = loade.find(item => item.url === value)
          }
    }

    return data

}
swapiLinks("https://swapi.dev/api/people/20/")
     .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))

// domEventPromise

function domEventPromise(element, eventName){
    function executor(resolve){
        function handler (event) {
            resolve(event)
            element.removeEventListener(eventName, handler)            
        }
        element.addEventListener(eventName, handler)

    }
    return new Promise(executor)
}

const knopka = document.getElementById("knopka")
;(async () => {
    while (true) {
      const event = await domEventPromise(knopka, 'click')
      console.log('event click happens', event)
    }
  })()