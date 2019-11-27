import { Viz } from './viz';
import { Filters } from '../filters';
import * as d3 from 'd3';

export class Donut {
    constructor(
        data: object[],
        element: HTMLElement,
        select: HTMLElement,
        filter: Filters,
        height: number,
        width: number,
    ) {
        // console.log('Constructing donut');
        // // this.select = select;
        
        // const radius = Math.min(width, height) / 2;

        // const svg = d3
        //     .select('#donutChart')
        //     .append('svg')
        //     .attr('height', height)
        //     .attr('width', width)
        //     .append('g');

        // svg.append('g').attr('class', 'slices');
        // svg.append('g').attr('class', 'labels');
        // svg.append('g').attr('class', 'lines');

        // // @ts-ignore
        // this.pie = d3.pie().value(d => d.value);

        // this.arc = d3
        //     .arc()
        //     .outerRadius(radius * 1.0)
        //     .innerRadius(radius * 0.4);

        // svg.attr('transform', `translate(${width / 2}, ${height / 2})`);

        // this.redraw(data);
    }
    redraw = (data: object[]) => {
        console.log('redrawing donut');
    };
}
