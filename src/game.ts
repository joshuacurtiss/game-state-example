import k from './kaboom'
import State from './model/State'

const {add, debug, keyPress, pos, sprite, scale, vec2, width, height} = k

export default function () {
    const hist: State[] = [new State(0, 0)]
    let histpos: number
    // Add sprite
    const mario = add([
        sprite('mario'),
        scale(2),
        pos(0,0),
    ])
    const move = (x: number, y: number) => {
        const {x: lastX, y: lastY} = hist[hist.length-1]
        const newpos = vec2(lastX, lastY).add(vec2(x, y))
        if( newpos.x > width() || newpos.x < 0 ) return
        if( newpos.y > height() || newpos.y < 0 ) return
        const newstate = new State(newpos.x, newpos.y)
        hist.push(newstate)
        histpos = hist.length-1
        debug.log(`${hist.length}: ${newstate.toString()}`)
        mario.pos = newpos
    }
    const replay = (pos: number) => {
        if( pos<0 ) return
        if( hist.length-1 < pos ) return
        const state = hist[pos]
        mario.pos = vec2(state.x, state.y)
        debug.log(`Replay ${pos+1}: ${state.toString()}`)
        histpos = pos
    }
    keyPress('up', ()=>move(0,-32))
    keyPress('down', ()=>move(0,32))
    keyPress('left', ()=>move(-32,0))
    keyPress('right', ()=>move(32,0))
    keyPress(',', ()=>replay(histpos-1))
    keyPress('.', ()=>replay(histpos+1))
    debug.log("Use arrow keys to move.")
    debug.log("Use < and > to traverse history.")
}
