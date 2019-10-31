import { Viz } from './viz';
import { Filters } from '../filters';

export class Table implements Viz {
    constructor(data: object[], selector: string, filter: Filters, height: number, width: number) {
        console.log('Constructing table');
    }
    redraw = (data: object[]) => {
        console.log('Redrawing table');
    };
}
