/**
 * CYBER-X 2077
 * PREMIUM INTERACTIVE CORE ENGINE
 * Redesigned from scratch to achieve award-winning standard
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial System Diagnostics & Preloader
  initPreloader();
  
  // 2. Interactive Audio Synth System (Web Audio API)
  initSoundEngine();

  // 3. Cyber Cursor Physics System
  initCustomCursor();

  // 4. Global Theme System (Dark / Light)
  initThemeEngine();

  // 5. Dynamic Background Particles & Connections
  initBackgroundCanvas();

  // 6. Three.js WebGL Holographic Neural Core
  initThreeJsHologram();

  // 7. Spotlight Hover Effects & 3D Tilt Cards
  initCardSpotlightAndTilt();

  // 8. Smart Navigation, ScrollSpy, Reading Progress
  initSmartNavbar();

  // 9. Interactive Chronology Timeline
  initTimelineScroller();

  // 10. Dashboard Eased Statistics Counters
  initStatsCounters();

  // 11. Immersive Gallery Lightbox
  initGalleryLightbox();

  // 12. Magnetic Element Tracking
  initMagneticElements();

  // 13. Newsletter Form Uplink
  initNewsletterForm();

  // 14. Sequential Scroll Reveals
  initSectionReveals();

  // 15. Dynamic HUD Scanning Overlay Injection
  injectScanlines();

  // 16. Dynamic Title Scrambler
  initTextScrambler();
});

/* ==========================================================================
   1. PRELOADER & TELEMETRY PROGRESS ENGINE
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderPercent = document.getElementById('loader-percent');
  const circleFill = document.getElementById('preloader-circle-fill');
  const statusText = document.getElementById('loader-status-text');
  const telemetryLogs = document.getElementById('loader-telemetry-logs');

  if (!preloader) return;

  const calibrationPhases = [
    { threshold: 15, text: "INITIALIZING BIO-SYNAPSE DRIVES..." },
    { threshold: 40, text: "CALIBRATING QUANTUM PROCESSOR NETWORKS..." },
    { threshold: 65, text: "DEPLAYING CEREBRAL MEMORY SHIELDS..." },
    { threshold: 85, text: "SYNCHRONIZING GLOBAL SOMATIC CORE..." },
    { threshold: 100, text: "NEURAL SINGULARITY ONLINE." }
  ];

  const telemetryLines = [
    "[SYS] Quantum grid: LOCKED",
    "[SYS] Optic link: ESTABLISHED",
    "[SYS] Sync rate: 99.99% PERFECT",
    "[SYS] Cybernetics: RE-CALIBRATED"
  ];

  let currentPercent = 0;
  
  const loaderInterval = setInterval(() => {
    // Add realistic jitter to progress increments
    const step = Math.floor(Math.random() * 8) + 2;
    currentPercent = Math.min(currentPercent + step, 100);
    
    // Update Percentage numbers
    if (loaderPercent) {
      loaderPercent.textContent = `${currentPercent.toString().padStart(2, '0')}%`;
    }

    // Update SVG Circle path stroke offsets (dasharray 283)
    if (circleFill) {
      const offset = 283 - (currentPercent / 100) * 283;
      circleFill.style.strokeDashoffset = offset;
    }

    // Update Status HUD message
    const phase = calibrationPhases.find(p => currentPercent <= p.threshold);
    if (phase && statusText) {
      statusText.textContent = phase.text;
    }

    // Append occasional telemetry messages
    if (currentPercent % 20 === 0 && currentPercent > 0 && telemetryLogs) {
      const lineIdx = Math.floor((currentPercent / 20) - 1) % telemetryLines.length;
      const newLine = document.createElement('span');
      newLine.textContent = telemetryLines[lineIdx];
      telemetryLogs.appendChild(newLine);
      if (telemetryLogs.children.length > 3) {
        telemetryLogs.removeChild(telemetryLogs.firstChild);
      }
    }

    // Completed
    if (currentPercent >= 100) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        preloader.classList.add('fade-out');
        // Let preloader sound cue trigger if enabled
        playSound('success');
        
        // Remove from DOM to preserve memory after anim completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 500);
    }
  }, 45);
}

/* ==========================================================================
   2. INTERACTIVE SYNTHESIZED SOUND ENGINE (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let audioEnabled = false;
let ambientOsc = null;
let ambientGain = null;

function initSoundEngine() {
  const toggleBtn = document.getElementById('audio-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    audioEnabled = !audioEnabled;
    toggleBtn.classList.toggle('playing', audioEnabled);
    
    if (audioEnabled) {
      toggleBtn.querySelector('.audio-label').textContent = "AUDIO ON";
      // Resume context if suspended (browser safety guidelines)
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      playAmbientDrone();
      playSound('success');
    } else {
      toggleBtn.querySelector('.audio-label').textContent = "AUDIO OFF";
      stopAmbientDrone();
    }
  });

  // Attach hover sounds to all interactive elements
  const interactiveElements = document.querySelectorAll('a, button, [data-tilt], .gallery-item-card, .social-icon-btn, .nav-toggle');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (audioEnabled) playSound('hover');
    });
    el.addEventListener('click', () => {
      if (audioEnabled) playSound('click');
    });
  });
}

function playSound(type) {
  if (!audioCtx || !audioEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'hover') {
    // High frequency short neon ping
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.05);
    gainNode.gain.setValueAtTime(0.015, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'click') {
    // Low pass cybernetic click beep
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  } else if (type === 'success') {
    // Elegant system validation beep sequence
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(900, now + 0.08);
    osc.frequency.setValueAtTime(1400, now + 0.16);
    gainNode.gain.setValueAtTime(0.03, now);
    gainNode.gain.setValueAtTime(0.03, now + 0.08);
    gainNode.gain.setValueAtTime(0.03, now + 0.16);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.start(now);
    osc.stop(now + 0.35);
  }
}

// Quiet background drone to simulate active cyberdeck
function playAmbientDrone() {
  if (!audioCtx) return;
  
  ambientOsc = audioCtx.createOscillator();
  ambientGain = audioCtx.createGain();
  
  // High-pass filter to keep it subtle and clean
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 150;

  ambientOsc.type = 'sine';
  ambientOsc.frequency.value = 55; // Low A frequency
  
  ambientGain.gain.setValueAtTime(0.008, audioCtx.currentTime);

  ambientOsc.connect(filter);
  filter.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  
  ambientOsc.start();
}

function stopAmbientDrone() {
  if (ambientOsc) {
    ambientOsc.stop();
    ambientOsc.disconnect();
    ambientOsc = null;
  }
  if (ambientGain) {
    ambientGain.disconnect();
    ambientGain = null;
  }
}

/* ==========================================================================
   3. CUSTOM CYBER CURSOR PHYSICS ENGINE
   ========================================================================== */
function initCustomCursor() {
  const cursorRing = document.getElementById('custom-cursor');
  const cursorGlow = document.getElementById('custom-cursor-glow');

  if (!cursorRing) return;

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let glowX = 0;
  let glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Physics animation loop using interpolation springs
  function updateCursorPosition() {
    // Spring delay on outer ring
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    // Outer glow moves even slower for volumetric parallax feel
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    if (cursorGlow) {
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(updateCursorPosition);
  }
  updateCursorPosition();

  // Attach hover events
  const interactiveTargets = document.querySelectorAll('a, button, [data-tilt], .gallery-item-card, .social-icon-btn, .nav-toggle');
  
  interactiveTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      cursorRing.classList.add('hovered');
    });
    target.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('hovered');
    });
  });

  window.addEventListener('mousedown', () => {
    cursorRing.classList.add('active');
  });

  window.addEventListener('mouseup', () => {
    cursorRing.classList.remove('active');
  });
}

/* ==========================================================================
   4. GLOBAL THEME ENGINE (Cyber-Dark vs. Cyber-Light)
   ========================================================================== */
function initThemeEngine() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  if (!themeToggle) return;

  // Restore cached settings or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlRoot.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    // Play theme transition cue
    if (audioEnabled) {
      playSound('success');
    }
  });
}

/* ==========================================================================
   5. DYNAMIC BACKGROUND PARTICLES & NETWORKS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let nodes = [];
  // Proportional node count to stay highly optimized
  const maxNodes = Math.min(80, Math.floor((width * height) / 20000));
  const linkDistance = 120;
  
  let mouse = { x: null, y: null, forceRadius: 180 };
  let clicks = [];
  let sparks = [];

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Emit interactive sparks on cursor move to create a dynamic particle trail
    if (Math.random() < 0.45) {
      sparks.push({
        x: mouse.x,
        y: mouse.y,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        size: Math.random() * 2.2 + 1,
        life: 1.0,
        decay: Math.random() * 0.04 + 0.02
      });
    }
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Capture mouse clicks to trigger cyber ripples
  window.addEventListener('click', (e) => {
    clicks.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: 240,
      growSpeed: 6
    });
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class NeuralNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.alpha = this.baseAlpha;
    }

    draw() {
      // Fetch dynamic colors matching active stylesheet properties
      const activeColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Handle boundaries bouncing
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Magnetic drag around cursor coordinates
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.forceRadius) {
          const force = (mouse.forceRadius - dist) / mouse.forceRadius;
          // Smooth drift pull vectors
          this.x += (dx / dist) * force * 0.8;
          this.y += (dy / dist) * force * 0.8;
          this.alpha = Math.min(1, this.baseAlpha + force * 0.5);
        } else {
          this.alpha = this.baseAlpha;
        }
      }

      // Handle click ripple physics push
      clicks.forEach(c => {
        const dx = this.x - c.x;
        const dy = this.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < c.radius + 30 && dist > c.radius - 30) {
          const force = 3.5;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      });

      this.draw();
    }
  }

  // Populate node grid
  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new NeuralNode());
  }

  // Main canvas render frame
  function renderCanvasFrame() {
    ctx.clearRect(0, 0, width, height);

    // Fetch theme details
    const theme = document.documentElement.getAttribute('data-theme');
    const strokeColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-line').trim();
    
    // Draw Holographic Background Matrix Grid
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 0.5;
    const size = 60;
    
    for (let x = 0; x < width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Process ripples
    clicks.forEach((c, idx) => {
      c.radius += c.growSpeed;
      const opacity = 1 - (c.radius / c.maxRadius);
      
      if (opacity <= 0) {
        clicks.splice(idx, 1);
        return;
      }

      const rippleColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      ctx.strokeStyle = rippleColor;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = opacity * 0.25;
      ctx.stroke();
    });

    // Process and draw dynamic cursor sparks trail
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life -= s.decay;

      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      const sparkColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fillStyle = sparkColor;
      ctx.globalAlpha = s.life * 0.75;
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Process nodes update
    nodes.forEach(n => n.update());

    // Connect Node Links (lines)
    const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < linkDistance) {
          const alpha = (1 - (dist / linkDistance)) * 0.1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Connect link to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const dx = nodes[i].x - mouse.x;
        const dy = nodes[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.forceRadius) {
          const alpha = (1 - (dist / mouse.forceRadius)) * 0.16;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderCanvasFrame);
  }
  renderCanvasFrame();
}

/* ==========================================================================
   6. THREE.JS WEBGL HOLOGRAPHIC NEURAL CORE (Hero Section)
   ========================================================================== */
function initThreeJsHologram() {
  const canvas = document.getElementById('hero-three-canvas');
  if (!canvas) return;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Setup WebGL Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3D Particles Plexus Core (Geometries)
  const particleCount = 200;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Distribute randomly inside a 3D sphere coordinate range
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.random() * 1.5 + 3.5; // Radius bounds

    particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
    particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    particlePositions[i + 2] = r * Math.cos(phi);
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Holographic Point Materials
  const theme = document.documentElement.getAttribute('data-theme');
  const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  
  const particleMat = new THREE.PointsMaterial({
    color: accentHex || 0x38bdf8,
    size: 0.12,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  // Outer orbital rings (Wireframes)
  const ringGeom = new THREE.TorusGeometry(5.2, 0.015, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.25,
    wireframe: true
  });
  
  const ring1 = new THREE.Mesh(ringGeom, ringMat);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const ring2 = new THREE.Mesh(ringGeom, ringMat);
  ring2.rotation.x = -Math.PI / 4;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  // Inner Core Sphere (Secondary wireframe core for mechanical complexity)
  const innerGeom = new THREE.IcosahedronGeometry(1.6, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const innerCore = new THREE.Mesh(innerGeom, innerMat);
  scene.add(innerCore);

  // Track Mouse movement to rotate 3D core (Parallax)
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    // Normalise mouse values from -0.5 to 0.5
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;
    
    targetRotationX = normY * 0.45;
    targetRotationY = normX * 0.45;
  });

  // Anim render loop
  function animateWebGL() {
    requestAnimationFrame(animateWebGL);

    // Constant orbital rotation
    particleSystem.rotation.y += 0.002;
    ring1.rotation.z += 0.003;
    ring2.rotation.z -= 0.004;

    // Counter-rotate inner core sphere
    innerCore.rotation.y -= 0.008;
    innerCore.rotation.x += 0.004;

    // Smooth lerp mouse coordinates rotation
    particleSystem.rotation.x += (targetRotationX - particleSystem.rotation.x) * 0.05;
    particleSystem.rotation.z += (targetRotationY - particleSystem.rotation.z) * 0.05;
    
    ring1.rotation.x += (targetRotationX - ring1.rotation.x) * 0.05;
    ring2.rotation.y += (targetRotationY - ring2.rotation.y) * 0.05;

    innerCore.rotation.x += (targetRotationX - innerCore.rotation.x) * 0.05;
    innerCore.rotation.y += (targetRotationY - innerCore.rotation.y) * 0.05;

    // Dynamically synchronize theme accent colors
    const activeAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    particleMat.color.set(activeAccent);
    
    const activePrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    ringMat.color.set(activePrimary);
    innerMat.color.set(activeAccent);

    renderer.render(scene, camera);
  }
  animateWebGL();

  // Responsive dimensions
  window.addEventListener('resize', () => {
    const newWidth = canvas.clientWidth;
    const newHeight = canvas.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

/* ==========================================================================
   7. SPOTLIGHT HOVER EFFECTS & 3D TILT CARDS
   ========================================================================= */
function initCardSpotlightAndTilt() {
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    // Track Spotlight Mouse Follow Gradients
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Perspective Tilt Mechanics
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate tilt bounds (Max tilt 12 degrees)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });
}

/* ==========================================================================
   8. SMART NAVIGATION, SCROLLSPY & READING PROGRESS
   ========================================================================== */
function initSmartNavbar() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('reading-progress');
  const bttBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section');

  if (!navbar) return;

  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Sticky navigation bar scaling
    if (scrollTop > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Auto-hide navigation on scroll down, reveal on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 400) {
      navbar.classList.add('hide-nav');
    } else {
      navbar.classList.remove('hide-nav');
    }
    lastScrollTop = scrollTop;

    // Reading Progress percentage computation
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progressPercent = (scrollTop / totalHeight) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }

    // Back-to-Top Core Button reveal
    if (bttBtn) {
      if (scrollTop > 500) {
        bttBtn.classList.add('active');
      } else {
        bttBtn.classList.remove('active');
      }
    }
  });

  // Active section highlighters (ScrollSpy) via IntersectionObserver
  const scrollspyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: '-10% 0px -40% 0px'
  });

  sections.forEach(sec => scrollspyObserver.observe(sec));

  // Back to top scroll execution
  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   9. INTERACTIVE CHRONOLOGY TIMELINE
   ========================================================================== */
function initTimelineScroller() {
  const timelineGrid = document.querySelector('.timeline-grid-container');
  const scrollProgress = document.getElementById('timeline-scroll-progress');
  const cards = document.querySelectorAll('.timeline-node-card');

  if (!timelineGrid) return;

  // Active chronological items highlighting
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('illuminated');
        if (audioEnabled) playSound('hover');
      } else {
        entry.target.classList.remove('illuminated');
      }

      // Track timeline scroll progression metrics
      const illuminatedCount = document.querySelectorAll('.timeline-node-card.illuminated').length;
      if (scrollProgress) {
        const progress = (illuminatedCount / cards.length) * 100;
        scrollProgress.style.width = `${progress}%`;
      }
    });
  }, {
    threshold: 0.45,
    rootMargin: '-5% 0px -25% 0px'
  });

  cards.forEach(card => timelineObserver.observe(card));
}

/* ==========================================================================
   10. DASHBOARD STATISTICS ENGINE (Cubic eased count-up)
   ========================================================================== */
function initStatsCounters() {
  const counterItems = document.querySelectorAll('.counter-numeric');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2200; // MS duration
        const startTimestamp = performance.now();
        const isDecimal = targetVal % 1 !== 0;

        function animateNumber(currentTimestamp) {
          const elapsed = currentTimestamp - startTimestamp;
          const progress = Math.min(elapsed / duration, 1);
          
          // Eased cubic out trajectory curves
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = targetVal * easedProgress;

          if (isDecimal) {
            el.textContent = currentVal.toFixed(2) + suffix;
          } else {
            el.textContent = Math.floor(currentVal).toLocaleString() + suffix;
          }

          if (progress < 1) {
            requestAnimationFrame(animateNumber);
          } else {
            // Confirm perfect final math matches
            el.textContent = isDecimal ? targetVal.toFixed(2) + suffix : targetVal.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(animateNumber);
        observer.unobserve(el); // Prevent infinite recalculations
      }
    });
  }, { threshold: 0.2 });

  counterItems.forEach(item => observer.observe(item));
}

/* ==========================================================================
   11. IMMERSIVE GALLERY LIGHTBOX VIEW
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('lightbox-container');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item-card');

  // Specs placeholders
  const fileVal = document.getElementById('lightbox-val-file');
  const sectorVal = document.getElementById('lightbox-val-sector');
  const specsVal = document.getElementById('lightbox-val-specs');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const title = item.querySelector('.gallery-item-title');
      const tag = item.querySelector('.gallery-tag');
      const category = item.getAttribute('data-category') || 'METROPOLIS CORE';
      const specText = item.getAttribute('data-spec') || 'VOLTAGE: ACTIVE | SECURE';

      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        // Update custom HUD telemetry specs
        if (fileVal) fileVal.textContent = `IMG_ARCHIVE_0${idx + 1}.PNG`;
        if (sectorVal) sectorVal.textContent = `${category} - ${title ? title.textContent : ''}`;
        if (specsVal) specsVal.textContent = specText;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Release scrollbars
  }

  closeBtn.addEventListener('click', closeLightbox);
  
  // Close on clicks outside image frame
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on keyboard Escape button
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   12. SPRING MAGNETIC ELEMENT SYSTEM
   ========================================================================== */
function initMagneticElements() {
  const magneticItems = document.querySelectorAll('.btn-magnetic');

  magneticItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Translate offsets vector
      const tiltFactor = parseFloat(item.getAttribute('data-tilt-factor')) || 1.0;
      const pullX = (x - centerX) * 0.35 * tiltFactor;
      const pullY = (y - centerY) * 0.35 * tiltFactor;

      item.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

/* ==========================================================================
   13. FUTURISTIC NEWSLETTER FORM UPLINK
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const status = document.getElementById('newsletter-status');

  if (!form || !input || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Reset styles
    status.className = "newsletter-status-msg";
    status.textContent = "";

    if (!validateEmail(email)) {
      status.classList.add('error');
      status.textContent = "> ERROR: UNRECOGNIZED NETRUNNER EMAIL FORMAT.";
      playSound('click');
      return;
    }

    // Simulate database secure sync
    status.classList.add('success');
    status.textContent = "> SYNAPSE COHERENCE KEY SYNCED TO UPLINK.";
    playSound('success');
    input.value = "";
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

/* ==========================================================================
   INTERSECT OBSERVER FOR SEQUENTIAL REVEALS
   ========================================================================== */
function initSectionReveals() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   15. DYNAMIC HUD SCANLINE OVERLAY INJECTION
   ========================================================================== */
function injectScanlines() {
  const cards = document.querySelectorAll('.glass-card, .tech-card, .gallery-item-card, .timeline-node-card');
  cards.forEach(card => {
    if (!card.querySelector('.scanline-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'scanline-overlay';
      card.appendChild(overlay);
    }
  });
}

/* ==========================================================================
   16. DYNAMIC CYBER DECODER SCRAMBLE TITLE EFFECT
   ========================================================================== */
function initTextScrambler() {
  const scrambleHeaders = document.querySelectorAll('.section-title');
  
  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  scrambleHeaders.forEach(el => scrambleObserver.observe(el));
}

function scrambleText(element) {
  const originalText = element.textContent.trim();
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.textContent = originalText.split("").map((char, index) => {
      if (char === " ") return char;
      if (index < iterations) return originalText[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");

    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
    iterations += 1;
  }, 30);
}

