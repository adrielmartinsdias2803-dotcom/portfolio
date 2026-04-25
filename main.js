/**
 * Portfolio Elite - Main Interaction Script
 * Persona: Senior Frontend Architect
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initParticles();
  initTyping();
  initCounters();
  initScrollReveal();
  initTiltEffect();
});

// Reactive Cursor Glow
function initCursor() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  
  document.addEventListener('mousemove', e => {
    // Use requestAnimationFrame for smoother performance
    window.requestAnimationFrame(() => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  });
}

// Optimized Particle System
function initParticles() {
  const particlesEl = document.getElementById('particles');
  if (!particlesEl) return;
  
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.width = p.style.height = (Math.random() * 2 + 1) + 'px';
    p.style.opacity = Math.random() * 0.5 + 0.2;
    fragment.appendChild(p);
  }
  particlesEl.appendChild(fragment);
}

// Advanced Typing Effect
function initTyping() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;
  
  const phrases = [
    'Full Stack Developer',
    'Arquiteto de Sistemas',
    'Especialista em Automação',
    'UX/UI Design de Elite',
    'React & Node.js Expert'
  ];
  
  let pi = 0, ci = 0, deleting = false;
  
  function typeLoop() {
    const phrase = phrases[pi];
    if (!deleting) {
      typingEl.textContent = phrase.substring(0, ++ci);
      if (ci === phrase.length) { 
        deleting = true; 
        setTimeout(typeLoop, 2500); 
        return; 
      }
    } else {
      typingEl.textContent = phrase.substring(0, --ci);
      if (ci === 0) { 
        deleting = false; 
        pi = (pi + 1) % phrases.length; 
      }
    }
    setTimeout(typeLoop, deleting ? 30 : 70);
  }
  typeLoop();
}

// Intersection Observer for Counters
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = +el.dataset.count;
  let current = 0;
  const increment = Math.ceil(target / 40);
  
  const update = () => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      return;
    }
    el.textContent = current + '+';
    requestAnimationFrame(update);
  };
  update();
}

// Advanced Scroll Reveal
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Keep observing for staggered effects
      }
    });
  }, { threshold: 0.1 });
  
  revealEls.forEach(el => observer.observe(el));
}

// Premium Tilt Effect
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card, .stat, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Scroll Logic (Navbar, Progress Bar, Back to Top)
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  
  if (progressBar) {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }
  
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
});
