import { Viz } from './viz';
import { Filters } from '../filters';

export class Histogram implements Viz {
    constructor(data: object[], element: HTMLElement, filter: Filters, height: number, width: number) {
        console.log('Constructing histogram');
    }
    redraw = (data: object[]) => {
        console.log('Redrawing histogram');
    };
}
