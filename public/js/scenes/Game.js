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

       //this.cameras.main.setZoom(0.5)

        //this.add.image(0, 0, 'bg')
        this.add.image(x, y, 'enemies')
        // const {width, height} = camera

        // const grid = this.add
        // .grid(0, 0, width + cellW, height + cellH, cellW, cellH)
        // .setAlpha(0.2)
        // .setOrigin(0, 0)
        // .setScrollFactor(0, 0)

        //will be a fish soon
        this.ball = this.add.circle(2000, 1250, 30, 0x0f4d12, 1)
        this.physics.add.existing(this.ball)
        //this.ball.body.setBounce(1, 1)
        
        //can't leave world, stays 
        this.ball.body.setCollideWorldBounds(true, 1, 1)

        //fish food starts here
        this.foodPieces = this.physics.add.group(); //Why won't the group accept the white circles??

        for (var i = 0; i < 200; i++) {
            var x = Phaser.Math.RND.between(0, 4000);
            var y = Phaser.Math.RND.between(0, 2500);
            this.foodPieces.create(); //Why won't these circles be part of the group?? this.add.circle(x, y, 5, 0xffffff, 1)
        }

        Phaser.Actions.RandomRectangle(
            this.foodPieces.getChildren(), 
            { 
                x: 0, 
                y: 0, 
                width: 4000, 
                height: 2500 
            });
       
        this.physics.add.overlap (
            this.ball, 
            this.foodPieces,
            null,
            function eatFood (ball, foodPieces) {
                foodPieces.disableBody(true, true);
                score += 10; 
                //this.scoreLabel.setText('Score: ' + this.score)
                console.log(score)
            }
         );

        //enemy fishies start here 
        // this.enemies = this.physics.add.group();

        // for (var i = 0; i < 50; i++) {
        //     var x = Phaser.Math.RND.between(0, 800);
        //     var y = Phaser.Math.RND.between(0, 600);
        //     this.enemies.create(x, y, 'ball');
        // }

        // this.physics.add.collider(this.enemies)
        // this.physics.add.collider(this.ball, this.enemies, meetEnemy, null, this)

        // function meetEnemy(ball, enemies) {
        //     enemies.disableBody(true, true);
        //     score += 100; 
        //     this.scoreLabel.setText('Score: ' + score)
        // }

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