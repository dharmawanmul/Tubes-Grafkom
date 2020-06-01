renderer.shadowMapEnabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

controls = new THREE.OrbitControls( cam, renderer.domElement );
controls.addEventListener('change', renderer );

let meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000, 100, 100),
    new THREE.MeshPhongMaterial({wireframe: true, visible:false})
);
meshFloor.rotation.x -= Math.PI / 2;
meshFloor.receiveShadow = true;
meshFloor.position = 0, -1, 0;
scene.add(meshFloor);

let clock = new THREE.Clock();

//Global variables object
var veemon, flamedramon, magnamon, clickedObject;
//Buat raycast
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;
var action;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var target = new THREE.Object3D();
var parkLoader = new THREE.GLTFLoader();
parkLoader.load('models/donePark.gltf', function (park) {
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

scene.background = skyBox;

var pointLight = new THREE.PointLight( 0xffffff, 8, 250, 2 );
pointLight.position.set( 0, 50, -200 );
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 1000;
scene.add( pointLight );

let animation;
let mixer; 
let idx = 0;
let veemonLoader=new THREE.GLTFLoader().load('models/veemon.gltf', function(vee){
    animation = vee.animations;
    mixer = new THREE.AnimationMixer(vee.scene);
    action = mixer.clipAction(animation[0]);
    action.play();
    vee.scene.traverse( function (child) {
        if (child instanceof THREE.Mesh) { 
            child.castShadow = true; 
            child.receiveShadow = true; }
    })
    vee.scene.scale.set(2,2,2);
    vee.scene.position.y = 3.1;
    veemon = vee.scene;
    scene.add(veemon);
    // veemon=result.scene.children[0];
    // scene.add(veemon);
});

let flamedramonLoader = new THREE.GLTFLoader().load('models/flamedramon.gltf', function(flame){
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
    flamedramon = flame.scene;
    scene.add(flamedramon);
});

let magnamonLoader = new THREE.GLTFLoader().load('models/magnamon.gltf', function(magna){
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
    magna.scene.position.y = 3.5;
    magna.scene.position.x = 8;
    magnamon = magna.scene;
    scene.add(magnamon);
});

let keyboard=[];
document.body.onkeydown=function(evt){
    keyboard[evt.key]=true;
}
document.body.onkeyup=function(evt){
    keyboard[evt.key]=false;
    action = mixer.stopAllAction();
    action = mixer.existingAction(animation[0]);
    action.play();
}

//Ini buat raycast, mouse
function onDocumentMouseMove( evt ) {
    evt.preventDefault();

    mouse.x = ( evt.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( evt.clientY / window.innerHeight ) * 2 + 1;
}
let gerak = false;
//ini process_keyboard sebelomnya
function keyPressed(){
    delta = clock.getDelta();
    var moveDistance = 100 * delta;
    let nextAct;
    if(keyboard['a']){
        //ini juga apakah x ?
    }
    else if(keyboard['d']){
        //ini x ?
    }
    if (keyboard['w']){
        action = mixer.clipAction(animation[2]);
        action.play();
        if(veemon.position.z>=-9 && veemon.position.z<=12 && veemon.position.x>=-10 && veemon.position.x<=15)
            veemon.translateZ( moveDistance );
        else if(veemon.position.z>=12)
            veemon.position.z = 12;
        else if(veemon.position.z<=-9){
            veemon.position.z = -9;
        }
        else if(veemon.position.x>=15)
            veemon.position.x = 15;
        else if(veemon.position.x<=-10)
            veemon.position.x = -10;
        console.log(veemon.position.x);
        // console.log(veemon.translateZ( moveDistance ));
    }
    else if(keyboard['s']){
        action = mixer.clipAction(animation[2]);
        action.play();
        if(veemon.position.z>=-9 && veemon.position.z<=12 && veemon.position.x>=-10 && veemon.position.x<=15)
        veemon.translateZ( -moveDistance );
        else if(veemon.position.z>=12)
            veemon.position.z = 12;
        else if(veemon.position.z<=-9)
            veemon.position.z = -9;        // console.log(veemon.position.z);
        else if(veemon.position.x>=15)
            veemon.position.x = 15;
        else if(veemon.position.x<=-15)
            veemon.position.x = -15;
        }
    if (keyboard['q']){
        action = mixer.clipAction(animation[2]);
        action.play();
        veemon.rotation.y += delta + 0.05;
    }
    else if(keyboard['e']){
        action = mixer.clipAction(animation[2]);
        action.play();
        veemon.rotation.y -= delta + 0.05;
    }
    // if(keyboard['w']){
    //     if(!gerak){
    //         action = mixer.stopAllAction();
    //         action = mixer.clipAction(animation[0]);
    //         action.play();
    //     }
    // }
   
}

function draw(){
    //Ini fungsi raycast + tambahan clicked object <Belom jalan>
    var intersects = raycaster.intersectObjects( scene.children, true );
        if ( intersects.length > 0 ) {
            clickedObject = intersects[0].object;
            if ( INTERSECTED != intersects[ 0 ].object ) {
                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0xff0000 );
            }
        } else {
            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
            INTERSECTED = null;
        }
    if(mixer){
        mixer.update(clock.getDelta());
    }
    keyPressed();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();