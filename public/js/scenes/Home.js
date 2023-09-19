export default class Home extends Phaser.Scene {
    preload() {
        this.load.image('bg', 'assets/bg.png')
        this.load.image('bg-particle-1', 'assets/bg-particle-1.png')
        this.load.image('bg-pillar-1', 'assets/bg-pillar-1.png')
        this.load.image('bg-pillar-2', 'assets/bg-pillar-2.png')
        this.load.image('fg-shadow', 'assets/fg-shadow.png')
        this.load.atlas('badFish', 'assets/bad-fishies/bad-spritesheet.png', 'assets/bad-fishies/bad-spritesheet.json')

    }

    //create the game
    create() { 
        this.physics.world.setBounds(0, 0, 4000, 3000)

        this.bg = this.add.tileSprite(0, 0, 5000, 5000, 'bg')
        .setOrigin(0)
        .setScrollFactor(0.5)
        .setDisplaySize(5000, 7000)
        .setPosition(0, -250)

    this.bgPillar2 = this.add.tileSprite(0, 0, 3000, 3000, 'bg-pillar-2')
        .setOrigin(0, 0)
        .setPosition(-600, -800)
        .setDisplaySize(5000, 5000)
        .setScrollFactor(.15)
        
    this.bgParticle1 = this.add.tileSprite(0,0, 4000, 3000, 'bg-particle-1')
        .setOrigin(0, 0)
        .setPosition(0, -200)
        .setTileScale(0.5, 0.5)
        .setScrollFactor(.5)

    this.bgPillar1 = this.add.tileSprite(300, 0, 3000, 2500, 'bg-pillar-1')
        .setOrigin(0, 0)
        .setPosition(-600, -400)
        .setDisplaySize(5000, 5000)
        .setScrollFactor(.3)

        this.cameras.main.setOrigin(0.5, 0.5)
        this.cameras.main.centerOn(2000, 1500)
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
            enemy.body.setCircle(350, 100, 0)
            enemy.play('badSwim')
        }

        this.fgShadow = this.add.tileSprite(0, 0, 3600, 3400, 'fg-shadow')
            .setOrigin(0, 0)
            .setPosition(-1200, -600)
            .setDisplaySize(5200, 4200)
            .setScrollFactor(.9)

    }

    update() {

    }
}