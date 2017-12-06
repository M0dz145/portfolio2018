import * as THREEJS from "three";
import CanvasRenderer from './../../threejs/CanvasRenderer'
import Boid from "./Boid";
import Bird from "./Bird";

const THREE = {...THREEJS, CanvasRenderer};

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
            this.boid.position.x = Math.random() * 400 - 200;
            this.boid.position.y = Math.random() * 400 - 200;
            this.boid.position.z = Math.random() * 400 - 200;
            this.boid.velocity.x = Math.random() * 2 - 1;
            this.boid.velocity.y = Math.random() * 2 - 1;
            this.boid.velocity.z = Math.random() * 2 - 1;
            this.boid.setAvoidWalls(true);
            this.boid.setWorldSize(500, 500, 400);

            this.bird = this.birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                side: THREE.DoubleSide
            }));

            this.bird.phase = Math.floor(Math.random() * 62.83);
            this.bird.position.set(this.boids[i].position);

            this.scene.add(this.bird);
        }

        this.renderer = new THREE.CanvasRenderer();
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
        requestAnimationFrame(this.animate);
        render();
    }

    render() {
        for(var i = 0, il = this.birds.length; i < il; i++) {
            this.boid = this.boids[i];
            this.boid.run(this.boids);

            this.bird = this.birds[i];

            let color = this.bird.material.color;
            color.r = color.g = color.b = (500 - this.bird.position.z) / 1000;

            this.bird.rotation.y = Math.atan2(-this.boid.velocity.z, this.boid.velocity.x);
            this.bird.rotation.z = Math.asin(this.boid.velocity.y / this.boid.velocity.length());

            this.bird.phase = (this.bird.phase + (Math.max(0, this.bird.rotation.z) + 0.1)) % 62.83;
            this.bird.geometry.vertices[5].y = this.bird.geometry.vertices[4].y = Math.sin(this.bird.phase) * 5;
        }

        this.renderer.render(scene, camera);
    }
}