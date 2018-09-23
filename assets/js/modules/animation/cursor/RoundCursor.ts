import ClickableElement from "@modules/link/ClickableElement";

export default class RoundCursor {
    private readonly listenersEvents: Array<string> = ['mouseenter', 'mouseleave'];
    private clickableElements: Element[];
    private cursorElement: Element;
    private cursorPath: Element;
    private x: number = window.innerWidth / 2;
    private y: number = window.innerHeight / 2;
    private currentX: number = window.innerWidth / 2;
    private currentY: number = window.innerHeight / 2;
    private animationSpeed: number = 3;
    private hovered: boolean = false;
    private hide: boolean = false;
    private readonly hoveredClass = 'hover';
    private readonly hideClass = 'hide';

    constructor(cursorElement?: Element) {
        this.cursorElement = cursorElement;
        this.cursorPath = this.getCursorPath();

        document.addEventListener('mousemove', (event: MouseEvent) => {
            this.x = event.clientX;
            this.y = event.clientY;

            // @ts-ignore
            // Know if an clickable element was hovered
            const hovered = !!event.path.find((path: Element) => new ClickableElement(path).isClickable());
            if (hovered) {
                this.hoverCursor();
            } else {
                this.unhoverCursor();
            }
        });

        document.addEventListener('mouseleave', this.hideCursor.bind(this));
        document.addEventListener('mouseenter', this.showCursor.bind(this));

        this.run();
    }

    private hoverCursor(): void {
        if (!this.hovered) {
            this.hovered = true;
            this.cursorElement.classList.add(this.hoveredClass);
        }
    }

    private unhoverCursor(): void {
        if (this.hovered) {
            this.hovered = false;
            this.cursorElement.classList.remove(this.hoveredClass);
        }
    }

    private hideCursor(): void {
        if (!this.hide) {
            this.hide = true;
            this.cursorElement.classList.add(this.hideClass);
        }
    }

    private showCursor(): void {
        if (this.hide) {
            this.hide = false;
            this.cursorElement.classList.remove(this.hideClass);
        }
    }

    private getCursorPath(): Element {
        return this.cursorElement.children[0].children[0];
    }

    private run() {
        this.move();

        window.requestAnimationFrame(this.run.bind(this));
    }

    private getAngle(): number {
        if (this.hovered) {
            return 0;
        }

        const cursorElementClientRect = this.cursorElement.getBoundingClientRect();
        const boxCenter = {
            x: cursorElementClientRect.left + cursorElementClientRect.width / 2,
            y: cursorElementClientRect.top + cursorElementClientRect.height / 2
        };

        return Math.atan2(this.x - boxCenter.x, -(this.y - boxCenter.y)) * (180 / Math.PI);
    }

    private getSpeed(): number {
        let speedX = Math.abs(this.x - this.currentX),
            speedY = Math.abs(this.y - this.currentY),
            speed = Math.sqrt(speedX * speedX + speedY * speedY) * -1;

        if (speed > -1) {
            return 0;
        }

        return speed;
    }

    private move(): void {
        const speed = this.getSpeed();

        let scale = speed / 500 + 1;
        let tailPos = speed / 10 + 50;

        if (tailPos < 0) {
            tailPos = 0;
        } else if (tailPos > 40) {
            tailPos = 50;
        }

        if (scale < .2) {
            scale = .2;
        }

        this.currentX += (this.x - this.currentX) / this.animationSpeed;
        this.currentY += (this.y - this.currentY) / this.animationSpeed;

        let angle = this.getAngle();
        if (this.hovered) {
            angle = 0;
            scale = 1;
            tailPos = 50;
        }

        // @ts-ignore
        this.cursorElement.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${angle}deg) scaleX(${scale})`;
        this.cursorPath.setAttribute('d', `M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813 ${tailPos},75 C50,88.8071187 61.1928813,100 75,100 Z`);
    }
}