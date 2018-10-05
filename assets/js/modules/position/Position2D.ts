export default class Position2D {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Get distance between 2 given points
     * @param point1
     * @param point2
     */
    public static getDistanceBetween2Points(point1: Position2D, point2: Position2D): number {
        const a = point1.x - point2.x,
            b = point1.y - point2.y;

        return Math.sqrt(a * a + b * b);
    }
}