const { Wrap } = Phaser.Math
//const { black, white } = colors.hexColors;
const cellW = 100
const cellH = 100

export default class Game extends Phaser.Scene {

    //not sure what this does, but seems good to have
    preload()
    {
        this.load.image('userFish', 'assets/user-fish.png')
        this.load.image('enemies', 'assets/bad-fish.png')
        this.load.image('fishFood', 'assets/fish-food.png')
    }

    //create the game
    create() { 
       this.physics.world.setBounds(0, 0, 4000, 2500)

       //this.cameras.main.setZoom(0.5)

        //this.add.image(0, 0, 'bg')
        // const {width, height} = camera

        // const grid = this.add
        // .grid(0, 0, width + cellW, height + cellH, cellW, cellH)
        // .setAlpha(0.2)
        // .setOrigin(0, 0)
        // .setScrollFactor(0, 0)

        //USER FISH
        this.userFish = this.add.sprite(2000, 100, 'userFish')
        this.userFish.setScale(0.03)
        this.physics.add.existing(this.userFish) 
        this.userFish.body.setCollideWorldBounds(true, 1, 1)

        //FISH FOOD
        this.foodPieces = this.physics.add.staticGroup({
            key: 'fishFood',
            frameQuantity: 200,
            setScale: {x: 0.02, y: 0.02}
        }); 

        Phaser.Actions.RandomRectangle(this.foodPieces.getChildren(), new Phaser.Geom.Rectangle(50, 50, 3900, 2400))
        // for (var i = 0; i < 200; i++) {
        //     let x = Phaser.Math.RND.between(0, 4000);
        //     let y = Phaser.Math.RND.between(0, 2500);
        //     this.foodPieces.create(x, y); 
        // }

        //BAD FISHIES
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

        //SCORE
        let score = 0;
        this.scoreLabel = this.add.text(400, 50, 'Score: 0', {
            fontSize: 48,
            color: 'white'
        })

        this.scoreLabel.setScrollFactor(0, 0)
        this.scoreLabel.setOrigin(0.5, 0.5)

        this.cameras.main.startFollow(this.userFish)
        
        this.cursors = this.input.keyboard.createCursorKeys()

        //INTERACTIONS 
        this.physics.add.collider(this.userFish, this.foodPieces)
        this.physics.add.overlap (
            this.userFish, 
            this.foodPieces, 
            function eatFood(user, food) {
                food.disableBody(true, true);
                score += 10; 
                this.scoreLabel.setText('Score: ' + score);
                console.log(score)
            }, 
            null, 
            this);

        this.physics.add.collider(
            this.userFish, 
            this.enemies,
            function gameOver(user){
                console.log('game over')
            },
            null,
            this
        );
    }

    update() {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        //const body = this.paddleLeft.body

        var speed = 5
        //the ball can move in all eight directions
        if (this.cursors.up.isDown && this.cursors.left.isDown){
            this.userFish.y -= speed
            this.userFish.x -= speed
        } else if (this.cursors.up.isDown && this.cursors.right.isDown){
            this.userFish.y -= speed
            this.userFish.x += speed
        }else if (this.cursors.down.isDown && this.cursors.left.isDown){
            this.userFish.y += speed
            this.userFish.x -= speed
        }else if (this.cursors.down.isDown && this.cursors.right.isDown){
            this.userFish.y += speed
            this.userFish.x += speed
        } else if (this.cursors.up.isDown) {
            this.userFish.y -= speed
        } else if (this.cursors.down.isDown) {
            this.userFish.y += speed
        } else if (this.cursors.right.isDown){
            this.userFish.x += speed
        } else if (this.cursors.left.isDown){
            this.userFish.x -= speed
        }

        //const diff = this.ball.y - this.paddleRight.y
        // if (Math.abs(diff) < 10) {
        //     return
        // }
        
        if (this.userFish.x <= 25) {
            //console.log(this.ball.x)
            //this.scoreLabel.x += 1
            // scored on left side
            //this.IncrementRightScore()
        } else if (this.userFish.x > 830) {
            // scored on right side
            //this.IncrementLeftScore()
        }
    }
    
}