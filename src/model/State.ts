export default class State {

    dt: number

    constructor(public x: number, public y: number) {
        this.dt = Date.now()
        return this
    }

    toString() {
        const time = new Date(this.dt).toLocaleTimeString()
        return `${time} - ${this.x}, ${this.y}`
    }

}