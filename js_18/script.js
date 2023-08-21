// Store Class // StoreThunk Class
class Store{
    #reducer;
    #state;
    #cbs = []
    
    constructor(reducer){
        this.#reducer = reducer
        this.#state = reducer(undefined,{})
    }
    
    getState(){
        return this.#state   
    }
    
    subscribe(callback){
        this.#cbs.push(callback)
        return () => {this.#cbs = this.#cbs.filter(cb => cb !== callback)}
    }
    
    dispatch(action){
        const newState = this.#reducer(this.#state, action)
        if(newState !== this.#state) {
            this.#state = newState
            this.#cbs.forEach(callback => callback())
        }
    }

    get state() {
        return this.#state
    }
}
class StoreThunk extends Store {
    dispatch(action) {
        if (typeof action === "function") {
            return action(this.dispatch.bind(this), this.getState.bind(this))
        } else {
            return super.dispatch(action)
        }
    }
}

// Password Class
class Password {
    #paswordValue = ""
    #isOpen = false

    #inputPasaword = document.createElement("input")
    #inputCheck = document.createElement("input")

    constructor(parent,open) {
        this.#isOpen = open
        this.#inputPasaword.type = this.#isOpen ? "text" : "password"
        this.#inputCheck.type = "checkbox"
        this.#inputCheck.checked = this.#isOpen

        this.#inputPasaword.oninput = () => {
            this.#paswordValue = this.#inputPasaword.value
            if(typeof this.onChange === "function") {
                this.onChange(this.#paswordValue)
            }
        }

        this.#inputCheck.onchange = () => {
            this.#isOpen = this.#inputCheck.checked
            this.#inputPasaword.type = this.#isOpen ? "text" : "password"
            if (typeof this.onOpenChange === "function") {
                this.onOpenChange(this.#isOpen)
            }
        }
        parent.append(this.#inputPasaword,this.#inputCheck)
    }

    getValue(){
        return this.#inputPasaword.value
    }
    setValue(value){
        this.#inputPasaword.value = value
        this.#paswordValue = value
    }
    getOpen(){
        return this.#inputCheck.checked
    }
    setOpen(checked){
        this.#isOpen = checked
        this.#inputCheck.checked = this.#isOpen
        this.#inputPasaword.type = this.#isOpen ? "text" : "password"
    }

}
const password = new Password(document.body, false)


// RGB Class
class RGB {
    #r;
    #g;
    #b;

    #numberСheck(value){
        if(typeof value !== "number" || value < 0 || value > 255) {
            throw new RangeError("Invalid value")
        }
    }
    get r () {
        return this.#r
    }
    set r(value) {
        this.#numberСheck(value)
        this.#r = value
    }
    get g () {
        return this.#g
    }
    set g(value) {
        this.#numberСheck(value)
        this.#g = value
    }
    get b () {
        return this.#b
    }
    set b(value) {
        this.#numberСheck(value)
        this.#b = value
    }
    get rgb () {
        return `rgb(${this.#r},${this.#g},${this.#b})`
    }
    set rgb (value) {
        const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
        if(!match) {
            throw new SyntaxError("Invalid rgb format")
        }
        const [,r,g,b] = match.map(Number)
        this.#numberСheck(r)
        this.#numberСheck(g)
        this.#numberСheck(b)
        this.#r = r
        this.#g = g
        this.#b = b
    }
    get hex () {
       return `#${this.#r.toString(16).padStart(2,"0")}${this.#g.toString(16).padStart(2,"0")}${this.#b.toString(16).padStart(2,"0")}`
    }

    set hex (value) {
        const match = value.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/)
        if(!match) {
            throw new SyntaxError("Invalid hex format")
        }
        const [,r,g,b] = match.map(str => parseInt(str,16))
        this.#numberСheck(r)
        this.#numberСheck(g)
        this.#numberСheck(b)
        this.#r = r
        this.#g = g
        this.#b = b
    }
}

class RGBA extends RGB {
    #a;

    #alphaСheck(value) {
        if(typeof value !== "number" || value < 0 || value > 1) {
            throw new RangeError("Invalid value alpha")
        }
    }
    get a () {
        return this.#a
    }
    set a (value) {
        this.#alphaСheck(value)
        this.#a = value
    }
    
    get hex () {
            const alphaHex = Math.round(this.#a * 255).toString(16).padStart(2, '0')
            if (isNaN(alphaHex)) {
                return super.hex 
            } else {
                return super.hex+alphaHex
            }
        }
    
    set hex (value){
        const match = value.match(/^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/)
        if(!match) {
            throw new SyntaxError("Invalid hex format")
        }
        const [,rgbHex,alphaHex] = match
        super.hex = `#${rgbHex}`
        if(alphaHex !== undefined) {
            const alpha = Number((parseInt(alphaHex,16)/ 255).toFixed(2))
            this.#alphaСheck(alpha)
            this.#a = alpha
        }
    }

    get rgba() {
        return `rgba(${Math.round(super.r)},${Math.round(super.g)},${Math.round(super.b)},${this.#a})`
    }

    set rgba(value) {
        const match = value.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([01]?\.?\d+)\)$/)
        if (!match) {
            throw new SyntaxError('Invalid rgba format')
        }
        const [, r, g, b, a] = match.map(Number)
        this.#alphaСheck(a)
        super.r = r
        super.g = g
        super.b = b
        this.#a = a
    }

    set color(value) {
        if (value.startsWith('#')) {
            this.hex = value;
        } else if (value.startsWith('rgb')) {
            this.rgba = value;
        }
    }
}

const rgba = new RGBA
rgba.hex = '#80808080'
console.log(rgba.a) //0.5
console.log(rgba.rgba) //rgba(128,128,128,0.5)
rgba.r = 192
rgba.a = 0.25
console.log(rgba.hex)  //#C0808040
rgba.color = 'rgba(1,2,3,0.70)'
rgba.b    *= 10
console.log(rgba.hex)  //#01021EB3