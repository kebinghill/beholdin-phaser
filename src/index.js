import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import CountDownController from './CountdownController';

class MyGame extends Phaser.Scene {
  /** @type {CountDownController} */
  countdown;

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

    // MONEY IMG
    this.load.image('money', 'assets/money.png');

    // NEXT WAVE BG IMG
    this.load.image('next-wave-bg', 'assets/next-wave-bg.png');

    // CARD SLOT IMGS
    this.load.image('card-slot-1', 'assets/card-slot-1.png');
    this.load.image('card-slot-2', 'assets/card-slot-2.png');
    this.load.image('card-slot-3', 'assets/card-slot-3.png');
    this.load.image('card-slot-4', 'assets/card-slot-4.png');

    // POTION IMG
    this.load.image('potion', 'assets/potion.png');

    // PLAY CARD IMGS
    this.load.image('treasure-card', 'assets/treasure-card.png');
    this.load.image('skulls-card', 'assets/skulls-card.png');
    this.load.image('spikes-card', 'assets/spikes-card.png');

    // BOSS CARD IMG
    this.load.image('boss-card', 'assets/boss-card.png');
  }

  create() {
    // BACKGROUND
    const bg = this.add.image(0, 0, 'background').setOrigin(0.0, 0.0);
    bg.displayWidth = this.sys.canvas.width;
    bg.displayHeight = this.sys.canvas.height;

    // SHOP
    this.add.image(600, 300, 'shop-bg').setScale(0.27, 0.27);

    // CARD SLOTS
    let cardSlots = this.physics.add.staticGroup();

    const slot1 = cardSlots
      .create(380, 270, 'card-slot-1')
      .setSize(125, 175)
      .setScale(0.27, 0.27);

    const slot2 = cardSlots
      .create(530, 270, 'card-slot-2')
      .setSize(125, 175)
      .setScale(0.27, 0.27);

    const slot3 = cardSlots
      .create(680, 270, 'card-slot-3')
      .setSize(125, 175)
      .setScale(0.27, 0.27);

    const slot4 = cardSlots
      .create(830, 270, 'card-slot-4')
      .setSize(125, 175)
      .setScale(0.27, 0.27);

    // TIMER
    const timerLabel = this.add
      .text(1010, 75, '45', { fontSize: 48 })
      .setOrigin(0.5);

    this.countdown = new CountDownController(this, timerLabel);
    this.countdown.start(this.handleCountdownFinished.bind(this), 30000);

    // POTION VALUE
    this.add.text(437, 495, 'x1', {
      fontSize: '20px',
      fill: '#000',
    });

    // CARD VALUES
    this.add.text(550, 470, 'x5', {
      fontSize: '22px',
      fill: '#000',
    });

    this.add.text(660, 470, 'x5', {
      fontSize: '22px',
      fill: '#000',
    });

    this.add.text(770, 470, 'x5', {
      fontSize: '22px',
      fill: '#000',
    });

    // MONEY
    this.add.image(530, 490, 'money').setScale(0.3, 0.3);
    this.add.image(640, 490, 'money').setScale(0.3, 0.3);
    this.add.image(750, 490, 'money').setScale(0.3, 0.3);

    this.add.image(425, 515, 'money').setScale(0.175, 0.175);

    this.add.image(975, 540, 'money').setScale(0.5, 0.5);

    let playerMoney = this.add.text(1010, 500, '0', {
      fontSize: '45px',
      fill: '#000',
    });

    // POTION & CARDS

    let potion = this.physics.add
      .sprite(400, 555, 'potion')
      .setSize(225, 250)
      .setScale(0.25, 0.25)
      .setInteractive({ useHandCursor: true });

    let treasureCard = this.physics.add
      .sprite(540, 575, 'treasure-card')
      .setSize(475, 700)
      .setScale(0.175, 0.175)
      .setInteractive({ useHandCursor: true });

    let skullsCard = this.physics.add
      .sprite(650, 575, 'skulls-card')
      .setSize(475, 700)
      .setScale(0.175, 0.175)
      .setInteractive({ useHandCursor: true });

    let spikesCard = this.physics.add
      .sprite(760, 575, 'spikes-card')
      .setSize(475, 700)
      .setScale(0.175, 0.175)
      .setInteractive({ useHandCursor: true });

    this.input.setDraggable([potion, treasureCard, skullsCard, spikesCard]);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    // NEXT WAVE
    this.add
      .image(215, 75, 'next-wave-bg')
      .setScale(0.2, 0.2)
      .setRotation(4.75);

    // BOSS CARD
    this.add.image(1010, 285, 'boss-card').setScale(0.2, 0.2);

    // BOSS HEALTH
    this.add.text(950, 135, '10/10 HP', {
      fontSize: '28px',
      fill: '#000',
    });

    this.physics.add.collider(
      cardSlots,
      [treasureCard, skullsCard, spikesCard],
      this.handleOnCardDragged,
      null,
      this
    );
  }

  handleCountdownFinished() {}

  handleOnCardDragged(cardSlots, playerCard) {
    const cardSlot = cardSlots.texture.key;
    const cardName = playerCard.texture.key;
  }

  update() {
    this.countdown.update();
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
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
