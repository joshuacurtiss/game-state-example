import k from './kaboom'

const {add, keyPress, pos, sprite, scale, vec2, width, height} = k

export default function () {
    // Add sprite
    const mario = add([
        sprite('mario'),
        scale(2),
        pos(0,0),
    ])
    const move = (x: number, y: number) => {
        const newpos = mario.pos.add(x, y)
        if( newpos.x > width() || newpos.x < 0 ) return
        if( newpos.y > height() || newpos.y < 0 ) return
        mario.pos = newpos
    }
    keyPress('up', ()=>move(0,-32))
    keyPress('down', ()=>move(0,32))
    keyPress('left', ()=>move(-32,0))
    keyPress('right', ()=>move(32,0))
}
