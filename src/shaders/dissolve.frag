uniform sampler2D tDiffuse; // Pour React Three Fiber
varying vec3 vPos;
uniform float uFreq;
uniform float uAmp;
uniform float uProgress;
uniform float uEdge;
uniform vec3 uEdgeColor;

#include ./shared/snoise.glsl

void main() {
  vec4 baseEffect = texture2D(tDiffuse, gl_PointCoord);
  float noise = snoise(vPos * uFreq) * uAmp;

  if (noise < uProgress) discard;

  float edgeWidth = uProgress + uEdge;

  if (noise > uProgress && noise < edgeWidth) {
    gl_FragColor = vec4(uEdgeColor, 1.0);
  } else {
    gl_FragColor = baseEffect;
  }
}
