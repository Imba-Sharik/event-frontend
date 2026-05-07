export const solidFillVertexShader = /* glsl */ `
precision mediump float;

uniform vec2 uParallax;

attribute vec3 position;
varying vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5 + uParallax;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const solidFillFragmentShader = /* glsl */ `
precision mediump float;

uniform vec3 uBaseRgb;
uniform float uTime;
uniform float uAspect;
uniform float uIntro;

varying vec2 vUv;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  vec3 rgb = uBaseRgb;
  vec3 glowRgb = vec3(226.0 / 255.0, 255.0 / 255.0, 198.0 / 255.0);
  vec3 glowRgbEdge = vec3(248.0 / 255.0, 255.0 / 255.0, 218.0 / 255.0);

  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);

  const int N = 4;
  vec3 glowRgbAcc = vec3(0.0);
  float glowWAcc = 0.0;

  for (int i = 0; i < N; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 19.13, fi * 47.37);
    float h0 = hash21(seed);
    float h1 = hash21(seed + 7.1);
    float h2 = hash21(seed + 13.7);
    float h3 = hash21(seed + 29.3);

    float cycle = 3.2 + h0 * 6.5;
    float phase = fract(uTime / cycle + h1 * 17.0);
    float visEnvelope =
      smoothstep(0.0, 0.13, phase) * smoothstep(1.0, 0.84, phase);
    float vis = mix(0.45, 1.0, visEnvelope);

    float ang = h2 * 6.2831853;
    float spd = 0.032 + h3 * 0.055;
    vec2 roam = vec2(
      cos(ang + uTime * spd),
      sin(ang * 1.27 + uTime * spd * 0.93)
    );

    vec2 quadrant = vec2(
      mod(fi, 2.0) < 1.0 ? -0.5 : 0.5,
      fi < 2.0 ? -0.5 : 0.5
    ) * 0.92;
    vec2 jitter = vec2(
      hash21(seed + 1.7) * 0.34 - 0.17,
      hash21(seed + 3.1) * 0.34 - 0.17
    );
    vec2 base = quadrant + jitter;
    vec2 center = base + roam * (0.14 + h0 * 0.22);

    float pulse = 0.88 + 0.12 * sin(uTime * 0.65 + fi * 1.41);
    float rx =
      (0.0425 + h1 * 0.24) * 2.0 * (0.85 + 0.26 * sin(uTime * 0.35 + fi)) * pulse * 1.85;
    float ry =
      (0.036 + h2 * 0.21) * 2.0 * (0.9 + 0.22 * cos(uTime * 0.28 + fi * 0.7)) * pulse * 1.85;

    float rot = uTime * (0.03 + h3 * 0.05) + h0 * 6.2831853;
    float cr = cos(rot);
    float sr = sin(rot);
    vec2 q = p - center;
    vec2 pr = vec2(cr * q.x - sr * q.y, sr * q.x + cr * q.y);
    vec2 d = pr / vec2(rx, ry);
    float dist = length(d);
    float t = dist * dist;
    float core = exp(-t * 4.9);
    float halo = exp(-t * 2.45);
    float glow = core * 0.9 + halo * 0.1;

    float edgeMix = smoothstep(0.12, 0.95, dist);
    vec3 blobRgb = mix(glowRgb, glowRgbEdge, edgeMix);

    float breathe = 0.88 + 0.12 * sin(uTime * 0.48 + fi * 2.17 + h1 * 4.8);
    float w = glow * vis * breathe * (0.52 + h3 * 0.4) * 5.0;
    glowRgbAcc += blobRgb * w;
    glowWAcc += w;
  }

  float a = clamp(glowWAcc, 0.0, 0.98);
  vec3 glowMix =
    glowWAcc > 1e-4 ? glowRgbAcc / glowWAcc : glowRgb;
  rgb = mix(rgb, glowMix, a);

  vec3 flatBase = uBaseRgb;
  float intro = smoothstep(0.0, 1.0, clamp(uIntro, 0.0, 1.0));
  rgb = mix(flatBase, rgb, intro);

  gl_FragColor = vec4(rgb, 1.0);
}
`;
