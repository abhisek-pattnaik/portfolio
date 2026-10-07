"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Palette, RotateCcw } from "lucide-react";

// --- GLSL SIMPLEX 3D NOISE & LIQUID CHROME SHADER ---
const vertexShader = `
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

uniform float uTime;
uniform vec2 uMouse;
uniform float uDisplacement;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewPosition;
varying float vNoise;

void main() {
  vUv = uv;
  vec3 transformed = position;

  // Multi-frequency organic liquid wave
  float noise1 = snoise(transformed * 0.38 + vec3(uTime * 0.35));
  float noise2 = snoise(transformed * 0.85 - vec3(uTime * 0.25)) * 0.45;
  float totalNoise = noise1 + noise2;

  // Interactive mouse ripple displacement
  float distToMouse = length(transformed.xy - vec2(uMouse.x * 4.0, uMouse.y * 4.0));
  float mouseRipple = sin(distToMouse * 3.5 - uTime * 3.0) * exp(-distToMouse * 0.35) * 0.35;

  transformed += normal * (totalNoise * uDisplacement + mouseRipple);

  vNoise = totalNoise;
  vNormal = normalize(normalMatrix * normal);
  vPosition = transformed;

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uSpecularColor;
uniform float uFresnelPower;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vViewPosition;
varying float vNoise;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  // Unseen Studio Signature Iridescent Fresnel Rim
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
  fresnel = clamp(fresnel, 0.0, 1.0);

  // Dynamic metallic gradient blend
  float t = vNoise * 0.5 + 0.5;
  vec3 baseColor = mix(uColorA, uColorB, t);
  baseColor = mix(baseColor, uColorC, sin(t * 3.14159 + uTime * 0.4) * 0.5 + 0.5);

  // Studio lighting: Key Light
  vec3 lightDir = normalize(vec3(1.2, 1.6, 2.0));
  float diff = max(dot(normal, lightDir), 0.0);

  // Specular Blinn-Phong highlight
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normal, halfDir), 0.0), 38.0);

  // Secondary cool rim fill light
  vec3 backLightDir = normalize(vec3(-1.2, -1.0, -1.5));
  float backDiff = max(dot(normal, backLightDir), 0.0) * 0.35;

  // Liquid Chrome Composite
  vec3 finalColor = baseColor * (diff * 0.75 + backDiff + 0.32);
  finalColor += uSpecularColor * spec * 1.35;
  finalColor = mix(finalColor, uColorC * 1.35, fresnel * 0.88);

  // Subtle chromatic iridescent shimmer
  vec3 iridescence = vec3(
    sin(uTime * 0.8 + vUv.x * 6.28) * 0.05,
    cos(uTime * 0.8 + vUv.y * 6.28) * 0.05,
    sin(uTime * 0.5) * 0.05
  );
  finalColor += iridescence;

  gl_FragColor = vec4(finalColor, 0.98);
}
`;

type GeometryType = "ribbon" | "sphere" | "wave";
type PaletteType = "chrome" | "iridescent" | "gold";

export default function ThreeHeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [geoMode, setGeoMode] = useState<GeometryType>("ribbon");
  const [palette, setPalette] = useState<PaletteType>("chrome");
  const [fpsState, setFpsState] = useState("60 FPS");

  const geoModeRef = useRef<GeometryType>(geoMode);
  const paletteRef = useRef<PaletteType>(palette);

  useEffect(() => {
    geoModeRef.current = geoMode;
  }, [geoMode]);

  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- GEOMETRIES ---
    const ribbonGeo = new THREE.TorusKnotGeometry(2.8, 0.78, 220, 38, 2, 3);
    const sphereGeo = new THREE.IcosahedronGeometry(3.2, 32);
    const waveGeo = new THREE.PlaneGeometry(7.5, 7.5, 70, 70);

    // Palettes configuration
    const palettes = {
      chrome: {
        colorA: new THREE.Color(0x0f172a), // Deep slate obsidian
        colorB: new THREE.Color(0x38bdf8), // Electric cyan
        colorC: new THREE.Color(0xa855f7), // Unseen metallic violet
        specular: new THREE.Color(0xffffff),
      },
      iridescent: {
        colorA: new THREE.Color(0x090d16),
        colorB: new THREE.Color(0x06b6d4), // Cyan
        colorC: new THREE.Color(0xf43f5e), // Rose pink
        specular: new THREE.Color(0xf8fafc),
      },
      gold: {
        colorA: new THREE.Color(0x18181b),
        colorB: new THREE.Color(0xf59e0b), // Amber gold
        colorC: new THREE.Color(0xfef08a), // Champagne
        specular: new THREE.Color(0xffffff),
      },
    };

    // --- LIQUID CHROME SHADER MATERIAL ---
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uDisplacement: { value: 0.42 },
        uColorA: { value: palettes.chrome.colorA },
        uColorB: { value: palettes.chrome.colorB },
        uColorC: { value: palettes.chrome.colorC },
        uSpecularColor: { value: palettes.chrome.specular },
        uFresnelPower: { value: 2.2 },
      },
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial> = new THREE.Mesh(
      ribbonGeo,
      shaderMaterial
    );
    mainGroup.add(mesh);

    // --- ATMOSPHERIC PARTICLES (STARDUST) ---
    const starCount = 380;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 32;
      starPos[i + 1] = (Math.random() - 0.5) * 32;
      starPos[i + 2] = (Math.random() - 0.5) * 32;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- MOUSE & ORBIT DRAG CONTROLS ---
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;

      if (isDragging) {
        const deltaX = event.clientX - prevMousePos.x;
        const deltaY = event.clientY - prevMousePos.y;
        dragVelocity.x = deltaX * 0.006;
        dragVelocity.y = deltaY * 0.006;
        prevMousePos = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Touch support for drag
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    // RESIZE
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const startTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();
    let currentActiveGeo: GeometryType = "ribbon";

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Update shader uniforms
      shaderMaterial.uniforms.uTime.value = elapsedTime;
      shaderMaterial.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Apply drag momentum with decay
      mainGroup.rotation.y += dragVelocity.x;
      mainGroup.rotation.x += dragVelocity.y;
      dragVelocity.x *= 0.94;
      dragVelocity.y *= 0.94;

      // Organic idle drift
      mainGroup.rotation.y += 0.006 + mouse.x * 0.008;
      mainGroup.rotation.x += 0.003 - mouse.y * 0.008;

      stars.rotation.y = elapsedTime * 0.015;

      // Dynamic Geometry Switching
      const targetGeoMode = geoModeRef.current;
      if (targetGeoMode !== currentActiveGeo) {
        currentActiveGeo = targetGeoMode;
        if (targetGeoMode === "ribbon") {
          mesh.geometry = ribbonGeo;
          mesh.rotation.x = 0;
        } else if (targetGeoMode === "sphere") {
          mesh.geometry = sphereGeo;
          mesh.rotation.x = 0;
        } else if (targetGeoMode === "wave") {
          mesh.geometry = waveGeo;
          mesh.rotation.x = -Math.PI / 4;
        }
      }

      // Dynamic Palette Updating
      const currentPalette = palettes[paletteRef.current] || palettes.chrome;
      shaderMaterial.uniforms.uColorA.value.lerp(currentPalette.colorA, 0.08);
      shaderMaterial.uniforms.uColorB.value.lerp(currentPalette.colorB, 0.08);
      shaderMaterial.uniforms.uColorC.value.lerp(currentPalette.colorC, 0.08);
      shaderMaterial.uniforms.uSpecularColor.value.lerp(currentPalette.specular, 0.08);

      renderer.render(scene, camera);

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 1000) {
        setFpsState(`${Math.round((frameCount * 1000) / (now - lastFpsUpdate))} FPS`);
        frameCount = 0;
        lastFpsUpdate = now;
      }
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      ribbonGeo.dispose();
      sphereGeo.dispose();
      waveGeo.dispose();
      shaderMaterial.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[480px] sm:h-[550px] lg:h-[640px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        title="Click & Drag to rotate 3D liquid sculpture"
      />

      {/* Floating 3D Engine Badge & Status */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-3 py-1.5 shadow-xl text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span className="text-[11px] font-mono text-cyan-300">{fpsState}</span>
        <span className="text-slate-600">|</span>
        <span className="text-[11px] text-slate-400 font-mono">Unseen GLSL Mesh</span>
      </div>

      {/* Palette Selector (Top-Left) */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-full p-1 shadow-lg">
        <button
          onClick={() => setPalette("chrome")}
          className={`px-2.5 py-1 text-[11px] rounded-full font-mono transition-all ${
            palette === "chrome"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
              : "text-slate-400 hover:text-white"
          }`}
          title="Unseen Liquid Chrome"
        >
          Chrome
        </button>
        <button
          onClick={() => setPalette("iridescent")}
          className={`px-2.5 py-1 text-[11px] rounded-full font-mono transition-all ${
            palette === "iridescent"
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
              : "text-slate-400 hover:text-white"
          }`}
          title="Iridescent Shimmer"
        >
          Iridescent
        </button>
        <button
          onClick={() => setPalette("gold")}
          className={`px-2.5 py-1 text-[11px] rounded-full font-mono transition-all ${
            palette === "gold"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
          title="Obsidian Gold"
        >
          Gold
        </button>
      </div>

      {/* 3D Geometry Mode Switcher (Bottom Center) */}
      <div className="absolute bottom-4 z-20 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-lg border border-slate-800/80 rounded-2xl p-1.5 shadow-2xl">
        <button
          onClick={() => setGeoMode("ribbon")}
          className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
            geoMode === "ribbon"
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Liquid Ribbon
        </button>
        <button
          onClick={() => setGeoMode("sphere")}
          className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
            geoMode === "sphere"
              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md shadow-violet-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Molten Orb
        </button>
        <button
          onClick={() => setGeoMode("wave")}
          className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
            geoMode === "wave"
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          Liquid Wave
        </button>
      </div>

      {/* Interactive Helper Hint */}
      <div
        className={`absolute bottom-16 z-10 transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-60"
        }`}
      >
        <span className="text-[11px] tracking-wider uppercase font-mono text-cyan-300/90 bg-slate-900/90 px-3.5 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-lg">
          Click &amp; Drag to Orbit • Move to Ripple
        </span>
      </div>
    </div>
  );
}
