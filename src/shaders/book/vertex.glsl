attribute vec3 position;
attribute vec3 normal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

varying vec3 vNormal;

void main() {
    // Pass the transformed normal to the fragment shader
    vNormal = normalize(normalMatrix * normal);

    // Transform the position by the modelView and projection matrices
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}