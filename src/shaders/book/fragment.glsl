precision mediump float;

varying vec3 vNormal;

void main() {
    // Normalize the normal vector
    vec3 normal = normalize(vNormal);
    // Base color
    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
    // If the normal is pointing up (y > 0), color it green
    if (normal.y > 0.9) {
        color = vec4(0.0, 1.0, 0.0, 1.0);
    }
    // If the normal is pointing right (x > 0), color it red
    else if (normal.x > 0.9) {
        color = vec4(1.0, 0.0, 0.0, 1.0);
    }
    // If the normal is pointing forward (z > 0), color it blue
    else if (normal.z > 0.9) {
        color = vec4(0.0, 0.0, 1.0, 1.0);
    }

    gl_FragColor = color;
}