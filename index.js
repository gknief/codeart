const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

// canvas.addEventListener('mousemove', (e) => {
//   for(let i = 0; i < 20; i++) {
//     atoms.push(new Atom(e.x, e.y));
//   }
// });

const animate = () => {
  atoms.forEach((atom, index) => {
    ctx.fillStyle = 'white';
    atom.draw();
    atom.updateSpeed();
    atom.updateSize();

    if (atom.radius < 0.3) {
      atoms.splice(index, 1);
    }

  });
  ctx.save();
  // ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillStyle = 'rgba(0,0,0,0.2)'
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  requestAnimationFrame(animate);
}

animate();

class Atom {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 2;
    this.speedX = Math.random() * 4 - 2; // -2 +2
    this.speedY = Math.random() * 4 - 2; // -2 +2
  }

  updateSpeed(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  updateSize(){
    this.radius -= 0.1;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

const point = {
  x: 0,
  y: 0

  // start from middle
  // x: canvas.width / 2,
  // y: canvas.height / 2
}

let degree = 0;

const generateAtoms = () => {
  // generate atoms in specific location
  // atoms.push(new Atom(point.x, point.y));
  // make atom go back and forth down along the middle of the canvas
  atoms.push(new Atom(canvas.width / 2 + (point.x * 200), canvas.height / 2 + (point.y * 200)));
  point.x = Math.cos(degree / 100 * Math.PI);
  // make atom go right
  // point.x += 1;
  // make atom go down
  // point.y += 1;

  // create a parabola effect
  point.y = point.x * point.x;

  degree++;
  requestAnimationFrame(generateAtoms);

  // generate random atoms
  // atoms.push(new Atom(Math.random() * canvas.width, Math.random() * canvas.height));
  // requestAnimationFrame(generateAtoms);
}

generateAtoms();

// canvas.addEventListener('mousemove', (e) => {
//   // console.log(e.x, e.y)
//   ctx.beginPath();
//   ctx.rect(e.x, e.y, 10, 10);
//   ctx.fill();
//   // ctx.stroke();
// })

// const degToRad = (deg) => {
//   return deg / 100 * Math.PI;
// }
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, degToRad(360));
// ctx.stroke();
