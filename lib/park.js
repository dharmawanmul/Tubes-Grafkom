
renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

var particleSystem, particleCount, particles;

//particle (snow) material
particleCount = 15000;
var snowTexture = new THREE.TextureLoader().load('texture/snow-small.png');
var pMaterial = new THREE.PointCloudMaterial({
    color: 0xffffff,
    size: 2,
    map: snowTexture,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
});

let parkLoader = new THREE.GLTFLoader().load('models/park.gltf',function(evt){
    console.log(evt);
    // evt.scene.children[0].position(0,0,0);
    park = evt.scene.children[0];
    park.position.y = -2; 
    scene.add(park);
})

//land
let plane = new THREE.PlaneGeometry(300, 300, 50, 50);
let planeMaterial = new THREE.MeshLambertMaterial(
    {
        // color : 0xffffaa,
        map : new THREE.TextureLoader().load('texture/land.jpg'),
    }
);
let planeMesh = new THREE.Mesh(plane,planeMaterial);
planeMesh.position.set(0,-1,0);
planeMesh.rotation.x -= Math.PI/2;
scene.add(planeMesh);

//snow
// particles = new THREE.Geometry;
// for (var i = 0; i < particleCount; i++) {
//     var pX = Math.random()*500 - 250,
//         pY = Math.random()*500 - 250,
//         pZ = Math.random()*500 - 250,
//         particle = new THREE.Vector3(pX, pY, pZ);
//     particle.velocity = {};
//     particle.velocity.y = 0;
//     particles.vertices.push(particle);
// }
particleSystem = new THREE.PointCloud(particles, pMaterial);
scene.add(particleSystem);

let controls = new THREE.OrbitControls(cam, renderer.domElement);

function makeSnowing() {
    var pCount = particleCount;
    while (pCount--) {
        var particle = particles.vertices[pCount];
        if (particle.y < 0) {
            particle.y = 450;
            particle.velocity.y = 0;
        }
        particle.velocity.y -= Math.random() * .02;
        particle.y += particle.velocity.y;
    }
    particles.verticesNeedUpdate = true;
}

let pLight = new THREE.DirectionalLight(0xffffff,1);
pLight.position.set(0,100,0);
scene.add(pLight);

function draw(){
    cloudParticles.forEach(p=>{
        p.rotation.z -= 0.002;
    })
    particleSystem.rotation.y += 0.01;
    makeSnowing();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();