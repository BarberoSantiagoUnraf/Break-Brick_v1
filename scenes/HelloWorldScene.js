export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("hello-world");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("sky", "./public/assets/space3.png");
    this.load.image("logo", "./public/assets/phaser3-logo.png");
    this.load.image("red", "./public/assets/particles/red.png");
  }

  create() {
    // create game objects
    this.add.image(400, 300, "sky");
    //crear el movimiento de la barra con las flechas
    this.cursors = this.input.keyboard.createCursorKeys();
    //Crear la barra
    this.bar = this.add.rectangle(
      400,
      this.scale.height - 100,
      120,
      20,
      0x00ff00
    );
    this.physics.add.existing(this.bar);
    this.bar.body.setCollideWorldBounds(true);
    this.bar.body.setImmovable(true);
    // crear la pelota
    this.ball = this.add.circle(400, 400, 16, 0xff0000);
    this.physics.add.existing(this.ball);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setCircle(16);
    this.ball.body.setVelocity(150, -150);
    //Crear los ladrillos
    this.bricks = [];
    const rows = 3;
    const cols = 8;
    const brickWidth = 64;
    const brickHeight = 32;
    const brickSpacing = 20;
    const offsetX = 112;
    const offsetY = 100;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * (brickWidth + brickSpacing);
        const y = offsetY + row * (brickHeight + brickSpacing);
        const brick = this.add.rectangle(
          x,
          y,
          brickWidth,
          brickHeight,
          0x0000ff
        );
        this.physics.add.existing(brick, true);
        this.bricks.push(brick);
      }
    }

    this.physics.add.collider(this.bar, this.ball, () => {
      let hitPos = this.ball.x;
      let paddleCenter = this.bar.x;
      let paddleWidth = 200;
      let maxBounceAngle = Phaser.Math.DegToRad(60);

      let relativeIntersect = (paddleCenter - hitPos);
      let normalizedIntersect = relativeIntersect / (paddleWidth/2);
      let bounceAngle = normalizedIntersect * maxBounceAngle;

      // velocidad de la bola
      let speed = this.ball.body.speed;

      // actualizar velocidades X e Y
      this.ball.body.setVelocityX(speed * -Math.sin(bounceAngle));
      this.ball.body.setVelocityY(speed * -Math.cos(bounceAngle));
    })
    this.bricks.forEach(brick => {
      this.physics.add.collider(brick, this.ball, () => {
        brick.destroy();
      });
    });
  }
  update() {
    let velocity = 200;
    this.bar.body.setVelocityX(0);
    if(this.cursors.left.isDown){
      this.bar.body.setVelocityX(-velocity);
    }
    if(this.cursors.right.isDown){
      this.bar.body.setVelocityX(velocity);
    }

  }
}
