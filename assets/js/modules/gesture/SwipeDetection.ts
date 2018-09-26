export default class SwipeDetection {
    private xDown: number = null;
    private yDown: number = null;
    private swipeUpCallbacks: Array<Function> = [];
    private swipeDownCallbacks: Array<Function> = [];
    private swipeLeftCallbacks: Array<Function> = [];
    private swipeRightCallbacks: Array<Function> = [];

    constructor(element: HTMLElement | Document) {
        element.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        element.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
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
                /* left swipe */
                this.swipeLeftCallbacks.forEach(callback => callback());
            } else {
                /* right swipe */
                this.swipeRightCallbacks.forEach(callback => callback());
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                this.swipeUpCallbacks.forEach(callback => callback());
            } else {
                /* down swipe */
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
}