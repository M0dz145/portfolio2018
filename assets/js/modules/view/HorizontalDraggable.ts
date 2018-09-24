import ScrollBooster, {scrollBoosterUpdate} from "scrollbooster";

export default class HorizontalDraggable {
    private scrollBooster: ScrollBooster;
    private userCallbacks: Array<Function> = [];

    constructor(viewport: Element, contentElement: HTMLElement) {
        const lastChildrenOfContentElement = contentElement.children[contentElement.children.length - 1] as HTMLElement;
        contentElement.style.width = `${lastChildrenOfContentElement.offsetLeft + window.innerWidth / 4}px`;

        this.scrollBooster = new ScrollBooster({
            viewport,
            content: contentElement,
            emulateScroll: true,
            onUpdate: (data: scrollBoosterUpdate) => {
                contentElement.style.transform = `translateX(${-data.position.x}px)`;

                this.userCallbacks.forEach(callback => callback(data));
            }
        });
    }

    public getUpdate(): scrollBoosterUpdate {
        return this.scrollBooster.getUpdate();
    }

    public onUpdate(callback: Function): void {
        this.userCallbacks.push(callback);
    }

    public goToStart():void {
        this.scrollBooster.setPosition({
            x: 0,
            y: 0
        });
    }
}