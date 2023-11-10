import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    //  This is an example of a bundled image:
    // this.load.image('logo', logoImg);

    // BACKGROUND IMG
    this.load.image('background', 'assets/ingame-bg.png');

    // SHOP BG IMG
    this.load.image('shop-bg', 'assets/shop-bg.png');

    // NEXT WAVE BG IMG
    this.load.image('next-wave-bg', 'assets/next-wave-bg.png');

    // CARD SLOT IMGS
    this.load.image('card-slot-1', 'assets/card-slot-1.png');
    this.load.image('card-slot-2', 'assets/card-slot-2.png');
    this.load.image('card-slot-3', 'assets/card-slot-3.png');
    this.load.image('card-slot-4', 'assets/card-slot-4.png');
  }

  create() {
    // BACKGROUND
    const bg = this.add.image(0, 0, 'background').setOrigin(0.0, 0.0);
    bg.displayWidth = this.sys.canvas.width;
    bg.displayHeight = this.sys.canvas.height;

    // SHOP
    this.add.image(600, 300, 'shop-bg').setScale(0.27, 0.27);

    // NEXT WAVE
    const nextWaveBg = this.add
      .image(215, 75, 'next-wave-bg')
      .setScale(0.2, 0.2)
      .setRotation(4.75);

    // CARD SLOTS
    this.add.image(380, 270, 'card-slot-1').setScale(0.27, 0.27);
    this.add.image(530, 270, 'card-slot-2').setScale(0.27, 0.27);
    this.add.image(680, 270, 'card-slot-3').setScale(0.27, 0.27);
    this.add.image(830, 270, 'card-slot-4').setScale(0.27, 0.27);

    // const logo = this.add.image(400, 150, 'logo');

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1,
    // });
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1200,
    height: 600,
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
