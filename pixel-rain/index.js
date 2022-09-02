const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'curry.png';
// img.src = 'valorant.png';

let brightnessArr = [];
let particlesArr = [];
let rgbArr = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.brightness = 0;
    this.velocity = Math.random() * 3 + 0.1;
    this.radius = Math.random() * 1.5 + 1;
  }

  update() {
    this.y += this.velocity;
    if (this.y >= canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.brightness = brightnessArr[ Math.floor(this.y-1) * canvas.width + Math.floor(this.x) ]
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = rgbArr[ Math.floor(this.y-1) * canvas.width + Math.floor(this.x) ];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  }

}

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0,0, canvas.width, canvas.height);
  const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  // ctx.clearRect(0,0,canvas.width,canvas.height);
  console.log(imgData.data); //rgba 0-255

  for (let i = 0; i < imgData.data.length; i++) {
    const red = imgData.data[i*4];
    const green = imgData.data[(i*4) + 1];
    const blue = imgData.data[(i*4) + 2];
    const brightness = (red + green + blue) / 3;

    brightnessArr.push(brightness);
    rgbArr.push(`rgb(${red}, ${green}, ${blue})`);
  }

  // generate 10k particles
  for (let i = 0; i < 10000; i++) {
    particlesArr.push(new Particle())
  }

  const animate = () => {
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particlesArr.forEach(particle => {
      particle.update();
      ctx.globalAlpha = particle.brightness * 0.002;
      particle.draw();
    });

    requestAnimationFrame(animate);

  }

  animate();
}