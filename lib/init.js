let scene = new THREE.Scene();

let cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    1000
);

let ambient = new THREE.AmbientLight(0x555555);
scene.add(ambient);

//thunder
let thunder = new THREE.PointLight(0x062d89, 30, 400, 1.7);
thunder.position.set(Math.random()*200,500,Math.random()*100);
scene.add(thunder);

//awan
let light = new THREE.DirectionalLight(0xffeedd);
light.position.set(0,0,1);
scene.add(light);
let cloudGeo;
let cloudMaterial;
let cloudParticles = [];

let renderer = new THREE.WebGLRenderer();

cam.position.z = -20; // melihat ke 0,0,0
// cam.rotation.x = 50;
cam.position.y = 10;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);