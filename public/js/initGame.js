import Home from './scenes/Home.js'
import Game from './scenes/Game.js'

document.addEventListener("DOMContentLoaded", function() {
    let canvasId;
    const gameCanvas = document.getElementById('game-canvas');
    const homeCanvas = document.getElementById('home-canvas');
    
    if (gameCanvas) {
        canvasId = 'game-canvas';
    } else if (homeCanvas) {
        canvasId = 'home-canvas';
    } else {
        console.error("Canvas element not found.");
        return;
    }

    const config = {
        width: window.innerWidth,
        height: window.innerHeight,
        type: Phaser.AUTO,
        backgroundColor: '#000000',
        parent: canvasId,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            }
        }
    };

    const game = new Phaser.Game(config);

    game.scene.add('home', Home);
    game.scene.add('game', Game);

    if (canvasId === 'game-canvas') {
        game.scene.start('game');
    } else {
        game.scene.start('home');
    }

    window.addEventListener('resize', () => {
        game.scale.resize(window.innerWidth, window.innerHeight);
    });
});