import { useEffect, useRef } from 'react';

const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_motion;

varying vec2 v_uv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotate = mat2(0.8, -0.6, 0.6, 0.8);

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotate * p * 2.08 + 19.13;
    amplitude *= 0.48;
  }

  return value;
}

vec3 gradient(float y) {
  vec3 deep = vec3(0.018, 0.021, 0.052);
  vec3 indigo = vec3(0.055, 0.044, 0.142);
  vec3 violet = vec3(0.205, 0.116, 0.314);
  vec3 lilac = vec3(0.455, 0.248, 0.454);
  vec3 peach = vec3(0.94, 0.448, 0.210);

  vec3 color = mix(deep, indigo, smoothstep(0.0, 0.26, y));
  color = mix(color, violet, smoothstep(0.22, 0.56, y));
  color = mix(color, lilac, smoothstep(0.48, 0.74, y));
  color = mix(color, peach, smoothstep(0.68, 0.90, y));

  return color;
}

void main() {
  vec2 uv = v_uv;
  vec2 aspectUv = uv;
  aspectUv.x *= u_resolution.x / max(u_resolution.y, 1.0);

  float time = u_time * u_motion;
  float y = 1.0 - uv.y;

  float broadA = fbm(vec2(
    aspectUv.x * 1.30 + fbm(aspectUv * 0.72 + vec2(time * 0.006, -time * 0.004)) * 0.18,
    aspectUv.y * 1.30 + fbm(aspectUv * 0.68 + vec2(-time * 0.005, time * 0.007)) * 0.18
  ));
  float broadB = fbm(vec2(
    (aspectUv.x + 4.7) * 1.95 + fbm(aspectUv * 0.92 + vec2(-time * 0.006, time * 0.004)) * 0.14,
    (aspectUv.y + 2.1) * 1.95 + fbm(aspectUv * 0.86 + vec2(time * 0.004, time * 0.006)) * 0.14
  ));
  float atmosphere = (broadA * 0.58 + broadB * 0.42);

  vec3 color = gradient(y);
  color *= 1.0 + (atmosphere - 0.5) * 0.075;

  float horizon = exp(-pow((y - 0.78) * 5.8, 2.0));
  float horizonNoise = fbm(vec2(
    aspectUv.x * 3.2 + fbm(aspectUv * 0.75 + vec2(time * 0.006, time * 0.003)) * 0.18,
    aspectUv.y * 3.2 + fbm(aspectUv * 0.82 + vec2(-time * 0.004, time * 0.005)) * 0.18
  ));
  float warmGlow = horizon * smoothstep(0.25, 0.88, horizonNoise);
  float glowPulse = 0.94 + 0.06 * fbm(aspectUv * 1.18 + vec2(time * 0.004, -time * 0.005));
  color += color * warmGlow * glowPulse * 0.31;
  color += vec3(0.22, 0.055, 0.018) * warmGlow * glowPulse * 0.11;

  float sideFalloff = smoothstep(0.0, 0.22, uv.x) * smoothstep(1.0, 0.78, uv.x);
  float verticalFalloff = smoothstep(0.02, 0.18, y) * smoothstep(1.0, 0.80, y);
  color *= 0.78 + 0.24 * sideFalloff * verticalFalloff;

  float topShade = smoothstep(0.58, 0.08, y);
  color *= 1.0 - topShade * 0.22;

  float fine = hash(gl_FragCoord.xy);
  float fineB = hash(gl_FragCoord.xy * 1.73 + vec2(31.7, 12.4));
  float grainTwinkle = 0.92 + 0.08 * sin(time * 2.1 + fine * 6.2831853);
  float grain = ((fine - 0.5) * 0.125 + (fineB - 0.5) * 0.070) * grainTwinkle;
  float grainMask = 0.54 + 0.46 * smoothstep(0.16, 0.82, atmosphere);
  color += vec3(grain * grainMask);

  float speckleSeed = hash(gl_FragCoord.xy * 0.92 + vec2(8.3, 19.1));
  float speckleLife = smoothstep(0.28, 1.0, sin(time * 1.55 + speckleSeed * 18.8495559) * 0.5 + 0.5);
  float speckle = smoothstep(0.968, 1.0, speckleSeed) * speckleLife * (0.28 + 0.72 * horizon);
  color += vec3(speckle * 0.115);

  float readable = smoothstep(0.92, 0.0, length((uv - vec2(0.5, 0.54)) * vec2(1.18, 1.0)));
  color *= 1.0 - readable * 0.18;

  color = clamp(color, 0.0, 1.0);
  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export function HeroShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const gl = canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      canvas.dataset.shaderReady = 'false';
      return undefined;
    }

    const program = createProgram(gl);

    if (!program) {
      canvas.dataset.shaderReady = 'false';
      return undefined;
    }

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const motionLocation = gl.getUniformLocation(program, 'u_motion');
    const buffer = gl.createBuffer();

    if (!buffer) {
      gl.deleteProgram(program);
      return undefined;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const render = (now: number) => {
      resize();

      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, (now - startTime) / 1000);
      gl.uniform1f(motionLocation, reducedMotion ? 0 : 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.shaderReady = 'true';

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      startTime = 0;
      render(0);
    } else {
      animationFrame = window.requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-shader-canvas" aria-hidden="true" />;
}
