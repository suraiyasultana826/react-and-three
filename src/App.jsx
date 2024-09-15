import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import './App.css'
import { useEffect } from 'react';
import sunTexture from '../src/assets/sun.jpg'

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
  });

const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);


    //add orbit controls.
    const controls = new OrbitControls(camera, renderer.domElement);
    //add FPS stats.
    const stats = Stats();
    document.body.appendChild(stats.dom);

    camera.position.z = 50;
    


    function animate() {

      sun.rotation.y += 0.005;
      stats.update();
      controls.update();

      renderer.render(scene, camera);
            window.requestAnimationFrame(animate);

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
      <div>
        <canvas id='myThreeJsCanvas' />
      </div>
    </>
  )
}

export default App
