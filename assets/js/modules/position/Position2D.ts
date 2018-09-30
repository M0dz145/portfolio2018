export default class Position2D {
    private readonly xPosition: number;
    private readonly yPosition: number;

    constructor(x: number, y: number) {
        this.xPosition = x;
        this.yPosition = y;
    }

    get x(): number {
        return this.xPosition;
    }

    get y(): number {
        return this.yPosition;
    }

    public static getDistanceBetween2Points(point1: Position2D, point2: Position2D): number {
        const a = point1.x - point2.x,
            b = point1.y - point2.y;

        return Math.sqrt(a * a + b * b);
    }
}