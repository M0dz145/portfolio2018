import Boid from "./Boid";
import Bird from "./Bird";

const THREE = require('three-js')(['Projector', 'CanvasRenderer']);

export default class BirdsProvider {
    constructor(element) {
        this.element = element;
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;
    }

    init() {
        this.camera = new THREE.PerspectiveCamera(75, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000);
        this.camera.position.z = 450;

        this.scene = new THREE.Scene();

        this.birds = [];
        this.boids = [];

        for(var i = 0; i < 9; i++) {
            this.boid = this.boids[i] = new Boid();
            this.boid.position.set(Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200);
            this.boid.velocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
            this.boid.setAvoidWalls(true);
            this.boid.setWorldSize(500, 500, 400);

            this.bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                side: THREE.DoubleSide
            }));

            this.bird.phase = Math.floor(Math.random() * 62.83);
            this.bird.position.set(this.boids[i].position.x, this.boids[i].position.y, this.boids[i].position.z);

            this.scene.add(this.bird);
        }

        this.renderer = new THREE.CanvasRenderer();
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

        this.element.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize, false);

        this.animate();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        for(let i = 0, il = this.birds.length; i < il; i++) {
            this.boid = this.boids[i];
            this.boid.run(this.boids);

            this.bird = this.birds[i];
            this.bird.position.copy(this.boids[i].position);

            let color = this.bird.material.color;
            color.r = color.g = color.b = (500 - this.bird.position.z) / 1000;

            this.bird.rotation.y = Math.atan2(-this.boid.velocity.z, this.boid.velocity.x);
            this.bird.rotation.z = Math.asin(this.boid.velocity.y / this.boid.velocity.length());

            this.bird.phase = (this.bird.phase + (Math.max(0, this.bird.rotation.z) + 0.1)) % 62.83;
            this.bird.geometry.vertices[5].y = this.bird.geometry.vertices[4].y = Math.sin(this.bird.phase) * 5;
        }

        this.renderer.render(this.scene, this.camera);
    }
}