"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- PROCEDURAL NOISE HELPERS FOR GLSL SHADERS ---
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// --- WATER SHADERS ---
const waterVertexShader = `
${noiseGLSL}

uniform float uTime;
uniform vec2 uMouse;
uniform float uRippleIntensity;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vViewPosition;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Gentle layered oceanic ripples
  float wave1 = snoise(vec3(pos.x * 0.18 + uTime * 0.45, pos.y * 0.18 + uTime * 0.35, uTime * 0.2)) * 0.18;
  float wave2 = snoise(vec3(pos.x * 0.45 - uTime * 0.6, pos.y * 0.45 + uTime * 0.5, uTime * 0.3)) * 0.08;
  
  // Interactive mouse ripples on water surface
  float distToMouse = length(pos.xy - vec2(uMouse.x * 12.0, -uMouse.y * 12.0));
  float mouseRipple = sin(distToMouse * 4.0 - uTime * 5.0) * exp(-distToMouse * 0.35) * uRippleIntensity * 0.25;

  pos.z += wave1 + wave2 + mouseRipple;

  // Recompute normal based on wave derivatives
  float eps = 0.1;
  float waveX = snoise(vec3((pos.x + eps) * 0.18 + uTime * 0.45, pos.y * 0.18, uTime * 0.2)) * 0.18;
  float waveY = snoise(vec3(pos.x * 0.18, (pos.y + eps) * 0.18 + uTime * 0.35, uTime * 0.2)) * 0.18;
  vec3 dX = vec3(eps, 0.0, waveX - wave1);
  vec3 dY = vec3(0.0, eps, waveY - wave1);
  vNormal = normalize(cross(dX, dY));

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPos.xyz;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}
`;

const waterFragmentShader = `
uniform float uTime;
uniform vec3 uSunDirection;
uniform vec3 uSunColor;
uniform vec3 uWaterDeepColor;
uniform vec3 uWaterShallowColor;
uniform vec3 uSkyColor;

varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 norm = normalize(vNormal);

  // Fresnel reflectance: high reflection at grazing angles, deep refraction at steep angles
  float cosTheta = max(dot(viewDir, norm), 0.0);
  float fresnel = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);

  // Base water color gradient
  vec3 waterColor = mix(uWaterDeepColor, uWaterShallowColor, 0.45);

  // Sun specular glint
  vec3 lightDir = normalize(uSunDirection);
  vec3 halfDir = normalize(lightDir + viewDir);
  float specAngle = max(dot(norm, halfDir), 0.0);
  float specular = pow(specAngle, 128.0) * 2.2;
  float softSpec = pow(specAngle, 16.0) * 0.4;

  // Sky reflection
  vec3 reflectionColor = mix(uSkyColor, vec3(1.0, 0.92, 0.88), fresnel * 0.8);

  // Final composition: transmission + reflection + specular sunlight glint
  vec3 finalColor = mix(waterColor, reflectionColor, fresnel * 0.85);
  finalColor += (uSunColor * specular) + (uSunColor * softSpec);

  // Soft depth shoreline fade
  gl_FragColor = vec4(finalColor, 0.92);
}
`;

// --- PEARLESCENT IRIDESCENT SPHERE SHADERS ---
const sphereVertexShader = `
${noiseGLSL}

uniform float uTime;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

void main() {
  vec3 pos = position;

  // Extremely subtle liquid breathing on the pearlescent surface
  float breathing = snoise(pos * 0.8 + vec3(uTime * 0.2)) * 0.035;
  pos += normal * breathing;

  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPos.xyz;

  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}
`;

const sphereFragmentShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 norm = normalize(vNormal);

  // Chromatic Fresnel Rim
  float cosTheta = max(dot(viewDir, norm), 0.0);
  float fresnel = pow(1.0 - cosTheta, 2.5);

  // Pearlescent rainbow iridescent sheen (pink, pastel cyan, champagne gold, soft lavender)
  float angle = dot(norm, vec3(0.0, 1.0, 0.0)) * 3.14159 + (vWorldPosition.y * 1.5) + uTime * 0.3;
  vec3 iridescent = vec3(
    sin(angle) * 0.5 + 0.5,
    sin(angle + 2.094) * 0.5 + 0.5,
    sin(angle + 4.188) * 0.5 + 0.5
  );

  // Base pearly alabaster body
  vec3 baseColor = vec3(0.96, 0.93, 0.91);

  // Specular key light
  vec3 lightDir = normalize(vec3(8.0, 12.0, 8.0));
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(norm, halfDir), 0.0), 48.0) * 1.6;

  // Composite pearl sphere
  vec3 color = mix(baseColor, iridescent * 1.15, fresnel * 0.75);
  color += vec3(1.0, 0.98, 0.92) * spec;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function UnseenDreamscapeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE & ATMOSPHERIC FOG
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6e3db); // Warm dreamy peach horizon
    scene.fog = new THREE.FogExp2(0xf2ddd5, 0.024);

    // CAMERA (eye-level perspective looking over the rippling water)
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2.2, 9.8);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // LIGHTING (Warm golden Mediterranean sunlight)
    const sunLight = new THREE.DirectionalLight(0xfff3e8, 2.8);
    sunLight.position.set(10, 16, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xfce7e0, 1.35);
    scene.add(ambientLight);

    const skyFillLight = new THREE.HemisphereLight(0xfff1eb, 0x8a9bae, 0.85);
    scene.add(skyFillLight);

    // --- MATERIALS ---
    // Warm sandstone / plaster used for classical arches and brutalist walls
    const sandstoneMaterial = new THREE.MeshStandardMaterial({
      color: 0xdebdb0, // Dusty rose sandstone
      roughness: 0.88,
      metalness: 0.04,
    });

    const stairMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6c8bc, // Soft limestone steps
      roughness: 0.82,
      metalness: 0.05,
    });

    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6b4a5, // Natural river boulder
      roughness: 0.94,
      metalness: 0.02,
    });

    // --- 1. ARCHITECTURAL ARCHES & WALL (LEFT PORTICO) ---
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    // Left main wall with twin Roman classical arches
    const wallShape = new THREE.Shape();
    wallShape.moveTo(-10, -1);
    wallShape.lineTo(-10, 8);
    wallShape.lineTo(-1.6, 8);
    wallShape.lineTo(-1.6, -1);
    wallShape.closePath();

    // Arch Hole 1 (Far Left)
    const arch1Hole = new THREE.Path();
    arch1Hole.moveTo(-8.2, 0);
    arch1Hole.lineTo(-8.2, 5.0);
    arch1Hole.absarc(-7.1, 5.0, 1.1, Math.PI, 0, true);
    arch1Hole.lineTo(-6.0, 0);
    arch1Hole.closePath();
    wallShape.holes.push(arch1Hole);

    // Arch Hole 2 (Inner Left - prominent in view)
    const arch2Hole = new THREE.Path();
    arch2Hole.moveTo(-5.2, 0);
    arch2Hole.lineTo(-5.2, 5.0);
    arch2Hole.absarc(-4.0, 5.0, 1.2, Math.PI, 0, true);
    arch2Hole.lineTo(-2.8, 0);
    arch2Hole.closePath();
    wallShape.holes.push(arch2Hole);

    const archWallGeo = new THREE.ExtrudeGeometry(wallShape, {
      depth: 1.4,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    });
    const archWallMesh = new THREE.Mesh(archWallGeo, sandstoneMaterial);
    archWallMesh.position.set(0, 0, -2.5);
    archWallMesh.castShadow = true;
    archWallMesh.receiveShadow = true;
    archGroup.add(archWallMesh);

    // --- 2. BACK TERRACE & RECTANGULAR PORTAL WALL ---
    // Central background wall with a high rectangular doorway portal showing the pink sky
    const backWallShape = new THREE.Shape();
    backWallShape.moveTo(-2.2, 0);
    backWallShape.lineTo(-2.2, 9);
    backWallShape.lineTo(6.5, 9);
    backWallShape.lineTo(6.5, 0);
    backWallShape.closePath();

    // Central rectangular doorway portal
    const doorwayHole = new THREE.Path();
    doorwayHole.moveTo(0.2, 1.8);
    doorwayHole.lineTo(0.2, 6.5);
    doorwayHole.lineTo(1.8, 6.5);
    doorwayHole.lineTo(1.8, 1.8);
    doorwayHole.closePath();
    backWallShape.holes.push(doorwayHole);

    // Right high vertical architectural window slit
    const windowHole = new THREE.Path();
    windowHole.moveTo(3.8, 2.2);
    windowHole.lineTo(3.8, 8.2);
    windowHole.lineTo(5.0, 8.2);
    windowHole.lineTo(5.0, 2.2);
    windowHole.closePath();
    backWallShape.holes.push(windowHole);

    const backWallGeo = new THREE.ExtrudeGeometry(backWallShape, {
      depth: 1.0,
      bevelEnabled: true,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    const backWallMesh = new THREE.Mesh(backWallGeo, sandstoneMaterial);
    backWallMesh.position.set(0, 0, -4.5);
    backWallMesh.castShadow = true;
    backWallMesh.receiveShadow = true;
    archGroup.add(backWallMesh);

    // Terrace elevated ground plane behind the staircase
    const terraceGeo = new THREE.BoxGeometry(6.5, 2.2, 4.0);
    const terraceMesh = new THREE.Mesh(terraceGeo, sandstoneMaterial);
    terraceMesh.position.set(1.5, 0.9, -2.5);
    terraceMesh.castShadow = true;
    terraceMesh.receiveShadow = true;
    scene.add(terraceMesh);

    // Right brutalist side wall
    const rightWallGeo = new THREE.BoxGeometry(2.5, 9.0, 7.0);
    const rightWallMesh = new THREE.Mesh(rightWallGeo, sandstoneMaterial);
    rightWallMesh.position.set(6.8, 4.0, 0);
    rightWallMesh.castShadow = true;
    rightWallMesh.receiveShadow = true;
    scene.add(rightWallMesh);

    // --- 3. CLASSICAL FLOATING STAIRCASE INTO WATER ---
    const stairGroup = new THREE.Group();
    scene.add(stairGroup);

    const totalSteps = 8;
    const stairWidth = 4.6;
    const stepDepth = 0.58;
    const stepHeight = 0.25;

    for (let i = 0; i < totalSteps; i++) {
      const stepGeo = new THREE.BoxGeometry(stairWidth, stepHeight, stepDepth * 2);
      const stepMesh = new THREE.Mesh(stepGeo, stairMaterial);
      // Descends from terrace height down into the water plane
      const y = 1.85 - i * stepHeight;
      const z = -1.2 + i * stepDepth;
      stepMesh.position.set(0, y, z);
      stepMesh.castShadow = true;
      stepMesh.receiveShadow = true;
      stairGroup.add(stepMesh);
    }

    // --- 4. FLOATING IRIDESCENT CHROME/PEARL SPHERE ---
    const sphereRadius = 1.45;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    const pearlSphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    pearlSphere.position.set(2.4, 2.7, -0.6);
    pearlSphere.castShadow = true;
    scene.add(pearlSphere);

    // --- 5. NATURAL SUBMERGED ROCKS (BOULDERS) ---
    // Helper to create rugged organic low-poly stone geometry
    const createBoulderGeo = (radius: number, detail: number) => {
      const geo = new THREE.DodecahedronGeometry(radius, detail);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i);
        const vy = pos.getY(i);
        const vz = pos.getZ(i);
        const factor = 1.0 + (Math.sin(vx * 2.5) + Math.cos(vy * 3.0) + Math.sin(vz * 2.8)) * 0.16;
        pos.setXYZ(i, vx * factor, vy * factor, vz * factor);
      }
      geo.computeVertexNormals();
      return geo;
    };

    // Foreground rock 1 (prominent right foreground)
    const rock1Geo = createBoulderGeo(1.2, 2);
    const rock1Mesh = new THREE.Mesh(rock1Geo, rockMaterial);
    rock1Mesh.position.set(3.4, 0.45, 2.6);
    rock1Mesh.rotation.set(0.4, 1.2, 0.2);
    rock1Mesh.scale.set(1.3, 0.9, 1.2);
    rock1Mesh.castShadow = true;
    rock1Mesh.receiveShadow = true;
    scene.add(rock1Mesh);

    // Far right rock 2 (half submerged near right edge)
    const rock2Geo = createBoulderGeo(1.6, 2);
    const rock2Mesh = new THREE.Mesh(rock2Geo, rockMaterial);
    rock2Mesh.position.set(6.2, 0.5, 4.0);
    rock2Mesh.rotation.set(-0.3, 0.6, 0.5);
    rock2Mesh.scale.set(1.4, 0.85, 1.3);
    rock2Mesh.castShadow = true;
    rock2Mesh.receiveShadow = true;
    scene.add(rock2Mesh);

    // --- 6. DISTANT DREAMSCAPE HILLS (VISIBLE THROUGH ARCHES) ---
    const distantHillsGeo = new THREE.PlaneGeometry(35, 16, 32, 32);
    // Displace into organic rolling distant hills
    const hillsPos = distantHillsGeo.attributes.position;
    for (let i = 0; i < hillsPos.count; i++) {
      const x = hillsPos.getX(i);
      const y = hillsPos.getY(i);
      hillsPos.setZ(i, Math.sin(x * 0.3) * 1.8 + Math.cos(y * 0.4) * 1.2);
    }
    distantHillsGeo.computeVertexNormals();

    const hillsMaterial = new THREE.MeshStandardMaterial({
      color: 0xd1b4c6, // Soft lavender pink distant mountain
      roughness: 0.98,
      metalness: 0.0,
    });
    const hillsMesh = new THREE.Mesh(distantHillsGeo, hillsMaterial);
    hillsMesh.position.set(-8.0, 3.2, -14.0);
    scene.add(hillsMesh);

    // --- 7. SHIMMERING RIPPLING WATER PLANE ---
    const waterGeo = new THREE.PlaneGeometry(60, 60, 160, 160);
    waterGeo.rotateX(-Math.PI / 2);

    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uRippleIntensity: { value: 0.0 },
        uSunDirection: { value: new THREE.Vector3(10, 16, 8).normalize() },
        uSunColor: { value: new THREE.Color(0xfff3e6) },
        uWaterDeepColor: { value: new THREE.Color(0x76697d) }, // Deep reflective mauve/slate water
        uWaterShallowColor: { value: new THREE.Color(0xe0b9ad) }, // Warm peach surface
        uSkyColor: { value: new THREE.Color(0xf6e3db) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
    waterMesh.position.set(0, 0.05, 0); // At water line level
    waterMesh.receiveShadow = true;
    scene.add(waterMesh);

    // --- INTERACTIVE MOUSE PARALLAX & WATER RIPPLES ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let ripplePulse = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;
      ripplePulse = Math.min(ripplePulse + 0.15, 1.2);
    };

    const handleClick = () => {
      ripplePulse = 2.4; // Big ripple shockwave on click
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    container.addEventListener("click", handleClick);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Performance optimization: skip rendering if hero is completely out of viewport
      if (scrollY > window.innerHeight * 1.5) {
        return;
      }

      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth camera parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Scroll-driven camera drift (adds cinematic immersion on scroll)
      const scrollFactor = Math.min(scrollY / (window.innerHeight || 800), 1.2);

      camera.position.x = mouse.x * 0.8;
      camera.position.y = 2.2 + mouse.y * 0.45 + scrollFactor * 0.9;
      camera.position.z = 7.5 + scrollFactor * 1.8;
      camera.lookAt(mouse.x * 0.3, 1.8 + scrollFactor * 0.4, 0);

      // Subtle breathing float on iridescent sphere with scroll elevation
      pearlSphere.position.y = 2.85 + Math.sin(elapsed * 1.2) * 0.12 + scrollFactor * 0.5;
      pearlSphere.rotation.y = elapsed * 0.25;

      // Decay ripple impulse
      ripplePulse *= 0.96;

      // Update shader uniforms
      waterMaterial.uniforms.uTime.value = elapsed;
      waterMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);
      waterMaterial.uniforms.uRippleIntensity.value = ripplePulse;

      sphereMaterial.uniforms.uTime.value = elapsed;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      archWallGeo.dispose();
      backWallGeo.dispose();
      stairGroup.clear();
      sphereGeo.dispose();
      sphereMaterial.dispose();
      rock1Geo.dispose();
      rock2Geo.dispose();
      sandstoneMaterial.dispose();
      stairMaterial.dispose();
      rockMaterial.dispose();
      waterGeo.dispose();
      waterMaterial.dispose();
      distantHillsGeo.dispose();
      hillsMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

      {/* Cinematic Film Grain & Dreamy Haze Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 230, 220, 0.4) 1px, transparent 0)`,
          backgroundSize: "3px 3px",
        }}
      />

      {/* Gentle Warm Atmosphere Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#fbf7f4]/60 via-transparent to-[#fbf7f4]/20" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#fbf7f4]/30 via-transparent to-[#fbf7f4]/20" />

      {/* Interactive Water Ripple Hint */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e7d8ce] text-[11px] font-mono text-stone-700 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-700 animate-ping" />
        <span>Click or Move Cursor to Ripple Water</span>
      </div>
    </div>
  );
}
