/*

CS299 - Project

Group: 58D68D

First Name: Kuptapa 
Last Name: Wisarnjarusorn
Student ID: 6409610596
E-mail: kuptapa.wis@dome.tu.ac.th

First Name: Thanakorn
Last Name: Chairattanathananon
Student ID: 6409610620
E-mail: thanakorn.chai@dome.tu.ac.th

*/

// Import CSS
import './style.css'

// Import three js
import * as THREE from 'three';

import { InteractionManager } from "three.interactive";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RectAreaLightHelper }  from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

// Global Variables
let camera, scene, renderer;
let light, rectLight, rectLight2, lanLight, lanLight2, lanLight3, lanLight4, lanLight5, lanLight6, lanLight7, lanLight8, lanLight9, lanLight10, lanLight11, lanLight12;
let controls, water, sun;
let root, island, tree, sakura, bamboolight, lantern, fox, shrine, tori, bridge;
let time = 89;

// Call Function when loading the Website
init();
animate();

// Main Function
function init() {
	// UI Button
	document.getElementById("b1").addEventListener("click",setNight);
	document.getElementById("b2").addEventListener("click",setDay);
	document.getElementById("b3").addEventListener("click",foxui);
	document.getElementById("b4").addEventListener("click",lampui);
	document.getElementById("b5").addEventListener("click",lanternui);
	document.getElementById("b6").addEventListener("click",treeui);
	document.getElementById("b7").addEventListener("click",toriui);
	document.getElementById("b8").addEventListener("click",shrineui);
	document.getElementById("b9").addEventListener("click",bridgeui);

	// Function for UI Button
	function foxui(){ 
		if(fox.scale.x > 0)
			fox.scale.set(0, 0, 0);
		else  
		fox.scale.set(0.827, 0.827, 0.827);
	}

	function lampui(){ 
		if(bamboolight.scale.x > 1){
			bamboolight.scale.set(0, 0, 0);
			offLamp(false);
		} else 
		bamboolight.scale.set(4.136, 4.136, 4.136);
	}

	function lanternui(){ 
		if(lantern.scale.x > 0){
			lantern.scale.set(0, 0, 0);
			offLan(false);
		} else 
		lantern.scale.set(0.962, 1.259, 0.962);
	}

	function treeui(){ 
		if(tree.scale.x > 1) {
			tree.scale.set(0, 0, 0);
			sakura.scale.set(0, 0, 0);
		} else  {
			tree.scale.set(20.4, 20.4, 20.4);
			sakura.scale.set(8.866, 8.866, 8.866);
		}
	}

	function toriui(){
		if(tori.scale.x > 0)
			tori.scale.set(0, 0, 0);
		else  
		tori.scale.set(1, 1, 1);
	}

	function shrineui(){
		if(shrine.scale.x > 0)
			shrine.scale.set(0, 0, 0);
		else  
		shrine.scale.set(0.666, 0.666, 0.666);
	}

	function bridgeui(){
		if(bridge.scale.x > 0)
			bridge.scale.set(0, 0, 0);
		else  
		bridge.scale.set(1, 1, 1);
	}

	// Create a renderer
	renderer = new THREE.WebGLRenderer();
	// Set PixelRatio
	renderer.setPixelRatio( window.devicePixelRatio );
	// Set Size
	renderer.setSize( window.innerWidth, window.innerHeight );
	// Enable ShadowMap
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	document.body.appendChild( renderer.domElement );

	// Create a scene, that will hold all elements 
	scene = new THREE.Scene();
	// Create camera
	const fieldOfView = 75;
	camera = new THREE.PerspectiveCamera( fieldOfView, window.innerWidth / window.innerHeight, 1, 20000 );
	// Set camera position
	camera.position.set( 0, 25, -90 );

	// Create Interaction
	const interactionManager = new InteractionManager(
		renderer,
		camera,
		renderer.domElement
		);

	// Play Audio on load
	{
		const listener = new THREE.AudioListener();
		camera.add( listener );

		// Create a global audio source
		const sound = new THREE.Audio( listener );

		// Load a sound and set it as the Audio object's buffer
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( '/assets/Flickering_Sakura.ogg', function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.5 );
			sound.play();
		});
	}

	// Create Light
	{
		// Create Sunlight
		light = new THREE.DirectionalLight(0xFFFFFF, 3);
		light.position.set(0, 30, -120);
		light.target.position.set(0, 0, 0);
		light.castShadow = true;
		light.shadow.camera.left = -100;
		light.shadow.camera.right = 100;
		light.shadow.camera.top = 100;
		light.shadow.camera.bottom = -100;
		scene.add(light);
		scene.add(light.target);

		// Create Light for Bamboolight
		rectLight = new THREE.RectAreaLight( 0xffcc66, 0, 6, 6);
		rectLight.position.set( 15, 17, -44);
		rectLight.lookAt( 15, 0, -44);
		scene.add( rectLight )

		rectLight2 = new THREE.RectAreaLight( 0xffcc66, 0, 6, 6);
		rectLight2.position.set( 35, 15.5, -17);
		rectLight2.lookAt( 35, 0, -17);
		scene.add( rectLight2 )

		// Create Light for Lantern
		lanLight = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight.position.set( 21, 6, -9);
		lanLight.lookAt( 21, 0, -9);
		scene.add( lanLight )

		lanLight2 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight2.position.set( 5, 6, -22);
		lanLight2.lookAt( 5, 0, -22);
		scene.add( lanLight2 )

		lanLight3 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight3.position.set( 6, 6, 8);
		lanLight3.lookAt( 6, 0, 8);
		scene.add( lanLight3 )

		lanLight4 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight4.position.set( -9, 6, -5);
		lanLight4.lookAt( -9, 0, -5);
		scene.add( lanLight4 )

		lanLight5 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight5.position.set( -9, 7.3, 20);
		lanLight5.lookAt( -9, 0, 20);
		scene.add( lanLight5 )

		lanLight6 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight6.position.set( -19, 6.8, 2);
		lanLight6.lookAt( -19, 0, 2);
		scene.add( lanLight6 )

		lanLight7 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight7.position.set( -27, 11.7, 24);
		lanLight7.lookAt( -27, 0, 24);
		scene.add( lanLight7 )

		lanLight8 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight8.position.set( -33, 10.2, 5);
		lanLight8.lookAt( -33, 0, 5);
		scene.add( lanLight8 )

		lanLight9 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight9.position.set( -44, 12.7, 29);
		lanLight9.lookAt( -44, 0, 29);
		scene.add( lanLight9 )

		lanLight10 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight10.position.set( -45, 11, 12);
		lanLight10.lookAt( -45, 0, 12);
		scene.add( lanLight10 )

		lanLight11 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight11.position.set( -20, 17.7, 41);
		lanLight11.lookAt( -20, 0, 41);
		scene.add( lanLight11 )

		lanLight12 = new THREE.RectAreaLight( 0xffcc66, 0, 4, 4);
		lanLight12.position.set( -39, 17.7, 46);
		lanLight12.lookAt( -39, 0, 46);
		scene.add( lanLight12 )
	}

	// Load Gltf model
	{
		const gltfLoader = new GLTFLoader();
		gltfLoader.load('/assets/Tori_Island.gltf', (gltf) => {
			root = gltf.scene;
			// Enable castShadow and receiveShadow
			root.traverse( function( node ) {
				if ( node.isMesh || node.isLight ) node.castShadow = true;
				if ( node.isMesh || node.isLight ) node.receiveShadow = true;
			} );

			// Set the scale, position, and rotation of model
			root.scale.set(2, 2, 2);
			root.rotation.y = 4;
			root.position.y = 2;
			scene.add(root);

			// Add model to variables
			island = root.getObjectByName('Island');
			tree = root.getObjectByName('ThreeGroup');
			sakura = root.getObjectByName('SakuraGroup');
			bamboolight = root.getObjectByName('BambooLightGroup');
			lantern = root.getObjectByName('LanternGroup');
			fox = root.getObjectByName('Fox');
			shrine = root.getObjectByName('Shrine');
			tori = root.getObjectByName('ToriGroup');
			bridge = root.getObjectByName('Bridge');

			// Add interaction when click on models
			interactionManager.add(bamboolight);
			bamboolight.addEventListener("click", (event) => {
				if(bamboolight.scale.x > 1 && rectLight.intensity == 0){
					onLamp(true);;
				} else{
					offLamp(true);
				}
				interactionManager.update();
			});

			interactionManager.add(lantern);
			lantern.addEventListener("click", (event) => {
				if(lantern.scale.x > 0 && lanLight.intensity == 0){
					onLan(true);
				} else{
					offLan(true);
				}
				interactionManager.update();
			});

			interactionManager.add(fox);
			fox.addEventListener("click", (event) => {
				var audio = new Audio('assets/fox.mp3');
				audio.play();
				interactionManager.update();
			});

			interactionManager.add(tree);
			tree.addEventListener("click", (event) => {
				var audio = new Audio('assets/tree.mp3');
				audio.play();
				interactionManager.update();
			});

			interactionManager.add(sakura);
			sakura.addEventListener("click", (event) => {
				var audio = new Audio('assets/tree.mp3');
				audio.play();
				interactionManager.update();
			});

			interactionManager.add(shrine);
			shrine.addEventListener("click", (event) => {
				var audio = new Audio('assets/shrine.mp3');
				audio.play();
				interactionManager.update();
			});

			// Compute the box that contains all the stuff
			const box = new THREE.Box3().setFromObject(root);
			const boxSize = box.getSize(new THREE.Vector3()).length();
			const boxCenter = box.getCenter(new THREE.Vector3());
			boxCenter.y += 200;

			// Set the camera to frame the box
			frameArea(boxSize, boxSize, boxCenter, camera);

			// Update the Trackball controls to handle the new size
			controls.maxDistance = boxSize * .1;
			controls.target.copy(boxCenter);
			controls.update();
		});
	}

	// Add Lotus Leaf and Star
	{
		// Function for random number between min-max values function
		function getRndNum(min, max) {
			return Math.floor(Math.random() * (max - min) ) + min;
		}

		// Function for create lotus leaf
		{	
			function createLotusLeaf(rdTop, rdBott, height, rdSeg, color) {
			// Set Cylinder geometry
				const geometry = new THREE.CylinderGeometry( rdTop, rdBott, height, rdSeg);
			// Set phong material
				const material = new THREE.MeshPhongMaterial( {color: color} );
			// Mesh geometry and material
				const lotusLeaf = new THREE.Mesh( geometry, material );
				lotusLeaf.position.x = getRndNum(-150, 150);
				lotusLeaf.position.z = getRndNum(-150, 150);
				return lotusLeaf;
			}
			for(let i=0 ; i<35 ; i++) {
				let rndInt = getRndNum(2, 4);
				scene.add( createLotusLeaf(rndInt, rndInt, 1, 7, 0x3dcc23) );
			}
		}

		// Function for create star
		{	
			function createStar(rd, wSeg, hSeg) {
				const geometry = new THREE.SphereGeometry( rd, wSeg, hSeg );
				const material = new THREE.MeshBasicMaterial( { color: 0xfffff0 } );
				const star = new THREE.Mesh( geometry, material );
				star.position.x = getRndNum(-300, 300);
				star.position.z = getRndNum(-300, 300);
				star.position.y = getRndNum(40, 200);
				return star;
			}
			for(let i=0 ; i<500 ; i++) {
				let rndNum = getRndNum(0.2, 1);
				scene.add( createStar(rndNum, 8, 4) );
			}
		}
	}
	
	// Add Water
	const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
	water = new Water(
		waterGeometry,
		{
			textureWidth: 512,
			textureHeight: 512,
			// warter normal
			waterNormals: new THREE.TextureLoader().load( 'assets/Water_002_NORM.jpg', function ( texture ) {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			} ),
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
		}
		);
	water.rotation.x = - Math.PI / 2;
	scene.add( water );
	
	// Add Sky
	const sky = new Sky();
	sky.scale.setScalar( 10000 );
	scene.add( sky );

	const skyUniforms = sky.material.uniforms;

	skyUniforms[ 'turbidity' ].value = 10;
	skyUniforms[ 'rayleigh' ].value = 2;
	skyUniforms[ 'mieCoefficient' ].value = 0.005;
	skyUniforms[ 'mieDirectionalG' ].value = 0.8;

	const parameters = {
		elevation: 2,
		azimuth: 180
	};

	const pmremGenerator = new THREE.PMREMGenerator( renderer );
	let renderTarget;

	// Add Sun
	sun = new THREE.Vector3();
	// Function for set time
	function updateSun() {
		const phi = THREE.MathUtils.degToRad( time - parameters.elevation );
		const theta = THREE.MathUtils.degToRad( parameters.azimuth );

		sun.setFromSphericalCoords( 1, phi, theta );

		sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
		water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

		if ( renderTarget !== undefined ) renderTarget.dispose();

		renderTarget = pmremGenerator.fromScene( sky );

		scene.environment = renderTarget.texture;

	}

	// Run function updateSun to set the time
	updateSun();

	// Add OrbitControls to control the camera
	controls = new OrbitControls( camera, renderer.domElement );
	controls.maxPolarAngle = Math.PI * 0.495;
	controls.target.set( 0, 10, 0 );
	controls.minDistance = 40.0;
	controls.maxDistance = 200.0;
	controls.update();

	// Set water material
	const waterUniforms = water.material.uniforms;

	// Call onWindowResize function
	window.addEventListener( 'resize', onWindowResize );

	// Function for set time to day
	function setDay(){
		time = 89;
		light.intensity = 3;
		offLamp(false);
		offLan(false);
		updateSun();
	}

	// Function for set time to night
	function setNight(){
		time = 150;
		light.intensity = 0;
		if(bamboolight.scale.x > 1)
			onLamp(false);
		if(lantern.scale.x > 0)
			onLan(false);
		updateSun();
	}

	// Function for turn on BambooLamp
	function onLamp(play){
		if(play){
			var audio = new Audio('assets/lamp.mp3');
			audio.play();
		}
		rectLight.intensity = 50;
		rectLight2.intensity = 50;
	}

	// Function for turn off BambooLamp
	function offLamp(play){
		if(play){
			var audio = new Audio('assets/lamp.mp3');
			audio.play();
		}
		rectLight.intensity = 0;
		rectLight2.intensity = 0;
	}

	// Function for turn on Lantern
	function onLan(play){
		if(play){
			var audio = new Audio('assets/lamp.mp3');
			audio.play();
		}
		lanLight.intensity = 10;
		lanLight2.intensity = 10;
		lanLight3.intensity = 10;
		lanLight4.intensity = 10;
		lanLight5.intensity = 10;
		lanLight6.intensity = 10;
		lanLight7.intensity = 10;
		lanLight8.intensity = 10;
		lanLight9.intensity = 10;
		lanLight10.intensity = 10;
		lanLight11.intensity = 10;
		lanLight12.intensity = 10;
	}

	// Function for turn off Lantern
	function offLan(play){
		if(play){
			var audio = new Audio('assets/lamp.mp3');
			audio.play();
		}
		lanLight.intensity = 0;
		lanLight2.intensity = 0;
		lanLight3.intensity = 0;
		lanLight4.intensity = 0;
		lanLight5.intensity = 0;
		lanLight6.intensity = 0;
		lanLight7.intensity = 0;
		lanLight8.intensity = 0;
		lanLight9.intensity = 0;
		lanLight10.intensity = 0;
		lanLight11.intensity = 0;
		lanLight12.intensity = 0;
	}
}

// Function for autowindow resize
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// Function for run animation
function animate() {
	requestAnimationFrame( animate );
	render();
}

// Function for make animation
function render() {
	// Create time variables
	const time = performance.now() * 0.001;
	// Set water material based on time
	water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

	// Render scene and camera
	renderer.render( scene, camera );

	// Set Island movement based on time
	root.position.y += Math.cos(time) / 200;
	rectLight.position.y += Math.cos(time) / 200;
	rectLight2.position.y += Math.cos(time) / 200;
	lanLight.position.y += Math.cos(time) / 200;
	lanLight2.position.y += Math.cos(time) / 200;
	lanLight3.position.y += Math.cos(time) / 200;
	lanLight4.position.y += Math.cos(time) / 200;
	lanLight5.position.y += Math.cos(time) / 200;
	lanLight6.position.y += Math.cos(time) / 200;
	lanLight7.position.y += Math.cos(time) / 200;
	lanLight8.position.y += Math.cos(time) / 200;
	lanLight9.position.y += Math.cos(time) / 200;
	lanLight10.position.y += Math.cos(time) / 200;
	lanLight11.position.y += Math.cos(time) / 200;
	lanLight12.position.y += Math.cos(time) / 200;
}