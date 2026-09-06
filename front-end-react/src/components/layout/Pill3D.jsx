import { useEffect, useRef } from "react";
import pillImage from "../../assets/pilula.png";

const vertexSource = `
  attribute vec3 position;
  attribute vec3 normal;
  uniform float angle;
  uniform float aspect;
  varying vec3 surfaceNormal;
  varying vec3 surfacePosition;
  varying float shell;
  void main() {
    float tilt = -0.48;
    mat3 lean = mat3(cos(tilt), sin(tilt), 0., -sin(tilt), cos(tilt), 0., 0., 0., 1.);
    mat3 turn = mat3(cos(angle), 0., -sin(angle), 0., 1., 0., sin(angle), 0., cos(angle));
    mat3 model = turn * lean;
    vec3 p = model * position;
    surfaceNormal = model * normal;
    surfacePosition = p;
    shell = position.y;
    float depth = 6. - p.z;
    gl_Position = vec4(p.x * 3.3 / aspect, p.y * 3.3, depth * 1.02 - 0.202, depth);
  }
`;

const fragmentSource = `
  precision mediump float;
  varying vec3 surfaceNormal;
  varying vec3 surfacePosition;
  varying float shell;
  void main() {
    vec3 n = normalize(surfaceNormal);
    vec3 view = normalize(vec3(0., 0., 6.) - surfacePosition);
    vec3 light = normalize(vec3(-3., 4., 5.));
    vec3 halfVector = normalize(light + view);
    vec3 base = shell > 0. ? vec3(0.81, 0.88, 0.86) : vec3(0.015, 0.82, 0.19);
    float diffuse = max(dot(n, light), 0.);
    float gloss = pow(max(dot(n, halfVector), 0.), 65.);
    float softGloss = pow(max(dot(n, halfVector), 0.), 12.);
    float rim = pow(1. - max(dot(n, view), 0.), 3.);
    float seam = 1. - 0.2 * (1. - smoothstep(0.004, 0.022, abs(shell)));
    vec3 color = base * (0.38 + 0.62 * diffuse) * seam;
    color += vec3(0.9, 1., 0.96) * (gloss * 0.55 + softGloss * 0.13 + rim * 0.12);
    gl_FragColor = vec4(color, 1.);
  }
`;

// Revolve a capsule profile to create a closed, rounded 3D mesh.
function capsuleVertices() {
  const rings = [];
  const radius = 0.56;
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI / 2;
    rings.push([radius * Math.sin(a), -0.86 - radius * Math.cos(a), Math.sin(a), -Math.cos(a)]);
  }
  rings.push([radius, -0.02, 1, 0], [radius, 0, 1, 0], [radius, 0.02, 1, 0]);
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI / 2;
    rings.push([radius * Math.cos(a), 0.86 + radius * Math.sin(a), Math.cos(a), Math.sin(a)]);
  }
  const vertices = [];
  function add(ring, slice) {
    const [r, y, nr, ny] = rings[ring];
    const a = slice / 64 * Math.PI * 2;
    vertices.push(r * Math.cos(a), y, r * Math.sin(a), nr * Math.cos(a), ny, nr * Math.sin(a));
  }
  for (let ring = 0; ring < rings.length - 1; ring++) {
    for (let slice = 0; slice < 64; slice++) {
      add(ring, slice); add(ring + 1, slice); add(ring, slice + 1);
      add(ring, slice + 1); add(ring + 1, slice); add(ring + 1, slice + 1);
    }
  }
  return new Float32Array(vertices);
}

export default function Pill3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;
    const shaders = [];
    let program;
    let buffer;
    let frame;
    let visible = true;
    let angle = 0;
    let lastTime = null;
    let contextLost = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanupGPU = () => {
      canvas.style.opacity = "0";
      canvas.previousElementSibling.style.visibility = "visible";
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };
    try {
      program = gl.createProgram();
      for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
        const shader = gl.createShader(type);
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error("Pill shader compilation failed");
        gl.attachShader(program, shader);
      }
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Pill shader linking failed");
      gl.useProgram(program);
      const vertices = capsuleVertices();
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      for (const [name, offset] of [["position", 0], ["normal", 12]]) {
        const location = gl.getAttribLocation(program, name);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 24, offset);
      }
      gl.enable(gl.DEPTH_TEST);
      const angleUniform = gl.getUniformLocation(program, "angle");
      const aspectUniform = gl.getUniformLocation(program, "aspect");
      const draw = () => {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(angleUniform, angle);
        gl.uniform1f(aspectUniform, canvas.width / canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 6);
      };
      const resize = () => {
        const size = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(size.width * dpr));
        canvas.height = Math.max(1, Math.round(size.height * dpr));
        draw();
      };
      const tick = time => {
        const delta = lastTime === null ? 16 : Math.min(time - lastTime, 50);
        if (!motion.matches) angle = (angle + delta * Math.PI * 2 / 14000) % (Math.PI * 2);
        lastTime = time;
        draw();
        if (!motion.matches) frame = requestAnimationFrame(tick);
      };
      const updateAnimation = () => {
        cancelAnimationFrame(frame);
        lastTime = null;
        if (visible && !document.hidden && !contextLost) frame = requestAnimationFrame(tick);
        else draw();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        updateAnimation();
      });
      intersectionObserver.observe(canvas);
      document.addEventListener("visibilitychange", updateAnimation);
      motion.addEventListener("change", updateAnimation);
      const onContextLost = () => {
        contextLost = true;
        cancelAnimationFrame(frame);
        canvas.style.opacity = "0";
        canvas.previousElementSibling.style.visibility = "visible";
      };
      canvas.addEventListener("webglcontextlost", onContextLost);
      resize();
      canvas.style.opacity = "1";
      canvas.previousElementSibling.style.visibility = "hidden";
      updateAnimation();
      return () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", updateAnimation);
        motion.removeEventListener("change", updateAnimation);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        cleanupGPU();
      };
    } catch {
      cleanupGPU();
    }
  }, []);

  return (
    <div className="hero-pill-3d" role="img" aria-label="Pílula verde e branca em 3D, girando 360 graus">
      <img className="hero-pill-fallback" src={pillImage} alt="" />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
