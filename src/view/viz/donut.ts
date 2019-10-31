import { Viz } from './viz';
import { Filters } from '../filters';

export class Donut implements Viz {
    constructor(
        data: object[],
        element: HTMLElement,
        select: HTMLElement,
        filter: Filters,
        height: number,
        width: number,
    ) {
        console.log('Constructing donut');
    }
    redraw = (data: object[]) => {
        console.log('redrawing donut');
    };
}
