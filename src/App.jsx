import * as THREE from 'three';
import './App.css'
import { useEffect } from 'react';

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


    const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

    const particlesGeometry = new THREE.BufferGeometry;
    const particlesCnt = 5000;

    const posArray = new Float32Array(particlesCnt * 3);

    for (let i =0; i <particlesCnt*3; i++){
      posArray[i] = (Math.random() - 0.5 )* 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    // Materials

    const material = new THREE.PointsMaterial({
      size:0.005,
     transparent: true
    })

    // Mesh
    const sphere = new THREE.Points(geometry, material)
    const particleMesh = new THREE.Points(particlesGeometry, material)
    scene.add(sphere, particleMesh)

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)


   

    camera.position.z = 50;

    function animate() {


      renderer.render(scene, camera);

    }
    renderer.setAnimationLoop(animate);
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    // scene.add(camera)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(new THREE.Color('#212020'), 1)


    //mouseMove

    document.addEventListener('mousemove', animateParticles)
    let mouseX =0
    let mouseY = 0

    function animateParticles(event){
      mouseX = event.clientX
      mouseY = event.clientY
    }

    /**
 * Animate
 */

    const clock = new THREE.Clock()

    const tick = () => {

      const elapsedTime = clock.getElapsedTime()

      // Update objects
      sphere.rotation.y = .5 * elapsedTime

      particleMesh.rotation.y = -.1 * elapsedTime
      if(mouseX > 0){
      particleMesh.rotation.x = -mouseY * (elapsedTime * 0.0008)
      particleMesh.rotation.y = mouseX * (elapsedTime * 0.0008)}

      // Update Orbital Controls
      // controls.update()

      // Render
      // renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

    

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
