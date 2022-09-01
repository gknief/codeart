const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

canvas.addEventListener('click', (e) => {
  for(let i = 0; i < 20; i++) {
    atoms.push(new Atom(e.x, e.y));
  }
});

const animate = () => {
  atoms.forEach(atom => {
    atom.draw();
    atom.update();
  });
  requestAnimationFrame(animate);
}

animate();

class Atom {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 8 + 2;
    this.speedX = Math.random() * 4 - 2; // -2 +2
    this.speedY = Math.random() * 4 - 2; // -2 +2
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
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
