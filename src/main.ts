import k from './kaboom'
import game from './game'

k.loadSprite('mario', 'mario.png')
k.scene('game', game)
k.start('game', k)
