import { Viz } from './viz';
import { Filters } from '../filters';

export class Map implements Viz {
    constructor(data: object[], element: HTMLElement, select: HTMLElement, filter: Filters, height: number, width: number) {
        console.log("Constructing map");
    };
    redraw = (data: object[]) => {
        console.log("Redrawing map");
    };
}