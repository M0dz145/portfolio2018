export default class SwipeDetection {
    private xDown: number = null;
    private yDown: number = null;
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

    private handleTouchStart(event: TouchEvent): void {
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    }

    private handleTouchMove(event: TouchEvent): void {
        if (!this.xDown || !this.yDown) {
            return;
        }

        const xUp = event.touches[0].clientX,
            yUp = event.touches[0].clientY,
            xDiff = this.xDown - xUp,
            yDiff = this.yDown - yUp;

        // noinspection JSSuspiciousNameCombination
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                // Left Swipe
                this.swipeLeftCallbacks.forEach(callback => callback());
            } else {
                // Right Swipe
                this.swipeRightCallbacks.forEach(callback => callback());
            }
        } else {
            if (yDiff > 0) {
                // Up Swipe
                this.swipeUpCallbacks.forEach(callback => callback());
            } else {
                // Down Swipe
                this.swipeDownCallbacks.forEach(callback => callback());
            }
        }

        /* reset values */
        this.xDown = null;
        this.yDown = null;
    }

    public onSwipeUp(callback: Function): SwipeDetection {
        this.swipeUpCallbacks.push(callback);

        return this;
    }

    public onSwipeDown(callback: Function): SwipeDetection {
        this.swipeDownCallbacks.push(callback);

        return this;
    }

    public onSwipeLeft(callback: Function): SwipeDetection {
        this.swipeLeftCallbacks.push(callback);

        return this;
    }

    public onSwipeRight(callback: Function): SwipeDetection {
        this.swipeRightCallbacks.push(callback);

        return this;
    }

    public destroyEvents(): void {
        this.element.ontouchstart = null;
        this.element.ontouchmove = null;
    }
}