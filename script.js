document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const typingEl = document.getElementById('typing');
  const words = ["Web Developer", "Java Developer", "Frontend Developer", "React Enthusiast", "Software Developer"];
  let wordIndex = 0, charIndex = 0;

  function type() {
    if (charIndex < words[wordIndex].length) {
      typingEl.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 120);
    } else {
      setTimeout(erase, 1200);
    }
  }
  function erase() {
    if (charIndex > 0) {
      typingEl.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 70);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 300);
    }
  }
  type();

  // Smooth scroll & active nav
  const links = document.querySelectorAll('.nav-link');
  function onScroll() {
    const fromTop = window.scrollY + 120;
    document.querySelectorAll('section[id]').forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const a = document.querySelector('.nav-link[href="#' + section.id + '"]');
      if (a) {
        if (fromTop >= top && fromTop < bottom) {
          links.forEach(l => l.classList.remove('active'));
          a.classList.add('active');
        }
      }
    });
    document.getElementById('backTop').style.display = window.scrollY > 400 ? 'block' : 'none';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  links.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('nav-links').classList.remove('show');
    });
  });

  // mobile menu
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show');
  });

  // contact form mock
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('contact-status');
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = 'Message sent! I will reply soon.';
      form.reset();
    }, 900);
  });

  // back to top
  document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
function initParticles() { particles = []; for (let i = 0; i < 120; i++) { particles.push(new Particle()); } }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
initParticles(); animate();
addEventListener("resize", () => { canvas.width = innerWidth; canvas.height = innerHeight; initParticles(); });
