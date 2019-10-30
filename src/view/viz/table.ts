import { Viz } from './viz';
import { FilterState } from '../filterstate';

export class Table implements Viz {
    constructor(data: object[], selector: string, filter: FilterState, height: number, width: number) {};
    redraw = (data: object[]) => {};
}