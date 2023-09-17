const { Wrap } = Phaser.Math
//const { black, white } = colors.hexColors;
const cellW = 100
const cellH = 100

export default class Game extends Phaser.Scene {

    preload()
    {
        //this.load.spritesheet('userFish', 'assets/user-fishies/user-fish.png', 'assets/spritesheet-user.json')
        this.load.image('fishFood', 'assets/fish-food.png')
    }

    //create the game
    create() { 
       this.physics.world.setBounds(0, 0, 4000, 2500)

       this.gameOver = false

       const gameOverLabel2 = this.add.text(400, 450, 'Score saved!', {
          fontSize: 32,
          color: 'white'
       })

       gameOverLabel2.setScrollFactor(0, 0)
       gameOverLabel2.setOrigin(0.5, 0.5)
       gameOverLabel2.visible = false

       let isDatabaseFull = false

       //this.cameras.main.setZoom(0.5)

        //this.add.image(0, 0, 'bg')
        // const {width, height} = camera

        // const grid = this.add
        // .grid(0, 0, width + cellW, height + cellH, cellW, cellH)
        // .setAlpha(0.2)
        // .setOrigin(0, 0)
        // .setScrollFactor(0, 0)

        //USER FISH
        this.userFish = this.add.sprite(2000, 100, 'userFish', 0).setInteractive(); 
        this.userFish.setScale(0.03)
        this.physics.add.existing(this.userFish) 
        this.userFish.body.setCollideWorldBounds(true, 1, 1)

        this.userFish.on(cursor.isDown)
   
        //FISH FOOD
        this.foodPieces = this.physics.add.group({
            key: 'fishFood',
            frameQuantity: 200,
            setScale: {x: 0.02, y: 0.02}
        }); 

        Phaser.Actions.RandomRectangle(this.foodPieces.getChildren(), new Phaser.Geom.Rectangle(50, 50, 3900, 2400))

        //BAD FISHIES
        this.enemies = this.physics.add.group({
            key: 'enemies',
            frameQuantity: 10,
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
            velocityX: 1,
            velocityY: -1,
            setScale: {x: 0.03, y: 0.03}
        });

        for (const enemy of this.enemies.getChildren()) {
            let x = Phaser.Math.RND.between(50, 250);
            let y = Phaser.Math.RND.between(50, 250);
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
            this.gameOver = true
            this.gameOverLabel = this.add.text(400, 250, 'GAME OVER!', {
                fontSize: 100,
                color: 'white'
            })
    
            this.gameOverLabel.setScrollFactor(0, 0)
            this.gameOverLabel.setOrigin(0.5, 0.5)

            this.userFish.destroy()

            //was here
            
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
                       //window.location.assign('/')
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
    
         var speed = 5

        //the ball can move in all eight directions
        if (!this.gameOver){
            if (this.cursors.up.isDown && this.cursors.left.isDown){
                this.userFish.y -= speed
                this.userFish.x -= speed
                this.userFish.flipX = true;
            } else if (this.cursors.up.isDown && this.cursors.right.isDown){
                this.userFish.y -= speed
                this.userFish.x += speed
                this.userFish.flipX = false;
            }else if (this.cursors.down.isDown && this.cursors.left.isDown){
                this.userFish.y += speed
                this.userFish.x -= speed
                this.userFish.flipX = true;
            }else if (this.cursors.down.isDown && this.cursors.right.isDown){
                this.userFish.y += speed
                this.userFish.x += speed
                this.userFish.flipX = false;
            } else if (this.cursors.up.isDown) {
                this.userFish.y -= speed
            } else if (this.cursors.down.isDown) {
                this.userFish.y += speed
            } else if (this.cursors.right.isDown){
                this.userFish.x += speed
                this.userFish.flipX = false;
            } else if (this.cursors.left.isDown){
                this.userFish.x -= speed
                this.userFish.flipX = true;
            }
        }
        
    //     if (this.userFish.x <= 25) {
    //         //console.log(this.ball.x)
    //         //this.scoreLabel.x += 1
    //         // scored on left side
    //         //this.IncrementRightScore()
    //     } else if (this.userFish.x > 830) {
    //         // scored on right side
    //         //this.IncrementLeftScore()
    //     }
    }
}