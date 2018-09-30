import ScrollBooster, {scrollBoosterUpdate} from "scrollbooster";
import MobileDetect from "@modules/responsive/MobileDetect";
import Position2D from "@modules/position/Position2D";

export default class HorizontalDraggable {
    private scrollBooster: ScrollBooster;
    private userCallbacks: Array<Function> = [];
    private isPaused: boolean = false;
    private readonly contentElement: HTMLElement;
    private readonly maxScrollForce: number = 80;

    constructor(viewport: Element, contentElement: HTMLElement) {
        this.contentElement = contentElement;

        if (MobileDetect.phone()) {
            this.setHeightOfContentElement();
        } else {
            this.setWidthOfContentElement();
        }

        this.scrollBooster = new ScrollBooster({
            viewport,
            content: this.contentElement,
            emulateScroll: false,
            onUpdate: (data: scrollBoosterUpdate) => {
                if (!this.isPaused) {
                    if (MobileDetect.phone()) {
                        this.contentElement.style.transform = `translateY(${-data.position.y}px)`;
                    } else {
                        this.contentElement.style.transform = `translateX(${-data.position.x}px)`;
                    }

                    this.userCallbacks.forEach(callback => callback(data));
                }
            }
        });

        this.contentElement.addEventListener('mousewheel', this.onMouseWheel.bind(this));
    }

    /**
     * When mouse wheel
     * @param event
     */
    private onMouseWheel(event: WheelEvent): void {
        let scrollAmount: number;
        if (event.deltaY !== -0) {
            scrollAmount = event.deltaY;
        } else {
            scrollAmount = event.deltaX;
        }

        if (scrollAmount > this.maxScrollForce) {
            scrollAmount = this.maxScrollForce;
        } else if (scrollAmount < -this.maxScrollForce) {
            scrollAmount = -this.maxScrollForce;
        }

        let position: Position2D;
        if (MobileDetect.phone()) {
            position = new Position2D(0, this.scrollBooster.getUpdate().position.y + scrollAmount);
        } else {
            position = new Position2D(this.scrollBooster.getUpdate().position.x + scrollAmount, 0);
        }

        this.scrollBooster.setPosition(position);
    }

    /**
     * Set width of absolute element
     */
    private setWidthOfContentElement(): void {
        const lastChildrenOfContentElement = this.contentElement.children[this.contentElement.children.length - 1] as HTMLElement;
        this.contentElement.style.width = `${lastChildrenOfContentElement.offsetLeft + window.innerWidth / 4}px`;
    }

    /**
     * Set height of absolute element
     */
    private setHeightOfContentElement(): void {
        const lastChildrenOfContentElement = this.contentElement.children[this.contentElement.children.length - 1] as HTMLElement;
        this.contentElement.style.height = `${lastChildrenOfContentElement.offsetTop + window.innerHeight / 2}px`;
    }

    /**
     * Disabled the draggable system
     */
    public pause(): void {
        this.isPaused = true;
    }

    /**
     * Continue the draggable system
     */
    public resume(): void {
        this.isPaused = false;
    }

    /**
     * Get update scroll booster object
     */
    public getUpdate(): scrollBoosterUpdate {
        return this.scrollBooster.getUpdate();
    }

    /**
     * On draggable update
     * @param callback
     */
    public onUpdate(callback: Function): void {
        this.userCallbacks.push(callback);
    }

    /**
     * Scroll to start
     */
    public goToStart(): void {
        this.scrollBooster.setPosition(new Position2D(0, 0));
    }

    /**
     * Destroy all events listeners
     */
    public destroy(): void {
        this.scrollBooster.destroy();
    }
}