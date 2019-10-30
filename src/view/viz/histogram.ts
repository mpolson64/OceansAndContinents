import { Viz } from './viz';
import { FilterState } from '../filterstate';

export class Histogram implements Viz {
    constructor(data: object[], element: HTMLElement, filter: FilterState, height: number, width: number) {};
    redraw = (data: object[]) => {};
}