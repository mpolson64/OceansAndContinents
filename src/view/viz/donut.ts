import { Viz } from './viz';
import { FilterState } from '../filterstate';

export class Donut implements Viz {
    constructor(data: object[], element: HTMLElement, select: HTMLElement, filter: FilterState, height: number, width: number) {};
    redraw = (data: object[]) => {};
}