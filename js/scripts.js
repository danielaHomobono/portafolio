// Aquí está toda la lógica de JavaScript, ¡me emocioné mucho aprendiendo Three.js!

// Configuré las variables globales para Three.js, quería un fondo de partículas que fuera súper dinámico
let scene, camera, renderer, particles = [];
let mouseX = 0, mouseY = 0;

// Esta función inicializa Three.js, ¡fue un desafío pero me encantó el resultado!
function initThreeJS() {
  const canvas = document.getElementById('threejs-canvas');
  const container = canvas.parentElement;

  // Crear la escena, quería que fuera simple pero impactante
  scene = new THREE.Scene();

  // Configuré la cámara para que se ajustara bien al contenedor
  camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  camera.position.z = 5;

  // El renderer con fondo transparente me pareció ideal para integrarlo con el diseño
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setClearColor(0x000000, 0);

  // Aquí creé las partículas flotantes, quería que tuvieran variedad de colores y movimientos
  createFloatingParticles();

  // Agregué los eventos para que fuera interactivo
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);

  // Inicié la animación, ¡realmente me gustó como quedó el efecto!
  animate();
}

// Esta función crea las partículas, intenté que tuvieran un movimiento natural y elegante
function createFloatingParticles() {
  // Diferentes tamaños para más variedad, me pareció que le daba profundidad
  const particleSizes = [0.03, 0.04, 0.05, 0.06];
  const particleMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x64b5f6, transparent: true, opacity: 0.9 }),    // Azul claro
    new THREE.MeshBasicMaterial({ color: 0x81c784, transparent: true, opacity: 0.9 }),    // Verde claro
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }),   // Blanco
    new THREE.MeshBasicMaterial({ color: 0x42a5f5, transparent: true, opacity: 0.85 }),   // Azul medio
    new THREE.MeshBasicMaterial({ color: 0x66bb6a, transparent: true, opacity: 0.85 }),   // Verde medio
    new THREE.MeshBasicMaterial({ color: 0x90caf9, transparent: true, opacity: 0.8 }),    // Azul muy claro
    new THREE.MeshBasicMaterial({ color: 0xa5d6a7, transparent: true, opacity: 0.8 }),    // Verde muy claro
    new THREE.MeshBasicMaterial({ color: 0xe1f5fe, transparent: true, opacity: 0.75 })    // Azul hielo
  ];

  // Más partículas para un efecto más rico, ¡quedó súper bonito!
  for (let i = 0; i < 120; i++) {
    const size = particleSizes[Math.floor(Math.random() * particleSizes.length)];
    const particleGeometry = new THREE.SphereGeometry(size, 8, 8);
    const particle = new THREE.Mesh(
      particleGeometry,
      particleMaterials[Math.floor(Math.random() * particleMaterials.length)]
    );

    // Posiciones iniciales más distribuidas para cubrir bien el espacio
    particle.position.x = (Math.random() - 0.5) * 30;
    particle.position.y = (Math.random() - 0.5) * 20;
    particle.position.z = (Math.random() - 0.5) * 18;

    // Propiedades únicas para cada partícula, quería que cada una tuviera su propio movimiento
    particle.userData = {
      originalX: particle.position.x,
      originalY: particle.position.y,
      originalZ: particle.position.z,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
      speedZ: (Math.random() - 0.5) * 0.01,
      floatSpeed: Math.random() * 0.04 + 0.02,
      rotationSpeedX: (Math.random() - 0.5) * 0.03,
      rotationSpeedY: (Math.random() - 0.5) * 0.03,
      rotationSpeedZ: (Math.random() - 0.5) * 0.03,
      pulseSpeed: Math.random() * 0.004 + 0.002,
      pulseAmplitude: Math.random() * 0.4 + 0.3
    };

    particles.push(particle);
    scene.add(particle);
  }
}

// Capturé el movimiento del mouse para hacer las partículas interactivas, ¡me pareció súper cool!
function onMouseMove(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Ajusté el tamaño del canvas al redimensionar, quería que siempre se viera bien
function onWindowResize() {
  const container = document.getElementById('threejs-canvas').parentElement;
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

// La animación de las partículas fue mi parte favorita, intenté que fuera súper fluida
function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Moví las partículas con un efecto ondulatorio, me encanta cómo se ven vivas
  particles.forEach((particle, index) => {
    particle.position.x += particle.userData.speedX;
    particle.position.y += particle.userData.speedY;
    particle.position.z += particle.userData.speedZ;

    // Movimiento ondulatorio para un efecto elegante
    particle.position.y += Math.sin(time * particle.userData.floatSpeed + index * 0.5) * 0.02;
    particle.position.x += Math.cos(time * particle.userData.floatSpeed * 0.7 + index * 0.3) * 0.015;

    // Rotación suave para cada partícula
    particle.rotation.x += particle.userData.rotationSpeedX;
    particle.rotation.y += particle.userData.rotationSpeedY;
    particle.rotation.z += particle.userData.rotationSpeedZ;

    // Efecto de pulsación en la escala, quería que parecieran vivas
    const pulseScale = 1 + Math.sin(time * particle.userData.pulseSpeed + index) * particle.userData.pulseAmplitude * 0.1;
    particle.scale.set(pulseScale, pulseScale, pulseScale);

    // Reacción al mouse, pero sutil para no sobrecargar
    const mouseInfluenceX = mouseX * 0.1;
    const mouseInfluenceY = mouseY * 0.1;
    particle.position.x += mouseInfluenceX * 0.01;
    particle.position.y += mouseInfluenceY * 0.01;

    // Reinicio las posiciones si se alejan mucho, para que no se pierdan
    if (particle.position.x > 15) particle.position.x = -15;
    if (particle.position.x < -15) particle.position.x = 15;
    if (particle.position.y > 10) particle.position.y = -10;
    if (particle.position.y < -10) particle.position.y = 10;
    if (particle.position.z > 9) particle.position.z = -9;
    if (particle.position.z < -9) particle.position.z = 9;

    // Variación de opacidad para un efecto más dinámico
    const opacityVariation = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 0.003 + index * 0.1));
    particle.material.opacity = Math.min(particle.material.opacity, opacityVariation);
  });

  // Rotación suave de la escena, me pareció un toque súper elegante
  scene.rotation.y += 0.001;

  renderer.render(scene, camera);
}

// Inicializo Three.js al cargar la página
window.addEventListener('load', initThreeJS);

// Hice el scroll suave para la navegación, ¡me encanta cómo mejora la experiencia!
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animación de entrada para las tarjetas, quería que aparecieran con estilo
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observo las tarjetas al cargar la página, para la próxima quisiera mejorar la transición
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.mission-card, .project-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Manejo del formulario, por ahora es simple, pero me encantaría conectar una API real más adelante
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Un mensaje de confirmación básico, para la próxima quisiera mejorar la experiencia
  const formData = new FormData(this);
  const name = formData.get('name');
  
  alert(`¡Gracias ${name}! Tu mensaje ha sido enviado correctamente.`);
  this.reset();
});

// Efecto de parallax en el scroll, quería que el fondo tuviera un movimiento sutil
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  if (scene) {
    scene.rotation.x = scrolled * 0.0001;
    scene.rotation.z = scrolled * 0.0002;
  }
});