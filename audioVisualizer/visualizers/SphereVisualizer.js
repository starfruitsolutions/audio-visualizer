import Visualizer3d from "./visualizer3d.js";

export default class SphereVisualizer extends Visualizer3d{
    init() {
        this.noise = new SimplexNoise();

        // scene group
        this.group = new THREE.Group();

        // scene items
        // create planes
        var planeGeometry = new THREE.PlaneGeometry(800, 800, 20, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x6904ce,
            side: THREE.DoubleSide,
            wireframe: true
        });

        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -0.5 * Math.PI;
        this.plane.position.set(0, 30, 0);
        this.group.add(this.plane);

        this.plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane2.rotation.x = -0.5 * Math.PI;
        this.plane2.position.set(0, -30, 0);
        this.group.add(this.plane2);

        // create sphere
        var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
        var lambertMaterial = new THREE.MeshLambertMaterial({
            color: 0xff00ee,
            wireframe: true
        });

        this.sphere = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
        this.sphere.position.set(0, 0, 0);
        this.group.add(this.sphere);

        // shine a light at the sphere
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.intensity = 0.9;
        spotLight.position.set(-10, 40, 20);
        spotLight.lookAt(this.sphere);
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        this.scene.add(this.group);

    }

    draw() {
        const noise = this.noise;
        let frequencyData = this.audioAnalyser.getFrequencyData();

        var lowerHalfArray = frequencyData.slice(0, (frequencyData.length / 2) - 1);
        var upperHalfArray = frequencyData.slice((frequencyData.length / 2) - 1, frequencyData.length - 1);

        var lowerMaxFr = Math.max(...lowerHalfArray) / lowerHalfArray.length;
        var upperAvgFr = (upperHalfArray.reduce((sum, b) => sum + b) / upperHalfArray.length) / upperHalfArray.length;

        modulatePlane(this.plane, modulate(upperAvgFr, 0, 1, 0.5, 4));
        modulatePlane(this.plane2, modulate(lowerMaxFr, 0, 1, 0.5, 4));

        modulateSphere(this.sphere, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));

        this.group.rotation.y += 0.005;
        this.renderer.render(this.scene, this.camera);

        function modulate(val, minVal, maxVal, outMin, outMax) {
            var fr = (val - minVal) / (maxVal - minVal);
            var delta = outMax - outMin;
            return outMin + (fr * delta);
        }

        function modulateSphere(mesh, bassFr, treFr) {
            mesh.geometry.vertices.forEach(function (vertex, i) {
                var offset = mesh.geometry.parameters.radius;
                var amp = 7;
                var time = window.performance.now();
                vertex.normalize();
                var rf = 0.00001;
                var distance = (offset + bassFr ) + noise.noise3D(vertex.x + time *rf*7, vertex.y +  time*rf*8, vertex.z + time*rf*9) * amp * treFr;
                vertex.multiplyScalar(distance);
            });
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }

        function modulatePlane(mesh, distortionFr) {
            mesh.geometry.vertices.forEach(function (vertex, i) {
                var amp = 2;
                var time = Date.now();
                var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
                vertex.z = distance;
            });
            mesh.geometry.verticesNeedUpdate = true;
            mesh.geometry.normalsNeedUpdate = true;
            mesh.geometry.computeVertexNormals();
            mesh.geometry.computeFaceNormals();
        }
    }

    stop() {
        this.playing = false;
    }
}