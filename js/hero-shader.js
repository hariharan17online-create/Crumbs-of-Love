/**
 * CRUMBS OF LOVE - THREE.JS WEBGL HERO SCENE
 * Floating, slowly rotating artisanal cocoa & crumb particle field with a custom
 * GLSL shader (warm caramel gradient displacement reacting smoothly to the mouse).
 * Degrades gracefully on mobile or when prefers-reduced-motion is enabled.
 */

export function initHeroShader(canvasId = 'hero-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const THREE = window.THREE;
  if (!THREE) {
    console.warn('Three.js library not found on window, hero particle field skipped gracefully.');
    canvas.style.display = 'none';
    return null;
  }

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    canvas.style.display = 'none';
    return null;
  }

  const container = canvas.parentElement;
  let width = container.clientWidth || window.innerWidth;
  let height = container.clientHeight || window.innerHeight;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 24;

  // Renderer
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL not supported, falling back to static visual', e);
    canvas.style.display = 'none';
    return null;
  }

  const isMobile = window.innerWidth < 768;
  const maxDpr = isMobile ? 1.5 : 2;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));

  // Particle System Parameters: Low count on mobile for smooth performance
  const particleCount = isMobile ? 200 : 700;
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);
  const randomness = new Float32Array(particleCount * 3);
  const colorWeights = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Spread in elliptical donut/cloud around hero center
    const radius = 6 + Math.random() * 18;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.85;

    positions[i3] = radius * Math.cos(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(phi);
    positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi) - 2;

    scales[i] = Math.random() * 28.0 + 8.0;
    randomness[i3] = Math.random() * 2.0 - 1.0;
    randomness[i3 + 1] = Math.random() * 2.0 - 1.0;
    randomness[i3 + 2] = Math.random() * 2.0 - 1.0;
    colorWeights[i] = Math.random(); // 0: cocoa brown, 0.5: caramel, 1: gold
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
  geometry.setAttribute('aColorWeight', new THREE.BufferAttribute(colorWeights, 1));

  // Custom GLSL Shaders
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorCocoa: { value: new THREE.Color(0x3B2314) },
    uColorCaramel: { value: new THREE.Color(0xC08552) },
    uColorGold: { value: new THREE.Color(0xC9A66B) },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
  };

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uPixelRatio;

    attribute float aScale;
    attribute vec3 aRandomness;
    attribute float aColorWeight;

    varying float vColorWeight;
    varying float vAlpha;

    void main() {
      vColorWeight = aColorWeight;

      // Base position with organic slow motion
      vec3 pos = position;
      float time = uTime * 0.4;

      // Gentle orbital drift
      pos.x += sin(time + aRandomness.x * 6.28) * 0.7;
      pos.y += cos(time * 0.8 + aRandomness.y * 6.28) * 0.8;
      pos.z += sin(time * 0.6 + aRandomness.z * 6.28) * 0.5;

      // Interactive mouse displacement (subtle repulsion & ripple)
      vec2 mouseDist = pos.xy - (uMouse * 14.0);
      float dist = length(mouseDist);
      if (dist < 8.0) {
        float force = (8.0 - dist) / 8.0;
        pos.xy += normalize(mouseDist) * force * 1.8;
        pos.z += force * 2.5;
      }

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Point size attenuation with distance
      gl_PointSize = aScale * (22.0 / -mvPosition.z) * uPixelRatio;

      // Fade particles at edges
      vAlpha = smoothstep(30.0, 10.0, length(pos));
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorCocoa;
    uniform vec3 uColorCaramel;
    uniform vec3 uColorGold;

    varying float vColorWeight;
    varying float vAlpha;

    void main() {
      // Circular soft crumb particle with organic edge
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft feather
      float strength = smoothstep(0.5, 0.05, dist);

      // Color interpolation: Cocoa -> Caramel -> Gold
      vec3 color = mix(uColorCocoa, uColorCaramel, step(0.35, vColorWeight));
      color = mix(color, uColorGold, step(0.75, vColorWeight));

      // Golden core glow
      color += vec3(0.08, 0.04, 0.02) * (1.0 - dist * 2.0);

      gl_FragColor = vec4(color, strength * 0.75 * vAlpha);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });

  const particleMesh = new THREE.Points(geometry, material);
  scene.add(particleMesh);

  // Smooth Mouse Tracking with Lerp
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const onMouseMove = (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Handle Resize
  const onResize = () => {
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    const currentMaxDpr = window.innerWidth < 768 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, currentMaxDpr));
    uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, currentMaxDpr);
  };
  window.addEventListener('resize', onResize);

  // Performance: Intersection Observer to fully halt render loop when off-screen
  let isVisible = true;
  let animationFrameId = null;
  const clock = new THREE.Clock();

  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;

    // Smooth lerp mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    // Subtle global rotation
    particleMesh.rotation.y = elapsedTime * 0.04;
    particleMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1 + (mouse.y * 0.15);
    particleMesh.rotation.z = mouse.x * 0.1;

    renderer.render(scene, camera);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const wasVisible = isVisible;
      isVisible = entry.isIntersecting;
      if (isVisible && !wasVisible && !animationFrameId) {
        animate();
      } else if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  animate();

  return {
    destroy() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}
