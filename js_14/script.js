// Рекурсія: HTML tree
function htmlTree (obj) {
    let str = `<${obj.tagName}`

    if (obj.attrs) {
        for (const [key, value] of Object.entries(obj.attrs)) {
            str += ` ${key} = "${value}"`
        }
    }
    str += `>`

    if (obj.children) {
        for (const child of obj.children) {
            if (typeof child === "string") {
                str += child
            } else {
                str += htmlTree(child)
            }
        }
    }

    str += `</${obj.tagName}>`
    return str
}

const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
}
document.write(htmlTree(table) )

// Рекурсія: DOM tree

function domTree(parent,obj) {

   let tag = document.createElement(`${obj.tagName}`)

   if (obj.attrs) {
        for (const [key, value] of Object.entries(obj.attrs)) {
        tag.setAttribute(key,value)
        }
    } 
    
    if (obj.children) {
        for (const child of obj.children) {
            if (typeof child === "string") {
                tag.innerText = child
            } else {
               domTree(tag, child)
            }
        }
    }

parent.append(tag)


}

domTree(document.body, table)

// Рекурсія: Deep Copy

function deepCopy(data) {

    if (typeof data !== "object" || data === null) {
        return data
    }

    let copy = Array.isArray(data) ? [] : {}

    for (const key in data) {
            copy[key] = deepCopy(data[key])
    }
    return copy
}

const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]
const arr2 = deepCopy(arr) //arr2 та всі його вкладені масиви та об'єкти - інші об'єкти, які можна змінювати без ризику поміняти щось у arr
const table2 = deepCopy(table) // Аналогічно
console.log(arr)
console.log(arr2,table2)
console.log(arr === arr2, table === table2)

// Рекурсия: My Stringify

function stringify (obj) {

    if (typeof obj === "object" && obj !== null) {
        if (Array.isArray(obj)) {
            const elem = obj.map(e =>{
                e = e === undefined ? null : e
                return stringify(e)
            })
            return `[${elem.join(",")}]` 
        } else {
            const properties = []
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
                    const value = stringify(obj[key])
                    properties.push(`"${key}":${value}`)
                }
            }
            return `{${properties.join(",")}}`     
        }
    } else if (typeof obj === "string") {
        return `"${obj}"`
    } else {
        return String(obj) 
    }

}



console.log(stringify(arr))
console.log(JSON.stringify(arr))
console.log(JSON.stringify(table))
console.log(stringify(table))

// Рекурсія: getElementById throw

function getElementById(idToFind){
    function walker(parent = document.body){
        for (const child of parent.children) {
            if (child.id === idToFind) {
                throw child
            }
            walker(child)
        }
    }
    try {
        walker()
    } catch (elem) {
        return elem
    }
    return null    
}


console.log(getElementById("box2"))
console.log(getElementById("box"))
console.log(document.getElementById("box"))
console.log(document.getElementById("box2"))
const box2 = getElementById("box2")
box2.innerHTML = "<p>Вложеный блок </p>"


