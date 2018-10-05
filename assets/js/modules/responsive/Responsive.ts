import {debounce} from "ts-debounce";

class Responsive {
    public readonly maxPhoneWidth = 425;
    private width: number = window.innerWidth;
    private height: number = window.innerHeight;

    constructor() {
        window.addEventListener('resize', debounce(
            this.onWindowResize.bind(this),
            500
        ));
    }

    private onWindowResize(event: Event): void {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    public isPhone(): boolean {
        return this.width <= this.maxPhoneWidth;
    }
}

export default new Responsive();