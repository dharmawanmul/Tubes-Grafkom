renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

controls = new THREE.OrbitControls( cam, renderer.domElement );
controls.addEventListener('change', renderer );

var particleSystem, particleCount, particles;


let meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 100, 100),
    new THREE.MeshPhongMaterial({wireframe: true, visible:false})
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.receiveShadow = true;
meshFloor.position = 0, -1, 0;
scene.add(meshFloor);

// let ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
// scene.add(ambientLight)


var target = new THREE.Object3D();
var parkLoader = new THREE.GLTFLoader();
parkLoader.load('models/realDigiPark.gltf', function (park) {
    park.scene.traverse( function (child) {
        if (child instanceof THREE.Mesh) { 
            child.castShadow = true; 
            child.receiveShadow = true; }
    })
    park.scene.scale.set(2,2,2);
    scene.add(park.scene);
    target = park.scene;
})

let boxLoader = new THREE.CubeTextureLoader();
let skyBox = boxLoader.load([
    '../skybox/front.png',
    '../skybox/back.png',
    '../skybox/top.png',
    '../skybox/bot.png',
    '../skybox/left.png',
    '../skybox/right.png',
]);

scene.background=skyBox;

var pointLight = new THREE.PointLight( 0xffffff, 8, 250, 2 );
pointLight.position.set( 0, 50, -200 );
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 1000;
scene.add( pointLight );

let veemon;
let animation;
let mixer; 
let idx=0;
let veemonLoader=new THREE.GLTFLoader().load('models/veemon.gltf',function(vee){
    animation = vee.animations;
    mixer = new THREE.AnimationMixer(vee.scene);
    let action = mixer.clipAction(animation[idx]);
    action.play();
    vee.scene.traverse( function (child) {
        if (child instanceof THREE.Mesh) { 
            child.castShadow = true; 
            child.receiveShadow = true; }
    })
    vee.scene.scale.set(2,2,2);
    vee.scene.position.y = 3;
    scene.add(vee.scene);
    // veemon=result.scene.children[0];
    // scene.add(veemon);
});

let keyboard=[];
document.body.onkeydown=function(evt){
    keyboard[evt.key]=true;
}
document.body.onkeyup=function(evt){
    keyboard[evt.key]=false;
}
function process_keyboard(){
    let nextAct;
    if(keyboard['a']){
        
    }
    else if(keyboard['d']){
        
    }
    if (keyboard['w']){
        idx=2;
        nextAct=mixer.clipAction(animation[idx]);
        action=action.crossFadeTo(nextAct,1,true);
        action.enabled=true;
        action.play();
    }
    else if(keyboard['s']){
        
    }
    if (keyboard['q']){
        
    }
    else if(keyboard['e']){
        
    }
}
let flamedramonLoader = new THREE.GLTFLoader().load('models/flamedramon.gltf',function(flame){
    // animation = flame.animations;
    // mixer = new THREE.AnimationMixer(flame.scene);
    // let action = mixer.clipAction(animation[idx]);
    // action.play();
    flame.scene.traverse( function (child) {
        if (child instanceof THREE.Mesh) { 
            child.castShadow = true; 
            child.receiveShadow = true; }
    })
    flame.scene.scale.set(2,2,2);
    flame.scene.position.y = 3;
    flame.scene.position.x = -3;
    scene.add(flame.scene);
});

let magnamonLoader = new THREE.GLTFLoader().load('models/magnamon.gltf',function(magna){
    // animation = magna.animations;
    // mixer = new THREE.AnimationMixer(magna.scene);
    // let action = mixer.clipAction(animation[idx]);
    // action.play();
    magna.scene.traverse( function (child) {
        if (child instanceof THREE.Mesh) { 
            child.castShadow = true; 
            child.receiveShadow = true; }
    })
    magna.scene.scale.set(2,2,2);
    magna.scene.position.y = 3;
    magna.scene.position.x = 8;
    scene.add(magna.scene);
});

// function letItSnow() {
//     var pCount = particleCount;
//     while (pCount--) {
//         var particle = particles.vertices[pCount];
//         if (particle.y < -200) {
//             particle.y = 200;
//             particle.velocity.y = 0;
//         }
//         particle.velocity.y -= Math.random() * .02;
//         particle.y += particle.velocity.y;
//     }
//     particles.verticesNeedUpdate = true;
// }

let clock = new THREE.Clock();

function draw(){
    if(mixer){
        mixer.update(clock.getDelta());
    }
    process_keyboard();
    
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();
