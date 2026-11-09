import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { vertexShaderSource, fragmentShaderSource } from './gradient-shader-source.mjs';

// WebGL runs only in this offline asset tool. No shader or canvas ships to pages.
const browser = await chromium.launch({ args: ['--no-sandbox', '--enable-unsafe-swiftshader'] });
await mkdir('src/assets', { recursive: true });
try {
  const page = await browser.newPage();
  for (const [name, width, height] of [['desktop', 1600, 1000], ['mobile', 800, 1600]]) {
    const data = await page.evaluate(({ vertexShaderSource, fragmentShaderSource, width, height }) => {
      const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
      const gl = canvas.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: true });
      if (!gl) throw new Error('Offline WebGL unavailable');
      const compile = (type, source) => {
        const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
        return shader;
      };
      const program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShaderSource));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShaderSource));
      gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program); const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      gl.viewport(0,0,width,height); gl.uniform2f(gl.getUniformLocation(program,'u_resolution'),width,height);
      gl.uniform1f(gl.getUniformLocation(program,'u_time'),0); gl.uniform1f(gl.getUniformLocation(program,'u_motion'),0);
      gl.drawArrays(gl.TRIANGLES,0,6); gl.finish(); const result = canvas.toDataURL('image/png'); gl.getExtension('WEBGL_lose_context')?.loseContext(); return result;
    }, { vertexShaderSource, fragmentShaderSource, width, height });
    const input = Buffer.from(data.split(',')[1], 'base64');
    await sharp(input).resize({ width: Math.round(width * .75) }).webp({ quality: 82 }).toFile(`src/assets/gradient-${name}.webp`);
  }
} finally { await browser.close(); }
