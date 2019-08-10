class Grid {
    static origin = { x: 0, y: 0 };
    calcualteDistanceFromOrigin(point: { x: number; y: number }) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor(public scale: number) { }
}

var grid = new Grid(3);
var dd = new Grid(444);