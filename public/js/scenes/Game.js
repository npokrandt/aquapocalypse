const { Wrap } = Phaser.Math
//const { black, white } = colors.hexColors;

const cellW = 100
const cellH = 100

export default class Game extends Phaser.Scene {

    //not sure what this does, but seems good to have
    preload()
    {
        //this.load.image('fishFood', 'assets/fishFood.png')
    }

    //create the game
    create() { 
       // this.physics.world.setBounds(0, 0, 10000, 10000)

        //this.add.image(0, 0, 'bg')

        // const {width, height} = camera

        // const grid = this.add
        // .grid(0, 0, width + cellW, height + cellH, cellW, cellH)
        // .setAlpha(0.2)
        // .setOrigin(0, 0)
        // .setScrollFactor(0, 0)

        //will be a fish soon
        this.ball = this.add.circle(400, 250, 30, 0x0f4d12, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setBounce(1, 1)
        
        //can't leave world, stays 
        this.ball.body.setCollideWorldBounds(true, 1, 1)

        let score = 0;
        this.scoreLabel = this.add.text(400, 50, 'Score: 0', {
            fontSize: 48,
            color: 'white'
        })

        this.scoreLabel.setOrigin(0.5, 0.5)

        this.cameras.main.startFollow(this.ball)
        //this.cameras.main.startFollow(scoreLabel)
        
        this.cursors = this.input.keyboard.createCursorKeys()

        //fishFood starts here
        this.fishFood = this.physics.add.group();
       
        for (var i = 0; i < 20; i++) {
            var x = Phaser.Math.RND.between(0, 800);
            var y = Phaser.Math.RND.between(0, 600);
            this.fishFood.create(x, y, 'ball');
        }

        this.physics.add.collider(this.fishFood);
        this.physics.add.overlap(this.ball, this.fishFood, collectFood, null, this);

        function collectFood (ball, fishFood) {
            fishFood.disableBody(true, true);
            score += 10;
            this.scoreLabel.setText('Score: ' + score);
        }
    }

    update() {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        //const body = this.paddleLeft.body

        //the ball can move in all eight directions
        if (this.cursors.up.isDown && this.cursors.left.isDown){
            this.ball.y -= 1
            this.ball.x -= 1
            this.scoreLabel.x -= 1
            this.scoreLabel.y -= 1
        } else if (this.cursors.up.isDown && this.cursors.right.isDown){
            this.ball.y -= 1
            this.ball.x += 1
            this.scoreLabel.x += 1
            this.scoreLabel.y -= 1
        }else if (this.cursors.down.isDown && this.cursors.left.isDown){
            this.ball.y += 1
            this.ball.x -= 1
            this.scoreLabel.x -= 1
            this.scoreLabel.y += 1
        }else if (this.cursors.down.isDown && this.cursors.right.isDown){
            this.ball.y += 1
            this.ball.x += 1
            this.scoreLabel.x += 1
            this.scoreLabel.y += 1
        } else if (this.cursors.up.isDown) {
            this.ball.y -= 1
            this.scoreLabel.y -= 1
            //body.updateFromGameObject()
        } else if (this.cursors.down.isDown) {
            this.ball.y += 1
            this.scoreLabel.y += 1
            //body.updateFromGameObject()
        } else if (this.cursors.right.isDown){
            this.ball.x += 1
            this.scoreLabel.x += 1
        } else if (this.cursors.left.isDown){
            this.ball.x -= 1
            this.scoreLabel.x -= 1
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