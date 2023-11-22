var camera, scene, renderer, controls;
var geometry, material, cube, cylinder, sphere;

var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();



init();
render();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    addObjects();
    addLights();

    controls = new THREE.OrbitControls( camera, renderer.domElement );

}

function render() {

    requestAnimationFrame( render );


    renderer.render( scene, camera );
    camera.lookAt(scene.position);
    update();
    renderer.shadowMap.enabled = true;

    //Pridanie fragmentu pre animovanie krivky


}

function addObjects(){

    var floorTexture = new THREE.ImageUtils.loadTexture( 'texture/floor.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );

    var textureCube = new THREE.ImageUtils.loadTexture( 'texture/box.jpg' );
    var geometryPlane = new THREE.PlaneGeometry( 20, 20, 4, 4 );
    var materialPlane = new THREE.MeshStandardMaterial( {
        map: floorTexture,
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65} );
    plane = new THREE.Mesh( geometryPlane, materialPlane );
    plane.position.set(0, -0.5, 0);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    var geometrySphere = new THREE.SphereGeometry( 100, 100, 100 );
    var sphereTexture = new THREE.ImageUtils.loadTexture( 'texture/sky.jpg' );
    var materialSphere = new THREE.MeshBasicMaterial( {map: sphereTexture, transparent: true, side: THREE.DoubleSide} );
    sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphere.position.set(0, 0, 0);
    scene.add( sphere );

    //Pridanie fragmentu pre objekt kocky




    //Pridanie fragmentu pre nacitanie modelov

}

function addLights(){

    var ambientLight = new THREE.AmbientLight(0xFFFFFF);
     scene.add(ambientLight);

    var spotlight = new THREE.SpotLight('rgb(255,255,255)');
    spotlight.angle = Math.PI/1;
    spotlight.position.set(0, 4, 2);spotlight.intensity = 2;
    spotlight.castShadow = true;
    scene.add(spotlight);
    spotlight.penumbra = 1;
    var spotLightHelper = new THREE.SpotLightHelper( spotlight );
    scene.add( spotLightHelper );


}

function update()
{
    controls.update();
}


