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
    // By default, the cursor is hidden because we don't know where is it
    private hide: boolean = true;
    private readonly hoveredClass = 'hover';
    private readonly hideClass = 'hide';

    constructor(cursorElement: Element) {
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

        this.animate();
    }

    /**
     * Run cursor animation for each frames
     */
    private animate(): void {
        this.move();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    /**
     * Calculate and move cursor on new position
     */
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

    /**
     * When mouse down
     */
    private onMouseDown(): void {
        this.cursorElement.classList.add('click');
    }

    /**
     * When mouse up
     */
    private onMouseUp(): void {
        this.cursorElement.classList.remove('click');
    }

    /**
     * When cursor hover a hoverable element
     */
    private hoverCursor(): void {
        if (!this.hovered) {
            this.hovered = true;
            this.cursorElement.classList.add(this.hoveredClass);
        }
    }

    /**
     * When cursor unhover a hoverable element
     */
    private unhoverCursor(): void {
        if (this.hovered) {
            this.hovered = false;
            this.cursorElement.classList.remove(this.hoveredClass);
        }
    }

    /**
     * Hide cursor
     */
    private hideCursor(): void {
        if (!this.hide) {
            this.hide = true;
            this.cursorElement.classList.add(this.hideClass);
        }
    }

    /**
     * Show cursor
     */
    private showCursor(): void {
        if (this.hide) {
            this.hide = false;
            this.cursorElement.classList.remove(this.hideClass);
        }
    }

    /**
     * Get the cursor's path (SVG)
     */
    private getCursorPath(): Element {
        return this.cursorElement.children[0].children[0];
    }

    /**
     * Get angle of cursor
     */
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

    /**
     * Get speed of cursor
     */
    private getSpeed(): number {
        const speedX = Math.abs(this.cursorPosition.x - this.currentCursorPosition.x),
            speedY = Math.abs(this.cursorPosition.y - this.currentCursorPosition.y),
            speed = Math.sqrt(speedX * speedX + speedY * speedY) * -1;

        if (speed > -1) {
            return 0;
        }

        return speed;
    }
}