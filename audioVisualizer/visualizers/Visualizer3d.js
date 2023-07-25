import Visualizer from "./Visualizer.js";

export default class Visualizer3d extends Visualizer{
    initCanvas() {
        // create a scene with a camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0,0,100);
        this.camera.lookAt(this.scene.position);
        this.scene.add(this.camera);

        // add some ambient light
        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        this.scene.add(ambientLight);

        // renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.container.replaceChildren(this.renderer.domElement);

        this.connectListeners();
    }

    connectListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }
}