import TitleScreen from './scenes/TitleScreen.js'
import Game from './scenes/Game.js'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    parent: 'game-canvas',
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

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
})