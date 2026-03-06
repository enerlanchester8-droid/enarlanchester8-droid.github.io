/* ═══════════════════════════════════════════
   CHESTER ENARLAN PORTFOLIO — JAVASCRIPT
═══════════════════════════════════════════ */

// ── NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ── MOBILE MENU ────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = menuBtn.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── SMOOTH SCROLL ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── SCROLL REVEAL ──────────────────────────
const revealElements = () => {
  const elements = document.querySelectorAll(
    '.about-card, .skills-category, .project-card, .contact-card, .contact-form, .section-header, .about-text, .about-visual, .about-info-grid, .extra-tag'
  );
  elements.forEach(el => el.classList.add('reveal'));
};

revealElements();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ─────────────────────
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else counter.textContent = target;
    };
    requestAnimationFrame(step);
  });
};

const heroSection = document.getElementById('home');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (heroSection) counterObserver.observe(heroSection);

// ── SKILL BARS ────────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach((fill, i) => {
        const width = fill.dataset.width || '0';
        setTimeout(() => {
          fill.style.width = width + '%';
        }, i * 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-category').forEach(cat => skillObserver.observe(cat));

// ── PROJECT FILTER ────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeSlideUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── CONTACT FORM ──────────────────────────
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate async send
    setTimeout(() => {
      btn.innerHTML = '<span>✓ Message Sent!</span>';
      btn.style.background = '#4ade80';
      btn.style.color = '#000';
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        btn.style.opacity = '';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }, 1200);
  });
}

// ── ACTIVE NAV LINK ───────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ── CURSOR EFFECT (subtle) ────────────────
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,0.6); pointer-events: none; z-index: 99999;
  transition: transform 0.2s ease, opacity 0.3s ease;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(cursor);

const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed; width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15); pointer-events: none; z-index: 99998;
  transition: left 0.15s ease, top 0.15s ease, transform 0.3s ease;
  transform: translate(-50%, -50%);
`;
document.body.appendChild(trail);

let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  trail.style.left = cursorX + 'px';
  trail.style.top = cursorY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
  trail.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  trail.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Hide on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  trail.style.display = 'none';
}

// ── TILT EFFECT ON PROJECT CARDS ──────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ── INITIAL REVEAL ────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
  animateCounters();
});
