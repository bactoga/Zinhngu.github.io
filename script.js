// script.js — interactions, animations, particles, SoundCloud control
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.glass, .member-card, .service-card, .about-card').forEach(el => io.observe(el));

  // Simple nav active handling
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));
  function onScroll(){
    const y = window.scrollY + innerHeight/3;
    sections.forEach((s, i) => {
      if (!s) return;
      const top = s.offsetTop;
      const bottom = top + s.offsetHeight;
      navLinks[i].classList.toggle('active', y >= top && y < bottom);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Particle background
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  const count = Math.max(35, Math.floor((W*H)/90000));

  function rand(min,max){return Math.random()*(max-min)+min}
  for(let i=0;i<count;i++){
    particles.push({x:rand(0,W),y:rand(0,H),r:rand(0.4,1.6),vx:rand(-0.2,0.6),vy:rand(-0.1,0.1),alpha:rand(0.06,0.22)});
  }

  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
  window.addEventListener('resize',resize);

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x>W+20) p.x=-20; if(p.x<-20) p.x=W+20; if(p.y>H+20) p.y=-20; if(p.y<-20) p.y=H+20;
      ctx.beginPath();
      ctx.fillStyle = `rgba(225,29,47,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // SoundCloud widget controls
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
    s.onload = () => cb(SC.Widget(iframe));
    document.body.appendChild(s);
  }

  withWidget(widget => {
    playBtn.addEventListener('click', ()=> widget.play());
    pauseBtn.addEventListener('click', ()=> widget.pause());
    widget.bind(SC.Widget.Events.PLAY, () => {
      playBtn.classList.add('hidden'); pauseBtn.classList.remove('hidden');
    });
    widget.bind(SC.Widget.Events.PAUSE, () => {
      playBtn.classList.remove('hidden'); pauseBtn.classList.add('hidden');
    });
  });

  // small UX: hide pause by default until playing
  pauseBtn.classList.add('hidden');

  // Reduce nav opacity on scroll
  const navWrap = document.querySelector('.nav-wrap');
  let lastY = 0;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    navWrap.style.backdropFilter = y>20 ? 'blur(8px) saturate(1.05)' : 'blur(0px)';
    navWrap.style.borderBottom = y>20 ? '1px solid rgba(255,255,255,0.03)' : 'none';
    lastY = y;
  });
});
