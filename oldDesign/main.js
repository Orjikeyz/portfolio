// DOM Elements
const loader = document.getElementById('loader');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const typewriterElement = document.getElementById('typewriter');
const backToTopBtn = document.getElementById('back-to-top');
const currentYearElement = document.getElementById('current-year');
const contactForm = document.getElementById('contact-form');
const skillsScene = document.getElementById('skills-3d-scene');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Loader Animation
let progress = 0;
const fakeLoading = setInterval(() => {
  progress += Math.floor(Math.random() * 10) + 1;
  if (progress > 100) progress = 100;
  
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}%`;
  
  if (progress === 100) {
    clearInterval(fakeLoading);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      startAnimations();
    }, 500);
  }
}, 200);

// Header Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    backToTopBtn.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTopBtn.classList.remove('visible');
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Theme Toggle
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  setTheme(true);
}

// Theme toggle event listeners
themeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-theme'));
});

mobileThemeToggle.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-theme'));
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent successfully!');
      contactForm.reset();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Animation on Scroll
function startAnimations() {
  // Typewriter effect
  if (typewriterElement) {
    setTimeout(() => {
      typeWriter(typewriterElement, 'Full Stack Developer');
    }, 500);
  }
  
  // Animate elements with data-aos attribute
  const aosElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const aosAnimation = element.getAttribute('data-aos');
        const aosDelay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
          element.classList.add(aosAnimation);
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, aosDelay);
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  aosElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
  
  // Initialize skill progress bars
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const width = element.style.width;
        
        element.style.width = '0';
        setTimeout(() => {
          element.style.width = width;
        }, 100);
        
        skillObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    bar.style.width = '0';
    skillObserver.observe(bar);
  });
}

// 3D Background with Three.js
function initThreeJSBackground() {
  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  
  const posArray = new Float32Array(particlesCount * 3);
  const colorsArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    // Position
    posArray[i] = (Math.random() - 0.5) * 50;
    
    // Colors
    if (i % 3 === 0) {
      // R value - primary color
      colorsArray[i] = 156/255; // Purple
    } else if (i % 3 === 1) {
      // G value
      colorsArray[i] = 39/255;
    } else {
      // B value
      colorsArray[i] = 176/255;
    }
    
    // Randomly use accent color for some particles
    if (Math.random() > 0.7) {
      if (i % 3 === 0) {
        colorsArray[i] = 255/255; // Pink
      } else if (i % 3 === 1) {
        colorsArray[i] = 64/255;
      } else {
        colorsArray[i] = 129/255;
      }
    }
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Position camera
  camera.position.z = 30;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0003;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}

// Initialize 3D Skills Visualization
function init3DSkills() {
  if (!skillsScene) return;
  
  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, skillsScene.clientWidth / skillsScene.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  
  renderer.setSize(skillsScene.clientWidth, skillsScene.clientHeight);
  skillsScene.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);
  
  // Create skill nodes
  const frontendSkills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Vue.js', level: 80 },
    { name: 'TypeScript', level: 85 }
  ];
  
  const backendSkills = [
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'PostgreSQL', level: 70 },
    { name: 'GraphQL', level: 65 }
  ];
  
  const toolsSkills = [
    { name: 'Git', level: 90 },
    { name: 'Webpack', level: 75 },
    { name: 'Docker', level: 60 },
    { name: 'AWS', level: 65 },
    { name: 'Figma', level: 70 }
  ];
  
  // Create skill nodes
  const nodes = [];
  const primaryColor = new THREE.Color(0x9c27b0);
  const secondaryColor = new THREE.Color(0x2196f3);
  const accentColor = new THREE.Color(0xff4081);
  
  // Create frontend skill nodes
  frontendSkills.forEach((skill, index) => {
    const geometry = new THREE.SphereGeometry(skill.level / 100 * 0.5 + 0.2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
      color: primaryColor,
      roughness: 0.3,
      metalness: 0.7
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position in a circular pattern
    const angle = (index / frontendSkills.length) * Math.PI * 2;
    const radius = 3;
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;
    mesh.position.z = Math.random() * 2 - 1;
    
    mesh.userData = { 
      type: 'frontend',
      name: skill.name,
      level: skill.level
    };
    
    scene.add(mesh);
    nodes.push(mesh);
  });
  
  // Create backend skill nodes
  backendSkills.forEach((skill, index) => {
    const geometry = new THREE.BoxGeometry(
      skill.level / 100 * 0.5 + 0.2,
      skill.level / 100 * 0.5 + 0.2,
      skill.level / 100 * 0.5 + 0.2
    );
    const material = new THREE.MeshStandardMaterial({ 
      color: secondaryColor,
      roughness: 0.3,
      metalness: 0.7
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position in a circular pattern
    const angle = (index / backendSkills.length) * Math.PI * 2;
    const radius = 5;
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;
    mesh.position.z = Math.random() * 2 - 1;
    
    mesh.userData = { 
      type: 'backend',
      name: skill.name,
      level: skill.level
    };
    
    scene.add(mesh);
    nodes.push(mesh);
  });
  
  // Create tools skill nodes
  toolsSkills.forEach((skill, index) => {
    const geometry = new THREE.TorusGeometry(
      skill.level / 100 * 0.3 + 0.1,
      0.1,
      16,
      32
    );
    const material = new THREE.MeshStandardMaterial({ 
      color: accentColor,
      roughness: 0.3,
      metalness: 0.7
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position in a circular pattern
    const angle = (index / toolsSkills.length) * Math.PI * 2;
    const radius = 7;
    mesh.position.x = Math.cos(angle) * radius;
    mesh.position.y = Math.sin(angle) * radius;
    mesh.position.z = Math.random() * 2 - 1;
    
    mesh.userData = { 
      type: 'tools',
      name: skill.name,
      level: skill.level
    };
    
    scene.add(mesh);
    nodes.push(mesh);
  });
  
  // Add connecting lines between related skills
  const connections = [
    { from: 'HTML', to: 'CSS' },
    { from: 'CSS', to: 'JavaScript' },
    { from: 'JavaScript', to: 'TypeScript' },
    { from: 'JavaScript', to: 'React' },
    { from: 'JavaScript', to: 'Vue.js' },
    { from: 'JavaScript', to: 'Node.js' },
    { from: 'Node.js', to: 'Express' },
    { from: 'Express', to: 'MongoDB' },
    { from: 'Express', to: 'PostgreSQL' },
    { from: 'Node.js', to: 'GraphQL' },
    { from: 'Git', to: 'GitHub' }
  ];
  
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: 0xffffff,
    transparent: true,
    opacity: 0.3
  });
  
  connections.forEach(connection => {
    const fromNode = nodes.find(node => node.userData.name === connection.from);
    const toNode = nodes.find(node => node.userData.name === connection.to);
    
    if (fromNode && toNode) {
      const points = [];
      points.push(new THREE.Vector3(fromNode.position.x, fromNode.position.y, fromNode.position.z));
      points.push(new THREE.Vector3(toNode.position.x, toNode.position.y, toNode.position.z));
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      scene.add(line);
    }
  });
  
  // Position camera
  camera.position.z = 10;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the entire scene slowly
    scene.rotation.y += 0.002;
    scene.rotation.x += 0.001;
    
    // Animate individual nodes
    nodes.forEach(node => {
      node.rotation.x += 0.01;
      node.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = skillsScene.clientWidth / skillsScene.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(skillsScene.clientWidth, skillsScene.clientHeight);
  });
  
  animate();
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Three.js background
  initThreeJSBackground();
  
  // Initialize 3D Skills visualization
  init3DSkills();
});
