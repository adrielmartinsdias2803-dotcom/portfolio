/**
 * Portfolio Elite - Main Interaction Script
 * Persona: Senior Frontend Architect
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCustomCursor();
  initMagneticButtons();
  initScrollProgress();
  initParticles();
  initTyping();
  initCounters();
  initTiltEffect();
  initContactAnimation();
  initHeroTextAnim();
  initDarkHeroAnim();
  initHeroParallax();
  initSectionTransitions();
  initProjectHub();
});

// ELITE: Global Refresh on Load
window.addEventListener('load', () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);
});

// ELITE: Custom Reactive Cursor & Background Glow Follower
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.id = 'customCursor';
  document.body.appendChild(cursor);

  // Reuse or create cursor glow
  let glow = document.getElementById('cursorGlow');
  if (!glow) {
    glow = document.createElement('div');
    glow.id = 'cursorGlow';
    document.body.appendChild(glow);
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    // Spring physics for "Elite" feel (delayed following)
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;

    cursor.style.left = '0px';
    cursor.style.top = '0px';
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    
    glow.style.left = '0px';
    glow.style.top = '0px';
    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover states for reactive cursor
  const updateInteractables = () => {
    const interactables = document.querySelectorAll('a, button, .bento-item, .comp-card, .project-hero-image, .pill');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  };
  updateInteractables();
  
  // Re-run for dynamic content if needed
  setTimeout(updateInteractables, 2000);
}

// ELITE: Magnetic Button Effect (Tactile feedback)
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-contact, .social-card, .nav-contact-btn, .pill');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

// ELITE: Top Scroll Progress Bar
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + "%";
  }, { passive: true });
}

// Optimized Particle System
function initParticles() {
  const particlesEl = document.getElementById('particles');
  if (!particlesEl) return;
  
  const fragment = document.createDocumentFragment();
  // ELITE: High-density atmospheric particles
  for (let i = 0; i < 120; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    // Randomize appearance
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    
    // Organic drifting animation
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * -30;
    p.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
    
    p.style.opacity = Math.random() * 0.4 + 0.1;
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

// Advanced Scroll Reveal (Removed in favor of unified GSAP transitions)
function initScrollReveal() {}

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

// Premium Anime.js Click Ripple Explosion
function initAnimeClickRipple() {
  if (typeof anime === 'undefined') return; // Guard in case CDN fails
  
  document.addEventListener('click', (e) => {
    // Avoid firing on links or buttons to not disrupt UX too much
    if (e.target.closest('a') || e.target.closest('button')) return;

    // Create explosion particles
    const colors = ['#c5a059', '#ffffff', '#4070f4'];
    for (let i = 0; i < 6; i++) {
      const circle = document.createElement('div');
      circle.style.position = 'fixed';
      circle.style.left = e.clientX + 'px';
      circle.style.top = e.clientY + 'px';
      circle.style.width = '6px';
      circle.style.height = '6px';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = colors[i % colors.length];
      circle.style.pointerEvents = 'none';
      circle.style.zIndex = '9999';
      circle.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(circle);
      
      anime({
        targets: circle,
        scale: [0, anime.random(1, 4)],
        translateX: [0, anime.random(-120, 120)],
        translateY: [0, anime.random(-120, 120)],
        opacity: [1, 0],
        duration: anime.random(800, 1500),
        easing: 'easeOutExpo',
        complete: () => circle.remove()
      });
    }
    
    // Create expanding pulse ring
    const pulse = document.createElement('div');
    pulse.style.position = 'fixed';
    pulse.style.left = e.clientX + 'px';
    pulse.style.top = e.clientY + 'px';
    pulse.style.width = '20px';
    pulse.style.height = '20px';
    pulse.style.borderRadius = '50%';
    pulse.style.border = '2px solid rgba(197, 160, 89, 0.8)';
    pulse.style.pointerEvents = 'none';
    pulse.style.zIndex = '9998';
    pulse.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(pulse);
    
    anime({
      targets: pulse,
      scale: [1, 8],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutCubic',
      complete: () => pulse.remove()
    });
  });
}

// Premium Contact Animation (Extraordinário)
function initContactAnimation() {
  const contactBox = document.querySelector('.contact-box');
  if (!contactBox) return;

  // Set initial hidden state so it doesn't blink before JS runs
  contactBox.style.opacity = '0';
  
  // Also hide buttons initially for stagger effect
  const buttons = document.querySelectorAll('.contact-buttons a');
  buttons.forEach(btn => btn.style.opacity = '0');

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (typeof anime !== 'undefined') {
        // 1. Box Bounces in
        anime({
          targets: contactBox,
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [0.9, 1],
          duration: 1200,
          easing: 'easeOutElastic(1, .8)'
        });
        
        // 2. Buttons stagger up
        anime({
          targets: buttons,
          opacity: [0, 1],
          translateY: [30, 0],
          delay: anime.stagger(150, {start: 400}),
          duration: 1000,
          easing: 'easeOutExpo'
        });
      } else {
        // Fallback if anime fails to load
        contactBox.style.opacity = '1';
        contactBox.style.transition = '1s';
        buttons.forEach(btn => btn.style.opacity = '1');
      }
      observer.disconnect(); // Only play once
    }
  }, { threshold: 0.3 }); // Triggers when 30% of the box is visible

  observer.observe(contactBox);
}

// Lenis Smooth Scroll Initialization (Unified GSAP Sync)
function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  // Sync GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

// Section-to-Section Transition & Background Shift
function initSectionTransitions() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section) => {
    // 1. Content Reveal on Scroll (More dramatic)
    const children = section.querySelectorAll('.container > div, .container > h2, .container > .project-header, .container > .project-hero-image');
    if (children.length > 0) {
      gsap.from(children, {
        scrollTrigger: {
          trigger: section,
          start: "top 98%", // Start earlier to prevent 'sudden' popping
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        onComplete: () => ScrollTrigger.refresh() // Ensure layout is synced
      });
    }

    // 2. Background Color Interpolation for "Extraordinary" Transitions
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      onEnter: () => updateBgColor(section),
      onEnterBack: () => updateBgColor(section)
    });

    // 3. Parallax for Project Numbers (Elite Sliding Effect)
    const number = section.querySelector('.project-number');
    if (number) {
      gsap.fromTo(number, 
        { x: -50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 20%",
            scrub: 1.5
          },
          x: 50,
          opacity: 0.3,
          ease: "power1.out"
        }
      );
    }
  });
}

function updateBgColor(section) {
  let color = "#000000"; // Pitch Black default
  
  if (section.id === 'historia') color = "#020202"; 
  if (section.id === 'competencias') color = "#000000";
  if (section.classList.contains('showcase-single')) color = "#050505"; // Very subtle gray for focus
  if (section.id === 'contato') color = "#020202";

  gsap.to('body', {
    backgroundColor: color,
    duration: 2,
    ease: "power2.inOut"
  });
}

// Dark Hero Entrance Animation
function initDarkHeroAnim() {
  const words = document.querySelectorAll('.dark-hero-title .word');
  if (!words.length) return;

  words.forEach(w => w.style.display = 'inline-block');

  // Words stagger
  gsap.fromTo(words, 
    { opacity: 0, y: 40, rotationX: -20 },
    { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.08, ease: "power3.out", delay: 0.2 }
  );

  // Other hero elements reveal
  gsap.fromTo('.hero-badge', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, delay: 0.1, ease: "power2.out" });
  gsap.fromTo('.dark-hero-description', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" });
  gsap.fromTo('.dark-hero-buttons', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" });
  gsap.fromTo('.dark-hero-footer', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: "power2.out" });
  
  // Right side reveal
  gsap.fromTo('.dark-hero-photo', { opacity: 0, filter: "brightness(0) blur(10px)" }, { opacity: 1, filter: "brightness(1) blur(0px)", duration: 2, delay: 0.5, ease: "power2.out" });
  gsap.fromTo('.hero-glass-card', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 1.5, ease: "back.out(1.5)" });
}

// Premium Staggered Text Reveal
function initHeroTextAnim() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;
  
  const text = nameEl.textContent;
  nameEl.innerHTML = text.split('').map(char => 
    `<span class="char" style="display:inline-block; opacity:0;">${char === ' ' ? '&nbsp;' : char}</span>`
  ).join('');

  anime({
    targets: '.hero-name .char',
    translateY: [100, 0],
    opacity: [0, 1],
    rotate: [15, 0],
    delay: anime.stagger(40, {start: 1200}),
    duration: 2000,
    easing: 'easeOutElastic(1, .6)'
  });
}

// Hero Portrait Parallax
function initHeroParallax() {
  const hero = document.querySelector('.split-hero');
  const portrait = document.querySelector('.hero-portrait');
  if (!hero || !portrait) return;

  hero.addEventListener('mousemove', (e) => {
    const xMove = (e.clientX - window.innerWidth / 2) / 40;
    const yMove = (e.clientY - window.innerHeight / 2) / 40;
    
    gsap.to(portrait, {
      x: xMove,
      y: yMove,
      rotationY: xMove / 10,
      rotationX: -yMove / 10,
      duration: 1.5,
      ease: "power2.out"
    });
  });
}

// ELITE: Project Hub Interaction (Tabs & Panels)
function initProjectHub() {
  const tabs = document.querySelectorAll('.project-tab');
  const panels = document.querySelectorAll('.project-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-project');
      if (tab.classList.contains('active')) return;

      // 1. Switch Tabs Visuals
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 2. Transition Panels
      const currentPanel = document.querySelector('.project-panel.active');
      const nextPanel = document.getElementById(`project-${target}`);

      if (currentPanel && nextPanel) {
        // Kill existing animations on panels to prevent 'popping'
        gsap.killTweensOf([currentPanel, nextPanel]);

        // 3. Cinematic Out Animation
        gsap.to(currentPanel, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            currentPanel.classList.remove('active');
            currentPanel.style.display = 'none';
            
            // 4. Setup next panel
            nextPanel.style.display = 'grid';
            nextPanel.classList.add('active');
            
            // 5. Extraordinary In Animation
            gsap.fromTo(nextPanel, 
              { opacity: 0, scale: 1.05, filter: "blur(20px)", y: 40 },
              { 
                opacity: 1, 
                scale: 1,
                filter: "blur(0px)",
                y: 0, 
                duration: 1, 
                ease: "expo.out",
                onComplete: () => ScrollTrigger.refresh()
              }
            );

            // 6. Stagger children reveal
            gsap.from(nextPanel.querySelectorAll('.project-hero-image, .detail-block, .project-gallery img'), {
              opacity: 0,
              y: 20,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });
      }
    });
  });
}
