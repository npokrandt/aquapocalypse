const { Wrap } = Phaser.Math
//const { black, white } = colors.hexColors;
const cellW = 100
const cellH = 100

export default class Game extends Phaser.Scene {

    //not sure what this does, but seems good to have
    preload()
    {
        this.load.image('enemies', 'assets/bad-fish.png')
    }

    //create the game
    create() { 
       this.physics.world.setBounds(0, 0, 4000, 2500)

       //this.cameras.main.setZoom(0.2)

        //will be a fish soon
        this.ball = this.add.circle(2000, 1250, 30, 0x0f4d12, 1)
        this.physics.add.existing(this.ball)
        //this.ball.body.setBounce(1, 1)
        
        //can't leave world, stays 
        this.ball.body.setCollideWorldBounds(true, 1, 1)

        //fish food starts here
        this.foodPieces = this.physics.add.staticGroup(); 

        for (var i = 0; i < 200; i++) {
            var x = Phaser.Math.RND.between(0, 4000);
            var y = Phaser.Math.RND.between(0, 2500);
            this.foodPieces.create(x, y); 
        }

        //enemy fishies start here 
        this.enemies = this.physics.add.group({
            key: 'enemies',
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: 1,
            velocityY: -1,
            setScale: {x: 0.25, y: 0.25}
        });

        for (const enemy of this.enemies.getChildren()) {
            let x = Phaser.Math.RND.between(50, 300);
            let y = Phaser.Math.RND.between(50, 300);
            enemy.setVelocity(x, y)
        }

        //score
        let score = 0;
        this.scoreLabel = this.add.text(400, 50, 'Score: 0', {
            fontSize: 48,
            color: 'white'
        })

        this.scoreLabel.setScrollFactor(0, 0)
        this.scoreLabel.setOrigin(0.5, 0.5)

        this.cameras.main.startFollow(this.ball)
        
        this.cursors = this.input.keyboard.createCursorKeys()


        this.physics.add.overlap (
            this.ball, 
            this.foodPieces, 
            function eatFood(ball, food) {
                food.disableBody(true, true);
                score += 10; 
                this.scoreLabel.setText('Score: ' + score);
                console.log(score)
            }, 
            null, 
            this);

        this.physics.add.collider(this.ball, this.foodPieces)

        this.physics.add.collider(
            this.ball, 
            this.enemies,
            gameOver,
            null,
            this
        );

        function gameOver(){
            this.gameOverLabel = this.add.text(400, 250, 'GAME OVER!', {
                fontSize: 100,
                color: 'white'
            })
    
            this.gameOverLabel.setScrollFactor(0, 0)
            this.gameOverLabel.setOrigin(0.5, 0.5)
            //prevent user from eating more food, and offer them the option to play again
            //also save the user's score
            //this.physics.remove.existing(this.ball)
        }

    }


    update() {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        //const body = this.paddleLeft.body

        var speed = 5
        //the ball can move in all eight directions
        if (this.cursors.up.isDown && this.cursors.left.isDown){
            this.ball.y -= speed
            this.ball.x -= speed
        } else if (this.cursors.up.isDown && this.cursors.right.isDown){
            this.ball.y -= speed
            this.ball.x += speed
        }else if (this.cursors.down.isDown && this.cursors.left.isDown){
            this.ball.y += speed
            this.ball.x -= speed
        }else if (this.cursors.down.isDown && this.cursors.right.isDown){
            this.ball.y += speed
            this.ball.x += speed
        } else if (this.cursors.up.isDown) {
            this.ball.y -= speed
        } else if (this.cursors.down.isDown) {
            this.ball.y += speed
        } else if (this.cursors.right.isDown){
            this.ball.x += speed
        } else if (this.cursors.left.isDown){
            this.ball.x -= speed
        }

        //const diff = this.ball.y - this.paddleRight.y
        // if (Math.abs(diff) < 10) {
        //     return
        // }
        
        if (this.ball.x <= 25) {
            //console.log(this.ball.x)
            //this.scoreLabel.x += 1
            // scored on left side
            //this.IncrementRightScore()
        } else if (this.ball.x > 830) {
            // scored on right side
            //this.IncrementLeftScore()
        }
    }
    
}