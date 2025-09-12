import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const DropdownThreeBG = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.offsetWidth / 200, 0.1, 1000);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.offsetWidth, 200);
    mount.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xcc66ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(2, 2, 2);
    scene.add(light);

    // Animation
    let frameId: number;
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: 200, position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
};

export default DropdownThreeBG;
