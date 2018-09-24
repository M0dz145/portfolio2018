import ScrollBooster, {scrollBoosterUpdate} from "scrollbooster";

export default class HorizontalDraggable {
    private scrollBooster: ScrollBooster;
    private userCallbacks: Array<Function> = [];
    private isPaused: boolean = false;
    private readonly contentElement: HTMLElement;

    constructor(viewport: Element, contentElement: HTMLElement) {
        this.contentElement = contentElement;
        this.setWidthOfContentElement();

        this.scrollBooster = new ScrollBooster({
            viewport,
            content: this.contentElement,
            emulateScroll: false,
            onUpdate: (data: scrollBoosterUpdate) => {
                if (!this.isPaused) {
                    this.contentElement.style.transform = `translateX(${-data.position.x}px)`;
                    this.userCallbacks.forEach(callback => callback(data));
                }
            }
        });

        this.contentElement.addEventListener('mousewheel', event => {
            const finalPositionX = this.scrollBooster.getUpdate().position.x + event.deltaY;

            this.scrollBooster.setPosition({
                x: finalPositionX,
                y: 0
            });
        });
    }

    private setWidthOfContentElement(): void {
        const lastChildrenOfContentElement = this.contentElement.children[this.contentElement.children.length - 1] as HTMLElement;
        this.contentElement.style.width = `${lastChildrenOfContentElement.offsetLeft + window.innerWidth / 4}px`;
    }

    public pause(): void {
        this.isPaused = true;
    }

    public resume(): void {
        this.isPaused = false;
    }

    public getUpdate(): scrollBoosterUpdate {
        return this.scrollBooster.getUpdate();
    }

    public onUpdate(callback: Function): void {
        this.userCallbacks.push(callback);
    }

    public goToStart(): void {
        this.scrollBooster.setPosition({
            x: 0,
            y: 0
        });
    }

    public destroy(): void {
        this.scrollBooster.destroy();
    }
}