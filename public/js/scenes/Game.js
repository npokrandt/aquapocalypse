export default class Game extends Phaser.Scene {
    

    //not sure what this does, but seems good to have
    preload()
    {

    }

    //create the game
    create() { 
       // this.physics.world.setBounds(0, 0, 10000, 10000)

        //const camera = this.cameras.main
        this.add.image(0, 0, 'bg')

        //this.physics.add.group()
        //will be a fish soon
        this.ball = this.add.circle(400, 250, 30, 0x0f4d12, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        
        //can't leave world, stays 
        this.ball.body.setCollideWorldBounds(true, 1, 1)

        const scoreLabel = this.add.text(400, 50, 'Score: 3', {
            fontSize: 48,
            color: 'white'
        })

        scoreLabel.setOrigin(0.5, 0.5)
        
        this.cursors = this.input.keyboard.createCursorKeys()
    }
    update() {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        //const body = this.paddleLeft.body

        //the ball can move in all eight directions
        if (this.cursors.up.isDown && this.cursors.left.isDown){
            this.ball.y -= 1
            this.ball.x -= 1
        } else if (this.cursors.up.isDown && this.cursors.right.isDown){
            this.ball.y -= 1
            this.ball.x += 1
        }else if (this.cursors.down.isDown && this.cursors.left.isDown){
            this.ball.y += 1
            this.ball.x -= 1
        }else if (this.cursors.down.isDown && this.cursors.right.isDown){
            this.ball.y += 1
            this.ball.x += 1
        } else if (this.cursors.up.isDown) {
            this.ball.y -= 1
            //body.updateFromGameObject()
        } else if (this.cursors.down.isDown) {
            this.ball.y += 1
            //body.updateFromGameObject()
        } else if (this.cursors.right.isDown){
            this.ball.x += 1
        } else if (this.cursors.left.isDown){
            this.ball.x -= 1
        }
        
        //const diff = this.ball.y - this.paddleRight.y
        // if (Math.abs(diff) < 10) {
        //     return
        // }
        
        if (this.ball.x < -30) {
            // scored on left side
            //this.IncrementRightScore()
        } else if (this.ball.x > 830) {
            // scored on right side
            //this.IncrementLeftScore()
        }
    }
    
}