const { Wrap } = Phaser.Math
//const { black, white } = colors.hexColors;
const cellW = 100
const cellH = 100

export default class Game extends Phaser.Scene {

    preload()
    {
        //this.load.image('userFish', 'assets/user-fish.png')
        this.load.image('bg', 'assets/bg.png')
        this.load.image('bg-particle-1', 'assets/bg-particle-1.png')
        this.load.image('bg-border', 'assets/bg-border.png')
        this.load.image('bg-pillar-1', 'assets/bg-pillar-1.png')
        this.load.image('bg-pillar-2', 'assets/bg-pillar-2.png')
        this.load.image('fg-shadow', 'assets/fg-shadow.png')
        this.load.atlas('userFish', 'assets/user-fishies/user-spritesheet.png', 'assets/user-fishies/user-spritesheet.json')
        this.load.atlas('badFish', 'assets/bad-fishies/bad-spritesheet.png', 'assets/bad-fishies/bad-spritesheet.json')
        this.load.image('fishFood', 'assets/fish-food.png')
    }

    //create the game
    create() { 
        this.physics.world.setBounds(0, 0, 4000, 3000)
        
        this.bg = this.add.tileSprite(-200, -200, 7000, 3400, 'bg')
            .setOrigin(0)
            .setScrollFactor(0.5)
        // this.background1 = this.add.tileSprite(-200, -200, 8000, 6000, 'background-1')
        //     .setOrigin(0)
        //     .setScrollFactor(0.5)

        this.bgPillar2 = this.add.tileSprite(0, 0, 3000, 3000, 'bg-pillar-2')
            .setOrigin(0, 0)
            .setPosition(-600, -100)
            .setDisplaySize(3000, 1500)
            .setScrollFactor(.15)
            
        this.bgParticle1 = this.add.tileSprite(0,0, 4000, 3000, 'bg-particle-1')
            .setOrigin(0, 0)
            .setPosition(0, -200)
            .setTileScale(0.5, 0.5)
            .setScrollFactor(.5)

        this.bgPillar1 = this.add.tileSprite(300, 0, 4000, 3000, 'bg-pillar-1')
            .setOrigin(0, 0)
            .setPosition(-600, -500)
            .setDisplaySize(5200, 4200)
            .setScrollFactor(.25)
       
        this.bgBorder = this.add.image(2000, 1500, 'bg-border')
            .setOrigin(0, 0)
            .setPosition(-600, -500)
            .setDisplaySize(5200, 4200)
            .setScrollFactor(1)

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)    
        this.gameOver = false
            
        const gameOverLabel2 = this.add.text(400, 450, 'Score saved!', {
            fontSize: 32,
            color: 'white'
        })

        gameOverLabel2.setScrollFactor(0, 0)
        gameOverLabel2.setOrigin(0.5, 0.5)
        gameOverLabel2.visible = false

        let isDatabaseFull = false

        //USER FISH
        this.anims.create({
            key: 'swim',
            frames: 'userFish',
            frameRate: 10,
            repeat: -1
        })
        this.userFish = this.physics.add.sprite(2000, 1000).play('swim')
        this.userFish.body.setCollideWorldBounds(true, 1, 1)
        this.userFish.setScale(0.1)
        this.physics.add.existing(this.userFish) 
        this.userFish.body.setCircle(850, 1600, 900)
   
        //FISH FOOD
        this.foodPieces = this.physics.add.group({
            key: 'fishFood',
            frameQuantity: 200,
            setScale: {x: 0.02, y: 0.02}
        }); 

        Phaser.Actions.RandomRectangle(this.foodPieces.getChildren(), new Phaser.Geom.Rectangle(50, 50, 3900, 2400))

        for (const foodPiece of this.foodPieces.getChildren()) {
            foodPiece.body.setCircle(420, 50, 50)
        }

        //BAD FISHIES
        this.anims.create({
            key: 'badSwim',
            frames: 'badFish',
            frameRate: 10,
            repeat: -1
        })

        this.enemies = this.physics.add.group({
            key: 'enemies',
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: 1,
            velocityY: -1,
            setScale: {x: 0.1, y: 0.1}
        });
        
        for (const enemy of this.enemies.getChildren()) {
            let x = Phaser.Math.RND.between(50, 200);
            let y = Phaser.Math.RND.between(50, 200);
            enemy.setVelocity(x, y)
            enemy.body.setCircle(850, 1600, 900)
            enemy.play('badSwim')
        }

        this.fgShadow = this.add.tileSprite(0, 0, 3600, 3400, 'fg-shadow')
            .setOrigin(0, 0)
            .setPosition(-1200, -600)
            .setDisplaySize(5200, 4200)
            .setScrollFactor(.9)

        //SCORE
        let score = 0;
        this.scoreLabel = this.add.text(0, 80, 'Score: 0', {
            fontSize: 48,
            color: '#c2c675'
        })
        
        this.scoreLabel.setScrollFactor(0, 0)
        this.scoreLabel.setOrigin(0.5, 0.5)

        this.cameras.main.startFollow(this.userFish)
        
        this.cursors = this.input.keyboard.createCursorKeys()

        //INTERACTIONS 
        this.physics.add.overlap (
            this.userFish, 
            this.foodPieces, 
            function eatFood(user, food) {
                food.disableBody(true, true);
                score += 10; 
                this.scoreLabel.setText('Score: ' + score);
                //console.log(score)
            }, 
            null, 
            this);

        this.physics.add.collider(
            this.userFish, 
            this.enemies,
            gameOver,
            null,
            this
        );

        function gameOver(){
            this.gameOver = true;
    
            const camera = this.cameras.main;
            
            this.gameOverLabel = this.add.text(camera.width / 2, camera.height / 2, 'GAME OVER!', {
                fontSize: 150,
                color: '#c2c675'
            })
            .setOrigin(0.5, 0.5)
            const offset = this.gameOverLabel.height / 2 + 50
            this.spaceLabel = this.add.text(camera.width / 2, (camera.height / 2) + offset, 'Press space to continue.', {
                fontSize: 50,
                color: '#c2c675'
            })
            .setOrigin(0.5, 0.5)
    
            this.gameOverLabel.setScrollFactor(0, 0)
            this.gameOverLabel.setOrigin(0.5, 0.5)
            
            this.spaceLabel.setScrollFactor(0,0)
            this.spaceLabel.setOrigin(0.5, 0.5)

            this.userFish.destroy()
        
            checkDatabase()
        }

        function checkDatabase(){

            fetch('/api/scores/score-count').
            then(response => {
                if(response.status === 200){
                    
                    return response.json()
                } else {
                    alert(response.status)
                }
            })
            .then(result => {
                const scoreCount = result[0].score_count

                //the database is full
                if (scoreCount >= 100){
                    isDatabaseFull = true
                    checkScore()
                } else {
                    updateScore()
                }
            })
            .catch (err => console.log(err))
            
        }

        function checkScore(){
            fetch('/api/scores/lowest-score').
            then(response => {
                if(response.status === 200){
                    
                    return response.json()
                } else {
                    alert(response.status)
                }
            })
            .then(result => {
                const lowestScore = result.score
                console.log(result)
                if (score > lowestScore){
                    updateScore(result.id)
                }
                
            })
            .catch (err => console.log(err))
            //compare it to the current score
            //if higher, update the old score to the new one
            //else, discard the new score, and don't print the 'saving score' message
        }

        function updateScore(id){
            const scoreObject = {
                score
            }

            if (isDatabaseFull){
                fetch(`/api/scores/update-score/${id}` , {
                    method: 'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(scoreObject)
                }).then(response => {
                    if(response.status === 200){
                        console.log('score updated')
                    } else {
                        alert(response.status)
                    }
                })
                .catch (err => console.log(err))

            } else {
                fetch('/api/scores/add-score', {
                   method: 'POST',
                   headers: {
                       'Content-Type':'application/json'
                   },
                   body: JSON.stringify(scoreObject)
               }).then(response => {
                   if(response.status === 201){
                       console.log('score added')
                   } else {
                       alert(response.status)
                   }
               })
               .catch (err => console.log(err))
            }
        }
    }

    update() {
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        this.scoreLabel.x = this.cameras.main.width / 2
        this.bg.setTilePosition(this.cameras.main.scrollX)
        this.bgParticle1.setTilePosition(this.cameras.main.scrollX * 0.5, this.cameras.main.scrollY * 0.5)
        this.bgPillar1.setTilePosition(this.cameras.main.scrollX * 0.7, this.cameras.main.scrollY * 0.25) 
        this.bgPillar2.setTilePosition(this.cameras.main.scrollX * 0.75, this.cameras.main.scrollY * 0.15) 
        this.fgShadow.setTilePosition(this.cameras.main.scrollX * 0.8, this.cameras.main.scrollY * 0.1) 

        //the ball can move in all eight directions
        if (!this.gameOver){
            const speed = 10
            const offsetXRight = 1600
            const offsetXLeft = 800
            const offsetY = 900
            if (this.cursors.up.isDown && this.cursors.left.isDown){
                this.userFish.y -= speed
                this.userFish.x -= speed
                this.userFish.flipX = true
                this.userFish.body.setCircle(850, offsetXLeft, offsetY)
            } else if (this.cursors.up.isDown && this.cursors.right.isDown){
                this.userFish.y -= speed
                this.userFish.x += speed
                this.userFish.flipX = false
                this.userFish.body.setCircle(850, offsetXRight, offsetY)
            }else if (this.cursors.down.isDown && this.cursors.left.isDown){
                this.userFish.y += speed
                this.userFish.x -= speed
                this.userFish.flipX = true
                this.userFish.body.setCircle(850, offsetXLeft, offsetY)
            }else if (this.cursors.down.isDown && this.cursors.right.isDown){
                this.userFish.y += speed
                this.userFish.x += speed
                this.userFish.flipX = false
                this.userFish.body.setCircle(850, offsetXRight, offsetY)
            } else if (this.cursors.up.isDown) {
                this.userFish.y -= speed
            } else if (this.cursors.down.isDown) {
                this.userFish.y += speed
            } else if (this.cursors.right.isDown){
                this.userFish.x += speed
                this.userFish.flipX = false
                this.userFish.body.setCircle(850, offsetXRight, offsetY)
            } else if (this.cursors.left.isDown){
                this.userFish.x -= speed
                this.userFish.flipX = true
                this.userFish.body.setCircle(850, offsetXLeft, offsetY)
            }
        } else if (this.gameOver && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.restart()
        }
    }
}