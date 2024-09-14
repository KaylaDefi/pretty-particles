// Select the canvas and set up the context for 2D rendering
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Adjust the canvas size when the window is resized
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(); // Reinitialize particles to fit the new size
});

// Store the particles in an array
let particlesArray = [];
const numberOfParticles = 150; // Increased number for more visual effect

// Mouse object to track user movement
let mouse = {
  x: null,
  y: null,
  radius: 100 // Radius of effect around the mouse
};

// Listen for mouse movement
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particle class to handle individual particles
class Particle {
  constructor(x, y, size, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  // Draw the particle on the canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update particle position and add mouse interaction
  update() {
    // Movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off the walls
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY;
    }

    // Mouse interactivity: calculate distance from mouse to particle
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the distance is less than the mouse radius, push the particles away
    if (distance < mouse.radius) {
      if (mouse.x < this.x) {
        this.x += 3; // Push the particle to the right
      } else {
        this.x -= 3; // Push the particle to the left
      }
      if (mouse.y < this.y) {
        this.y += 3; // Push the particle downwards
      } else {
        this.y -= 3; // Push the particle upwards
      }
    }

    this.draw();
  }
}

// Initialize the particles with random properties
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let speedX = (Math.random() * 2) - 1;
    let speedY = (Math.random() * 2) - 1;
    let color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    particlesArray.push(new Particle(x, y, size, color, speedX, speedY));
  }
}

// Animate the particles
function animateParticles() {
  // Fill the canvas with a dark background
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Dark background with slight opacity for blending effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  particlesArray.forEach(particle => particle.update());

  // Use requestAnimationFrame for smooth animation
  requestAnimationFrame(animateParticles);
}

// Initialize and start the animation
initParticles();
animateParticles();
