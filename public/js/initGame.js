import TitleScreen from './scenes/TitleScreen.js'
import Game from './scenes/Game.js'

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    backgroundColor: '#0711de',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)

// game.scene.start('titlescreen')
game.scene.start('game')