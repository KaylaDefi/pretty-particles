const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let particlesArray = [];
const numberOfParticles = 150; 

let mouse = {
  x: null,
  y: null,
  radius: 100 
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

 
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY;
    }

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      if (mouse.x < this.x) {
        this.x += 3; 
      } else {
        this.x -= 3; 
      }
      if (mouse.y < this.y) {
        this.y += 3; 
      } else {
        this.y -= 3; 
      }
    }

    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let speedX = (Math.random() * 2) - 1;
    let speedY = (Math.random() * 2) - 1;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`; 
    particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

function animateParticles() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => particle.update());

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
