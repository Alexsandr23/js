// Світлофор // получилось но есть копипаста, меня занесло кудато не в ту степь
// я так понимаю что нужно сделать Promise.race? тогда будет меньше кода 
const trafficLightElements = [
    document.getElementById("traffic-light-green"),
    document.getElementById("traffic-light-yellow"),
    document.getElementById("traffic-light-red")
]
const pedestrianTrafficLightElements = document.getElementById("pedestrian-traffic-light")
pedestrianTrafficLightElements.style.backgroundColor = "red"
const btnPedestrianTraffic = document.getElementById("btn-pedestrian-traffic")
   
const times = [5000,3000,5000]

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

async function trafficLight(elements,times){
    while (true){
        const [greenTime, yellowTime, redTime] = times
        
        elements[0].style.backgroundColor = "green"
        elements[1].style.backgroundColor = "grey"
        elements[2].style.backgroundColor = "grey"
        await delay(greenTime)
       
        elements[0].style.backgroundColor = "grey"
        elements[1].style.backgroundColor = "yellow"
        await delay(yellowTime)

        elements[1].style.backgroundColor = "grey"
        elements[2].style.backgroundColor = "red"
        await delay(redTime)

    }
}

trafficLight(trafficLightElements,times)

function setPedestrianTrafficLight (color) {
    pedestrianTrafficLightElements.style.backgroundColor = color
}

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
;(async () => {
    while (true) {
      const event = await domEventPromise(btnPedestrianTraffic, 'click')
      console.log('event click happens', event)
      const [greenTime, yellowTime, redTime] = times
      btnPedestrianTraffic.disabled = true
      if (trafficLightElements[0].style.backgroundColor === "green") {
            await delay(greenTime)
            await delay(yellowTime)
            setPedestrianTrafficLight("green")
            await delay(redTime)
            setPedestrianTrafficLight("red")
      } else if (trafficLightElements[1].style.backgroundColor === "yellow") {
            await delay(yellowTime)
            setPedestrianTrafficLight("green")
            await delay(redTime)
            setPedestrianTrafficLight("red")
      } else if (trafficLightElements[2].style.backgroundColor === "red") {
            setPedestrianTrafficLight("green")
            await delay(redTime)
            setPedestrianTrafficLight("red")
      }
      await delay(10000)

      btnPedestrianTraffic.disabled = false
    }
  })()

// speedtest
async function speedtest(getPromise, count,parallel=1){
    let duration = 0
    

    for (let i = 0; i < count; i++) {
        const start = Date.now()
        const promises = []
        for (let j = 0; j < parallel; j++) {
            promises.push(getPromise())
        }
        await Promise.all(promises)
        const end = Date.now()
        const timeDifference = end - start
        duration += timeDifference
    }
    const parallelDuration = count * parallel  
    const queryDuration = duration / count
    const querySpeed = Number((1 / queryDuration).toFixed(3)) 
    const parallelSpeed = Number((parallelDuration / duration).toFixed(2))
        return {
            duration,
            querySpeed, 
            queryDuration,
            parallelSpeed,
            parallelDuration
        }
}

speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5).then(result => console.log(result))

// gql

function gql (url, query, variables) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({query,variables})
    })
    .then (response => { 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        } 
        return response.json()
    })
}
;(async () => {
    const catQuery = `query cats($q: String){
                                        CategoryFind(query: $q){
                                            _id name
                                        }
                                    }`
    const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql",  catQuery,  {q: "[{}]"})
    console.log(cats) //список категорій з _id name та всім таким іншим
    
    
    const loginQuery = `query login($login:String, $password:String){
                            	login(login:$login, password:$password)
                        }`
    
    const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery ,{login: "test457", password: "123123"})
    console.log(token)
})()

// jwtDecode

function jwtDecode (token) {
    if (!token) {
        return undefined
    }
    let parts = token.split(".")
    if (parts.length !== 3) {
        return undefined
    }
    const [header, identifyingInformation, signature] = parts
    try {
        return JSON.parse(atob(identifyingInformation))
    } catch (error) {
        return undefined
    }
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MzIyMDVhZWI3NGUxZjVmMmVjMWEzMjAiLCJsb2dpbiI6InRlc3Q0NTciLCJhY2wiOlsiNjMyMjA1YWViNzRlMWY1ZjJlYzFhMzIwIiwidXNlciJdfSwiaWF0IjoxNjY4MjcyMTYzfQ.rxV1ki9G6LjT2IPWcqkMeTi_1K9sb3Si8vLB6UDAGdw"
console.log(jwtDecode(token)) 
try {
    console.log(jwtDecode())         //undefined
    console.log(jwtDecode("дічь"))   //undefined
    console.log(jwtDecode("ey.ey.ey"))   //undefined
    
    console.log('до сюди допрацювало, а значить jwtDecode не матюкався в консоль червоним кольором')
}
finally{
    console.log('ДЗ, мабуть, закінчено')
}

