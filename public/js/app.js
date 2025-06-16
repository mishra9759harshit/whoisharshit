// Drawer toggle
document.addEventListener("DOMContentLoaded", () => {
  const drawerBtn = document.getElementById("drawerBtn");
  const sidebar = document.getElementById("sidebar");

  drawerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    drawerBtn.classList.toggle("hidden"); // Hide drawerBtn when sidebar opens
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !drawerBtn.contains(e.target)) {
      sidebar.classList.add("-translate-x-full");
      drawerBtn.classList.remove("hidden"); // Show drawerBtn when sidebar closes
    }
  });

  // Auto-hide "Tap here" message after 3 seconds
  const info = document.getElementById("drawerInfo");
  if (info) {
    setTimeout(() => {
      info.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-700");
    }, 3000);
  }
});

// Popup
function togglePopup(id) {
  document.getElementById(id)?.classList.toggle("hidden");
}

//project popup 
function togglePopup(id) {
  const popup = document.getElementById(id);
  popup.classList.toggle('hidden');
}


// Load GLB model with Three.js
function loadGLB(targetId, modelPath, rotate = true) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.warn(`Container with ID "${targetId}" not found.`);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = false;

  camera.position.set(0, 1.5, 3);
  controls.update();

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2);
      scene.add(model);
      console.log(`✅ Loaded model: ${modelPath}`);

      const animate = () => {
        requestAnimationFrame(animate);
        if (rotate) model.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error(`❌ Error loading model: ${modelPath}`, error);
    }
  );

  // Auto resize handler
  window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// Initialize GLB models
loadGLB("logo3d", "../assets/sci-fi_computer.glb");
loadGLB("map3d", "../assets/pirates_map.glb", false);
loadGLB("computer3d", "../assets/portable_radio__walkie_talkie_dual_band.glb");

// GSAP animation
gsap.from("section", {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.3
});
