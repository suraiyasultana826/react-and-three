import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './App.css'
import { useEffect } from 'react';
import sunTexture from '../src/assets/sun.jpg'
import Navbar from './Navbar';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();

    const solarSystemGroup = new THREE.Group();
    const earthOrbit = new THREE.Group();

    const sunGeo = new THREE.SphereGeometry(4);
    const sunMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(sunTexture)
    });

    const sun = new THREE.Mesh(sunGeo, sunMat);
    solarSystemGroup.add(sun);
    scene.add(solarSystemGroup);


    const earthGeo = new THREE.SphereGeometry(2);
    const earthMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load('../src/assets/img/earth.jpg')
    });

    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.x=12;
    earthOrbit.add(earth)
    scene.add(earthOrbit);

    const moonOrbit = new THREE.Group();
    const moonGeo = new THREE.SphereGeometry(1);
    const moonMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load('../src/assets/img/pluto.jpg')
    });

    const moon = new THREE.Mesh(moonGeo, moonMat);
    moonOrbit.add(moon);
    moonOrbit.position.x = 12;
    moon.position.x = 4;
    earthOrbit.add(moonOrbit);


    //add orbit controls.
    const controls = new OrbitControls(camera, renderer.domElement);
    //add FPS stats.
    const stats = Stats();
    document.body.appendChild(stats.dom);

    camera.position.z = 50;



    function animate() {

      sun.rotation.y += 0.005;
      earthOrbit.rotation.y += 0.005;
      moonOrbit.rotation.y += 0.05;
      stats.update();
      controls.update();

      renderer.render(scene, camera);
      // window.requestAnimationFrame(animate);

    }
    renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }, [])

  return (
    <>
    <Navbar></Navbar>
        <canvas id='myThreeJsCanvas' />
     
    </>
  )
}

export default App
