const microphone = new Microphone();

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ball {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = 'white';
    this.jumpForce = 0;
    this.fallForce = 0.1;
    this.isFalling = true;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  fall() {
    this.jumpForce = 0;
    this.y += this.fallForce;
    this.fallForce += 0.05;
  }

  jump() {
    this.fallForce = 0;
    this.y -= this.jumpForce;
    this.jumpForce -= 0.05;
  }

  changeColors() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
    this.color = rgb;
  }

  // revertColors() {
  //   this.color = 'white';
  // }
}

let balls = [];

const generateBalls = () => {
  const distance = 30;
  const amountOfBalls = (canvas.width / distance) - 2;
  for (let i = 0; i < amountOfBalls; i++) {
    balls.push(new Ball(distance + (i*distance), 500));
  }
}

generateBalls();

const animate = () => {
  if (microphone.initialized) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const samples = microphone.getSamples();
    
    balls.forEach((ball, index) => {
      if (ball.isFalling && ball.y < canvas.height / 2) {
        ball.fall();
        // ball.changeColors();
      } else if (ball.y > canvas.height / 2) {
        ball.isFalling = false;
        ball.jumpForce = Math.abs(samples[index]) * 10;
        // ball jump force
        // ball.revertColors();
      }
      
      if (ball.isFalling == false) {
        ball.jump();
        if (ball.jumpForce <= 0) {
          ball.isFalling = true;
          ball.changeColors();
        }
      }
      ball.draw();
    })
  }
  requestAnimationFrame(animate);
}

animate();