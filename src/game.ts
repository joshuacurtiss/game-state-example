import k from './kaboom'
import State from './model/State'

const {add, debug, keyPress, pos, sprite, scale, vec2, width, height} = k

export default function () {

    // `hist` is the array of state objects
    const hist: State[] = [new State(0, 0)]

    // `histpos` tracks where we are in `hist` when we are replaying it
    let histpos = 0

    // `replaying` flag lets us know when we're replaying history so we don't interrupt it
    let replaying = false

    // Character
    const mario = add([
        sprite('mario'),
        scale(2),
        pos(0,0),
    ])

    /**
     * Moves character by (x, y) pixels. Restricts movement to onscreen. Records the movement
     * in character's history.
     */
    const move = (x: number, y: number) => {
        if( replaying ) return
        // We get the last `hist` object to determine last (x, y) location. We do it this way
        // in case you're currently in the middle of scrubbing thru history, the player will
        // be at that position in history, not their "current" position.
        const {x: lastX, y: lastY} = hist[hist.length-1]
        const newpos = vec2(lastX, lastY).add(vec2(x, y))
        // Disallow going off screen
        if( newpos.x > width() || newpos.x < 0 ) return
        if( newpos.y > height() || newpos.y < 0 ) return
        // Store the state and update `histpos` to the latest history
        const newstate = new State(newpos.x, newpos.y)
        hist.push(newstate)
        histpos = hist.length-1
        debug.log(`${hist.length}: ${newstate.toString()}`)
        // Actually update the character's position
        mario.pos = newpos
    }

    /**
     * Replay a character to a single state. Receives, not the state itself, but the position
     * of the state in the `hist` array.
     */
    const replay = (pos: number) => {
        // Don't look for history outside of existing data
        if( pos<0 ) return
        if( hist.length-1 < pos ) return
        const state = hist[pos]
        mario.pos = vec2(state.x, state.y)
        debug.log(`Replay ${pos+1}: ${state.toString()}`)
        histpos = pos
    }

    /**
     * Triggers replaying history in real-time. We do that by calling `replayNext` which
     * recursively calls itself until done.
     */
    const replayAll = () => {
        if( replaying ) return
        replaying = true
        debug.log("Starting real-time replay...")
        replayNext(0)
    }

    /**
     * Recursive function that plays all player steps until finished. By default, it's `pos` 
     * argument will be the next position in history from wherever `histpos` says we are
     * (hence `histpos + 1`) but not how `replayAll` passes in zero to get it started.
     */
    const replayNext = (pos = histpos+1) => {
        // Replay a position
        replay(pos)
        // Get current and next position states
        const currstate = hist[histpos]
        const nextstate = hist[histpos+1]
        // If we failed retrieving states, that probably means replay is done, so stop.
        if( !currstate || !nextstate ) {
            replaying = false
            debug.log("Replay complete!")
            return
        }
        // Otherwise, get time difference til next move. Run again at that time.
        const timediff = nextstate.dt - currstate.dt
        setTimeout(replayNext, timediff)
    }

    // Key handlers
    keyPress('enter', replayAll)
    keyPress('up', ()=>move(0,-32))
    keyPress('down', ()=>move(0,32))
    keyPress('left', ()=>move(-32,0))
    keyPress('right', ()=>move(32,0))
    keyPress(',', ()=>!replaying ? replay(histpos-1) : false)
    keyPress('.', ()=>!replaying ? replay(histpos+1) : false)
    
    // Instructions
    debug.log("Use arrow keys to move.")
    debug.log("Use < and > to traverse history.")
    debug.log("Use 'enter' to replay history in real-time.")
}
