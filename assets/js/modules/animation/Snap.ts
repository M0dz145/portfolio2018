import Position2D from "@modules/position/Position2D";

export default class Snap {
    private readonly elements: Array<HTMLElement> = [];
    private readonly elementsPositions: Array<Position2D> = [];
    private mousePosition: Position2D = new Position2D(
        window.innerWidth / 2,
        window.innerHeight / 2
    );
    private radiusSnap: number = 20;
    private readonly transitionOnCancelSnap: string = `transform .4s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
    private readonly transitionOnSnap: string = `transform .1s ease-out`;

    constructor(elements: Array<HTMLElement> | HTMLElement) {
        if (elements instanceof HTMLElement) {
            elements = [elements];
        }
        this.elements = elements;

        this.elements.forEach((element, index) => {
            // Calculate snap element position
            this.elementsPositions[index] = new Position2D(
                element.offsetLeft + (element.offsetWidth / 2),
                element.offsetTop + (element.offsetHeight / 2)
            );
        });

        document.addEventListener('mousemove', this.onMouseMove.bind(this));

        this.run();
    }

    private onMouseMove(event: MouseEvent): void {
        // Get mouse position
        this.mousePosition = new Position2D(event.clientX, event.clientY);
    }

    private run(): void {
        this.move();

        window.requestAnimationFrame(this.run.bind(this));
    }

    private move(): void {
        this.elements.forEach((element, index) => {
            const elementPosition = this.elementsPositions[index];

            // Get distance between mouse and snap element
            const distanceBetweenMouseAndElement = Position2D.getDistanceBetween2Points(elementPosition, this.mousePosition);

            // const elementIsHovered: boolean = (this.mousePosition.x >= element.offsetLeft && this.mousePosition.x <= (element.offsetLeft + element.offsetWidth)) ||
            // (this.mousePosition.y >= element.offsetTop && this.mousePosition.y <= (element.offsetTop + element.offsetHeight));
            //
            // console.log(this.mousePosition.x, element.offsetLeft, element.offsetLeft + element.offsetWidth);
            // console.log(this.mousePosition.y, element.offsetTop, element.offsetTop + element.offsetHeight);

            if (distanceBetweenMouseAndElement > this.radiusSnap) {
                this.cancelSnap(element);
            } else {
                this.snap(element, new Position2D(
                    this.mousePosition.x - elementPosition.x,
                    this.mousePosition.y - elementPosition.y
                ));
            }
        });
    }

    private cancelSnap(element: HTMLElement): void {
        element.style.transform = `translate(0, 0)`;
        element.style.transition = this.transitionOnCancelSnap;
    }

    private snap(element: HTMLElement, position: Position2D): void {
        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
        element.style.transition = this.transitionOnSnap;
    }

    public destroy(): void {
        document.removeEventListener('mousemove', this.onMouseMove);
    }
}