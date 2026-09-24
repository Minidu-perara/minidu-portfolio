"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "./media";

/*
 * A living "telemetry surface": domain-warped noise drawn as glowing contour
 * lines. The pointer magnifies the field under it, a click sends a ripple,
 * and on touch screens a slow autopilot moves the lens instead.
 */

const FRAGMENT_BODY = /* glsl */ `
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uHover;
uniform vec3 uRipple;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

vec3 shade(vec2 frag) {
  float s = 1.0 / uRes.y;
  vec2 p = (frag - 0.5 * uRes) * s;
  vec2 m = (uPointer - 0.5 * uRes) * s;
  float t = uTime;

  // Lens: pull the field toward the pointer so it magnifies what is under it.
  vec2 dm = p - m;
  float lens = exp(-dot(dm, dm) * 20.0) * uHover;
  p -= dm * lens * 0.5;

  // Click ripple: an expanding ring that shoves the field outward.
  float ring = 0.0;
  if (uRipple.z >= 0.0) {
    float age = t - uRipple.z;
    vec2 rp = (uRipple.xy - 0.5 * uRes) * s;
    float rd = length(p - rp);
    float k = (rd - age * 0.65) * 15.0;
    ring = exp(-k * k) * exp(-age * 1.3);
    p += (p - rp) / max(rd, 0.001) * ring * 0.04;
  }

  vec2 q = p * 2.3 + vec2(0.0, 0.3);
  vec2 w1 = vec2(fbm(q + vec2(0.0, t * 0.045)), fbm(q + vec2(5.2, 1.3) - t * 0.035));
  vec2 w2 = vec2(fbm(q + 2.6 * w1 + vec2(1.7, 9.2) + t * 0.025),
                 fbm(q + 2.6 * w1 + vec2(8.3, 2.8) - t * 0.03));
  float f = fbm(q + 2.2 * w2);

  // Contour lines, with every fifth line brighter.
  float g = f * 20.0;
  float aa = max(fwidth(g), 0.001);
  float d = abs(fract(g) - 0.5);
  float line = 1.0 - smoothstep(0.0, aa * 1.2, d);
  float major = 1.0 - smoothstep(0.0, aa * 1.8, abs(fract(g / 5.0) - 0.5) * 5.0);
  float glow = exp(-d / (aa * 3.0));

  vec3 indigo = vec3(0.506, 0.549, 0.973);
  vec3 cyan = vec3(0.404, 0.910, 0.976);
  vec3 lineColor = mix(indigo, cyan, smoothstep(0.42, 0.78, f + 0.2 * (w2.y - 0.5)));

  // Brightest toward the upper right, quiet behind the text at the lower left.
  float focus = smoothstep(1.35, 0.05, length((p - vec2(0.42, 0.18)) * vec2(0.75, 1.0)));
  float energy = (0.14 * line + 0.42 * major + 0.1 * glow) * (0.22 + 0.95 * focus) * (1.0 + lens * 3.0 + ring * 6.0);

  vec3 base = mix(vec3(0.012, 0.016, 0.035), vec3(0.035, 0.04, 0.09), smoothstep(0.25, 0.85, f) * focus);
  vec3 color = base + lineColor * energy;
  color += (hash(frag + fract(t * 7.0) * 91.0) - 0.5) * 0.018; // film grain
  return color;
}
`;

const VERTEX_2 = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT_2 = `#version 300 es
precision highp float;
${FRAGMENT_BODY}
out vec4 outColor;
void main() { outColor = vec4(shade(gl_FragCoord.xy), 1.0); }`;

const VERTEX_1 = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT_1 = `#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
${FRAGMENT_BODY}
void main() { gl_FragColor = vec4(shade(gl_FragCoord.xy), 1.0); }`;

type GL = WebGLRenderingContext | WebGL2RenderingContext;

function createProgram(gl: GL, vertexSource: string, fragmentSource: string): WebGLProgram | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("Signal field shader:", gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  };
  const vertex = compile(gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

export function SignalField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const attributes: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    };
    // A canvas can hold only one kind of context, so WebGL1 is tried only
    // when WebGL2 is unavailable.
    let gl: GL | null = canvas.getContext("webgl2", attributes);
    let program: WebGLProgram | null = null;
    if (gl) {
      program = createProgram(gl, VERTEX_2, FRAGMENT_2);
    } else {
      gl = canvas.getContext("webgl", attributes);
      if (gl && gl.getExtension("OES_standard_derivatives")) program = createProgram(gl, VERTEX_1, FRAGMENT_1);
    }
    if (!gl || !program) {
      canvas.dataset.state = "unsupported";
      return;
    }
    const context = gl;
    const shaderProgram = program;

    context.useProgram(shaderProgram);
    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), context.STATIC_DRAW);
    const position = context.getAttribLocation(shaderProgram, "aPos");
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);
    const uniform = (name: string) => context.getUniformLocation(shaderProgram, name);
    const uRes = uniform("uRes");
    const uTime = uniform("uTime");
    const uPointer = uniform("uPointer");
    const uHover = uniform("uHover");
    const uRipple = uniform("uRipple");

    const reduced = prefersReducedMotion();
    const fine = hasFinePointer();
    const small = window.matchMedia("(max-width: 640px)").matches;
    // Rendered below device resolution and upscaled: the field is soft by
    // nature, and this keeps it smooth on laptops and phones alike.
    let quality = small ? 0.55 : 0.8;
    let time = 18; // a pleasing first frame
    let ripple: [number, number, number] = [0, 0, -1];
    // Pointer position as a fraction of the canvas (y up), eased toward target.
    const pointer = { x: 0.7, y: 0.6, targetX: 0.7, targetY: 0.6, hover: 0, targetHover: fine ? 0 : 0.55 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr * quality));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr * quality));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        context.viewport(0, 0, width, height);
      }
    };

    const draw = () => {
      context.uniform2f(uRes, canvas.width, canvas.height);
      context.uniform1f(uTime, time);
      context.uniform2f(uPointer, pointer.x * canvas.width, pointer.y * canvas.height);
      context.uniform1f(uHover, reduced ? 0 : pointer.hover);
      context.uniform3f(uRipple, ripple[0] * canvas.width, ripple[1] * canvas.height, ripple[2]);
      context.drawArrays(context.TRIANGLES, 0, 3);
    };

    let frame = 0;
    let running = false;
    let last = 0;
    let slowFrames = 0;

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      time += dt;

      if (!fine) {
        // Autopilot for touch screens: a slow Lissajous path.
        pointer.targetX = 0.62 + 0.26 * Math.sin(time * 0.23);
        pointer.targetY = 0.55 + 0.22 * Math.sin(time * 0.31 + 1.2);
      }
      const ease = 1 - Math.exp(-dt * 7);
      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;
      pointer.hover += (pointer.targetHover - pointer.hover) * (1 - Math.exp(-dt * 4));

      // If frames are consistently slow, render fewer pixels.
      slowFrames = dt > 0.024 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
      if (slowFrames > 45 && quality > 0.35) {
        quality *= 0.8;
        slowFrames = 0;
        resize();
      }

      draw();
      if (running) frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw();
    canvas.dataset.state = "ready";

    const onPointerMove = (event: PointerEvent) => {
      if (!fine) return;
      const rect = canvas.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      pointer.targetHover = inside ? 1 : 0;
      if (inside) {
        pointer.targetX = (event.clientX - rect.left) / rect.width;
        pointer.targetY = 1 - (event.clientY - rect.top) / rect.height;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      if (event.clientY < rect.top || event.clientY > rect.bottom) return;
      ripple = [(event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height, time];
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    const visibility = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
    // Pause in background tabs; resume on return if the hero is on screen.
    const onVisibilityChange = () => {
      if (document.hidden) return stop();
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) start();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      stop();
      canvas.dataset.state = "unsupported";
    };

    resizeObserver.observe(canvas);
    visibility.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      context.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
