// script.js — Advanced interactions, animations, particles, parallax, SoundCloud control
document.addEventListener('DOMContentLoaded', () => {
  // Navbar popup on scroll (appears when scrolling down, disappears when at top)
  const navWrap = document.querySelector('.nav-wrap');
  let lastScrollY = 0;
  let scrollTimeout;
  
  function handleNavbarPopup() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 300) {
      navWrap.classList.add('visible');
      navWrap.classList.toggle('scrolled', currentScrollY > 50);
    } else {
      navWrap.classList.remove('visible');
      navWrap.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }
  
  window.addEventListener('scroll', handleNavbarPopup, {passive: true});
  handleNavbarPopup();

  // Scroll reveal with staggered animation
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, idx) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('in-view'), idx * 50);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.glass, .member-card, .service-card, .about-card, .logo-card, .testimonial-card').forEach(el => io.observe(el));

  // Parallax effect for hero and sections
  function parallax(){
    const y = window.scrollY;
    const bgAnim = document.getElementById('bg-anim');
    if(bgAnim) {
      bgAnim.style.transform = `translateY(${y * 0.5}px)`;
    }
  }
  window.addEventListener('scroll', parallax, {passive:true});

  // Simple nav active handling with smooth transitions
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  
  function onScroll(){
    const y = window.scrollY + innerHeight/3;
    sections.forEach((s, i) => {
      if (!s) return;
      const top = s.offsetTop;
      const bottom = top + s.offsetHeight;
      const isActive = y >= top && y < bottom;
      navLinks[i].classList.toggle('active', isActive);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth scroll behavior enhancement
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
      }
    });
  });

  // Particle background canvas animation
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  const count = Math.max(35, Math.floor((W*H)/90000));

  function rand(min, max){
    return Math.random() * (max - min) + min;
  }

  // Initialize particles with random properties
  for(let i = 0; i < count; i++){
    particles.push({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.4, 1.6),
      vx: rand(-0.2, 0.6),
      vy: rand(-0.1, 0.1),
      alpha: rand(0.06, 0.22),
      life: rand(0.5, 1),
      decay: rand(0.002, 0.005)
    });
  }

  function resize(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);

  function drawParticles(){
    ctx.clearRect(0, 0, W, H);
    for(const p of particles){
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      
      // Wrap around edges
      if(p.x > W + 20) p.x = -20;
      if(p.x < -20) p.x = W + 20;
      if(p.y > H + 20) p.y = -20;
      if(p.y < -20) p.y = H + 20;
      
      // Reset when faded
      if(p.alpha <= 0) {
        p.alpha = rand(0.06, 0.22);
        p.x = rand(0, W);
        p.y = rand(0, H);
      }
      
      ctx.beginPath();
      ctx.fillStyle = `rgba(225,29,47,${Math.max(0, p.alpha)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  requestAnimationFrame(drawParticles);

  // SoundCloud widget controls with enhanced error handling
  const playBtn = document.getElementById('sc-play');
  const pauseBtn = document.getElementById('sc-pause');
  const iframe = document.getElementById('sc-iframe');

  function withWidget(cb){
    if(window.SC && SC.Widget){
      cb(SC.Widget(iframe));
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://w.soundcloud.com/player/api.js';
    s.onload = () => {
      if(window.SC && SC.Widget) {
        cb(SC.Widget(iframe));
      }
    };
    s.onerror = () => console.warn('SoundCloud API failed to load');
    document.body.appendChild(s);
  }

  // Initialize SoundCloud widget if available
  withWidget(widget => {
    playBtn.addEventListener('click', () => {
      try {
        widget.play();
      } catch(e) {
        console.warn('Play failed:', e);
      }
    });
    
    pauseBtn.addEventListener('click', () => {
      try {
        widget.pause();
      } catch(e) {
        console.warn('Pause failed:', e);
      }
    });
    
    // Handle widget events
    if(widget.bind) {
      widget.bind(SC.Widget.Events.PLAY, () => {
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
      });
      widget.bind(SC.Widget.Events.PAUSE, () => {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
      });
    }
  });

  // Hide pause button by default
  if(pauseBtn) pauseBtn.classList.add('hidden');

  // Navigation backdrop blur on scroll
  const navWrap = document.querySelector('.nav-wrap');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if(navWrap) {
      navWrap.style.backdropFilter = y > 20 ? 'blur(12px) saturate(1.1)' : 'blur(0px)';
      navWrap.style.borderBottom = y > 20 ? '1.5px solid rgba(225,29,47,0.12)' : 'none';
    }
  }, {passive: true});

  // FAQ functionality - expand/collapse
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Store initial state
    let isOpen = true;
    
    if(question) {
      question.addEventListener('click', function(e) {
        e.preventDefault();
        isOpen = !isOpen;
        
        if(!isOpen) {
          answer.style.maxHeight = '0px';
          answer.style.opacity = '0';
          answer.style.overflow = 'hidden';
          answer.style.transition = 'all .3s ease';
        } else {
          answer.style.maxHeight = '500px';
          answer.style.opacity = '1';
          answer.style.overflow = 'visible';
          answer.style.transition = 'all .3s ease';
        }
      });
    }
  });

  // Pricing plan selection tracking
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach((card, idx) => {
    const button = card.querySelector('.btn');
    if(button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const planName = card.querySelector('h3').textContent;
        console.log('Selected plan:', planName);
        
        // Analytics tracking (replace with your analytics)
        if(window.gtag) {
          gtag('event', 'plan_selected', {
            'plan_name': planName
          });
        }
        
        // Navigate to contact form
        document.querySelector('#contact').scrollIntoView({behavior: 'smooth'});
      });
    }
  });

  // Case study interaction
  const caseStudies = document.querySelectorAll('.case-study');
  caseStudies.forEach(study => {
    study.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(225,29,47,0.15)';
    });
    study.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
    });
  });

  // Mobile responsive menu toggle
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    if(window.innerWidth < 750) {
      const navToggle = document.createElement('button');
      navToggle.className = 'nav-toggle';
      navToggle.innerHTML = '☰';
      navToggle.style.cssText = 'background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer;';
      // nav.insertBefore(navToggle, nav.querySelector('.nav-links'));
    }
  });

  // Form validation helper
  function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
  }

  // Contact form handling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if(!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'var(--accent)';
        } else if(input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          input.style.borderColor = 'var(--accent)';
        }
      });
      
      if(!isValid) {
        e.preventDefault();
        console.warn('Form validation failed');
      }
    });
  });

  // Performance monitoring
  if(window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('Page load time:', pageLoadTime + 'ms');
    });
  }

  // Accessibility enhancements
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.setAttribute('role', 'button');
    anchor.addEventListener('keypress', function(e) {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Dark mode toggle (optional feature)
  const darkModeToggle = () => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if(isDark) {
      document.body.classList.add('dark-mode');
    }
    
    // Listen for toggle button if it exists
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if(toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const shouldBeDark = !localStorage.getItem('darkMode');
        localStorage.setItem('darkMode', shouldBeDark ? 'true' : 'false');
        document.body.classList.toggle('dark-mode');
      });
    }
  };
  darkModeToggle();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if(href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offset = 80; // Navigation height
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Analytics integration placeholder
  const trackEvent = (eventName, eventData = {}) => {
    if(window.gtag) {
      gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
  };

  // Track user interactions
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
      trackEvent('cta_clicked', { button_text: this.textContent });
    });
  });

  // Lazy load images
  if('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const img = entry.target;
          if(img.getAttribute('data-src')) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Service worker registration for PWA support (optional)
  if('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // Memory management - cleanup on page unload
  window.addEventListener('beforeunload', () => {
    // Clear large objects
    particles.length = 0;
    canvas = null;
  });

  // Print styles support
  window.addEventListener('beforeprint', () => {
    document.body.style.background = '#fff';
    document.querySelectorAll('.glass').forEach(el => {
      el.style.background = '#f5f5f5';
    });
  });

  window.addEventListener('afterprint', () => {
    location.reload();
  });
});
