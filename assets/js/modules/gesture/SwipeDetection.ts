import Position2D from "@modules/position/Position2D";

export default class SwipeDetection {
    private downPosition: Position2D;
    private swipeUpCallbacks: Array<Function> = [];
    private swipeDownCallbacks: Array<Function> = [];
    private swipeLeftCallbacks: Array<Function> = [];
    private swipeRightCallbacks: Array<Function> = [];
    private element: HTMLElement | Document;

    constructor(element: HTMLElement | Document) {
        this.element = element;

        this.element.ontouchstart = this.handleTouchStart.bind(this);
        this.element.ontouchmove = this.handleTouchMove.bind(this);
    }

    /**
     * On touch start on element
     * @param event
     */
    private handleTouchStart(event: TouchEvent): void {
        this.downPosition = new Position2D(
            event.touches[0].clientX,
            event.touches[0].clientY
        );
        // this.xDown = event.touches[0].clientX;
        // this.yDown = event.touches[0].clientY;
    }

    /**
     * On touch move on element
     * @param event
     */
    private handleTouchMove(event: TouchEvent): void {
        if (!this.downPosition.x || !this.downPosition.y) {
            return;
        }

        const upPosition = new Position2D(
            event.touches[0].clientX,
            event.touches[0].clientY
        );

        const differencePosition = new Position2D(
            this.downPosition.x - upPosition.x,
            this.downPosition.y - upPosition.y
        );

        // noinspection JSSuspiciousNameCombination
        if (Math.abs(differencePosition.x) > Math.abs(differencePosition.y)) {
            if (differencePosition.x > 0) {
                // Left Swipe
                this.swipeLeftCallbacks.forEach(callback => callback());
            } else {
                // Right Swipe
                this.swipeRightCallbacks.forEach(callback => callback());
            }
        } else {
            if (differencePosition.y > 0) {
                // Up Swipe
                this.swipeUpCallbacks.forEach(callback => callback());
            } else {
                // Down Swipe
                this.swipeDownCallbacks.forEach(callback => callback());
            }
        }

        /* reset values */
        this.downPosition = new Position2D(
            0,
            0
        );
    }

    /**
     * Add function executed when swipe up
     * @param callback
     */
    public onSwipeUp(callback: Function): SwipeDetection {
        this.swipeUpCallbacks.push(callback);

        return this;
    }

    /**
     * Add function executed when swipe down
     * @param callback
     */
    public onSwipeDown(callback: Function): SwipeDetection {
        this.swipeDownCallbacks.push(callback);

        return this;
    }

    /**
     * Add function executed when swipe left
     * @param callback
     */
    public onSwipeLeft(callback: Function): SwipeDetection {
        this.swipeLeftCallbacks.push(callback);

        return this;
    }

    /**
     * Add function executed when swipe right
     * @param callback
     */
    public onSwipeRight(callback: Function): SwipeDetection {
        this.swipeRightCallbacks.push(callback);

        return this;
    }

    /**
     * Destroy all events listeners
     */
    public destroyEvents(): void {
        this.element.ontouchstart = null;
        this.element.ontouchmove = null;
    }
}