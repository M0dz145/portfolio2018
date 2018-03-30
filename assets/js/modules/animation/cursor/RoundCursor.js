import flatten from "@modules/array/Flatten";

export default class RoundCursor {
    constructor() {
        if(RoundCursor.instance) {
            return RoundCursor.instance;
        }
        RoundCursor.instance = this;

        this.element = document.getElementById('cursor');

        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.lastPosition = {
            x: this.x,
            y: this.y
        };
        this.vx = 0;
        this.vy = 0;
        this.vcx = 0;
        this.vcy = 0;
        this.rotate = 0;
        this.scaleY = 1;
        this.scaleX = 1;

        this.clickableElements = [];

        document.addEventListener('mousemove', e => {
            this.x = e.clientX;
            this.y = e.clientY;
        });

        this.run();
    }

    onMouseEnterClickableElement() {
        this.element.classList.add('hover');
    }

    onMouseLeaveClickableElement() {
        this.element.classList.remove('hover');
    }

    addEventsClickableElements(elements) {
        this.onMouseEnterClickableElement = this.onMouseEnterClickableElement.bind(this);
        this.onMouseLeaveClickableElement = this.onMouseLeaveClickableElement.bind(this);

        if(typeof elements !== 'array') {
            elements = [elements];
        }

        this.clickableElements.push(elements);
        this.clickableElements = flatten(this.clickableElements);
        this.clickableElements.forEach(element => element.addEventListener('mouseenter', this.onMouseEnterClickableElement));
        this.clickableElements.forEach(element => element.addEventListener('mouseleave', this.onMouseLeaveClickableElement));
    }

    destroyEvents() {
        this.clickableElements.forEach(element => element.removeEventListener('mouseenter', this.onMouseEnterClickableElement));
        this.clickableElements.forEach(element => element.removeEventListener('mouseleave', this.onMouseLeaveClickableElement));
        this.onMouseLeaveClickableElement();
        this.clickableElements = [];
    }

    run() {
        this.move();
        window.requestAnimationFrame(this.run.bind(this));
    }

    getDirection() {
        return Math.atan2(this.y - this.lastPosition.y, this.x - this.lastPosition.x);
    }

    getDirectionDegrees() {
        return this.getDirection() * 180 / Math.PI;
    }

    calculateRotate() {
        const currentRotate = this.getDirectionDegrees();

        if(currentRotate !== 0) {
            this.rotate = currentRotate;
        }
    }

    calculateScales() {
        const dx = this.lastPosition.x - this.x;
        const dy = this.lastPosition.y - this.y;

        let currentScaleX = Math.cos(dx) - this.vx / 10;
        let currentScaleY = Math.cos(dy) - this.vy / 10;

        this.vcx += (currentScaleX - this.scaleX) * .4;
        this.vcy += (currentScaleY - this.scaleY) * .4;
        this.vcx *= .92;
        this.vcy *= .92;

        const factor = Math.pow(10, 2);
        this.vcx = Math.round(this.vcx * factor) / factor;
        this.vcy = Math.round(this.vcy * factor) / factor;

        if(currentScaleX < 0) {
            currentScaleX = -currentScaleX;
        } else if(currentScaleX < .5) {
            currentScaleX = .5;
        }

        if(currentScaleY < 0) {
            currentScaleY = -currentScaleY;
        } else if(currentScaleY < .5) {
            currentScaleY = .5;
        }

        this.scaleX = currentScaleX;
        this.scaleY = currentScaleY;
    }

    move() {
        const direction = this.getDirection();

        // this.calculateRotate();
        // this.calculateScales();

        // Velocity
        this.vx += (this.x - this.lastPosition.x) * .4 * direction / 180;
        this.vy += (this.y - this.lastPosition.y) * .4 * direction / 180;
        this.vx *= .92;
        this.vy *= .92;


        const factor = Math.pow(10, 2);
        this.vx = Math.round(this.vx * factor) / factor;
        this.vy = Math.round(this.vy * factor) / factor;

        this.animate();

        this.lastPosition.x = this.x;
        this.lastPosition.y = this.y;
    }

    animate() {
        // Position
        this.element.style.top = `${this.y + this.vy}px`;
        this.element.style.left = `${this.x + this.vx}px`;
    }
}