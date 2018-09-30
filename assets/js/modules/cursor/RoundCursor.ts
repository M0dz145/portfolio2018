import ClickableElement from "../link/ClickableElement";
import Position2D from "@modules/position/Position2D";

export default class RoundCursor {
    private cursorElement: Element;
    private cursorPath: Element;
    private cursorPosition: Position2D = new Position2D(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
    private currentCursorPosition: Position2D = new Position2D(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
    private animationSpeed: number = 3;
    private hovered: boolean = false;
    private hide: boolean = false;
    private readonly hoveredClass = 'hover';
    private readonly hideClass = 'hide';

    constructor(cursorElement?: Element) {
        this.cursorElement = cursorElement;
        this.cursorPath = this.getCursorPath();

        document.addEventListener('mousemove', event => {
            this.cursorPosition = new Position2D(
                event.clientX,
                event.clientY
            );

            // @ts-ignore
            // Know if an clickable element was hovered
            const hovered: boolean = !!event.path.find(path => new ClickableElement(path).isClickable());
            if (hovered) {
                this.hoverCursor();
            } else {
                this.unhoverCursor();
            }
        });

        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mouseleave', this.hideCursor.bind(this));
        document.addEventListener('mouseenter', this.showCursor.bind(this));

        this.run();
    }

    private run(): void {
        this.move();

        window.requestAnimationFrame(this.run.bind(this));
    }

    private move(): void {
        let angle: number,
            scale: number,
            tailPos: number;

        if (this.hovered) {
            angle = 0;
            scale = 1;
            tailPos = 50;
        } else {
            const speed = this.getSpeed();
            angle = this.getAngle();
            scale = speed / 500 + 1;
            tailPos = speed / 2 + 50;

            if (tailPos < 0) {
                tailPos = 0;
            } else if (tailPos > 40) {
                tailPos = 50;
            }

            if (scale < .2) {
                scale = .2;
            }
        }

        this.currentCursorPosition = new Position2D(
            this.currentCursorPosition.x + ((this.cursorPosition.x - this.currentCursorPosition.x) / this.animationSpeed),
            this.currentCursorPosition.y + ((this.cursorPosition.y - this.currentCursorPosition.y) / this.animationSpeed)
        );

        // @ts-ignore
        this.cursorElement.style.transform = `
            translate(${this.currentCursorPosition.x}px, ${this.currentCursorPosition.y}px)
            rotate(${angle}deg)
            scaleX(${scale})
        `;
        this.cursorPath.setAttribute('d', `M75,100 C88.8071187,100 100,88.8071187 100,75 C100,61.1928813 88.8071187,50 75,50 C61.1928813,50 50,61.1928813 ${tailPos},75 C50,88.8071187 61.1928813,100 75,100 Z`);
    }

    private onMouseDown(): void {
        this.cursorElement.classList.add('click');
    }

    private onMouseUp(): void {
        this.cursorElement.classList.remove('click');
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

    private getAngle(): number {
        if (this.hovered) {
            return 0;
        }

        const cursorElementClientRect = this.cursorElement.getBoundingClientRect();
        const boxCenter = new Position2D(
            cursorElementClientRect.left + cursorElementClientRect.width / 2,
            cursorElementClientRect.top + cursorElementClientRect.height / 2
        );

        return Math.atan2(this.cursorPosition.x - boxCenter.x, -(this.cursorPosition.y - boxCenter.y)) * (180 / Math.PI);
    }

    private getSpeed(): number {
        let speedX = Math.abs(this.cursorPosition.x - this.currentCursorPosition.x),
            speedY = Math.abs(this.cursorPosition.y - this.currentCursorPosition.y),
            speed = Math.sqrt(speedX * speedX + speedY * speedY) * -1;

        if (speed > -1) {
            return 0;
        }

        return speed;
    }
}