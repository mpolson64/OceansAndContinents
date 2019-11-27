import * as d3 from 'd3';
import d3Tip from 'd3-tip';

import { histogramNumberic, tooltip } from '../../util';

export class Histogram {
    // this.margin;
    // width;
    // let height;
    // let this.xScale;
    // let this.yScale;
    // let this.xAxis;
    // let this.yAxis;
    // let plotLine;
    // let svg;
    // let line;
    // let dot; // eslint-disable-line no-unused-vars
    constructor(data, element, filter, rawHeight, rawWidth) {
        this.element = element;
        this.filter = filter;

        element.innerHTML = '';
        const hist = histogramNumberic(data, data, 'Registration Date', str => parseInt(str.substr(0, 4), 10));
        console.log(rawWidth);

        this.margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50,
        };

        this.width = rawWidth - this.margin.left - this.margin.right;
        this.height = rawHeight - this.margin.top - this.margin.bottom;

        this.xScale = d3
            .scaleLinear()
            .range([0, this.width])
            .domain(d3.extent(hist, d => d.x))
            .nice();

        this.yScale = d3
            .scaleLinear()
            .range([this.height, 0])
            .domain(d3.extent(hist, d => d.y))
            .nice();

        this.xAxis = d3
            .axisBottom(this.xScale)
            .ticks(12)
            .tickFormat(d3.format('d'));
        this.yAxis = d3.axisLeft(this.yScale).ticks((12 * this.height) / this.width);

        this.plotLine = d3
            .line()
            .curve(d3.curveMonotoneX)
            .x(d => this.xScale(d.x))
            .y(d => this.yScale(d.y));

        this.svg = d3
            .select('#histogramOverTimeChart')
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom);

        this.svg
            .append('g')
            .attr('class', 'x axis ')
            .attr('id', 'axis--x')
            .attr('transform', `translate(${this.margin.left},${this.height + this.margin.top})`)
            .call(this.xAxis);

        this.svg
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .attr('id', 'axis--y')
            .call(this.yAxis);

        this.line = this.svg
            .append('g')
            .append('path')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .datum(hist)
            .attr('d', this.plotLine)
            .style('fill', 'none')
            .style('stroke', '#684c00');

        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-115, 0])
            .html(d => tooltip(d.x, d.y));

        this.svg.call(tip);

        this.dot = this.svg
            .append('g')
            .attr('id', 'scatter')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
            .selectAll('.dot')
            .data(hist)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 6)
            .attr('cx', d => this.xScale(d.x))
            .attr('cy', d => this.yScale(d.y))
            .attr('stroke', 'white')
            .attr('stroke-width', '2px')
            .style('fill', '#684c00')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', d => {
                const dateSlider = document.getElementById('dateSlider');
                dateSlider.noUiSlider.set([d.x, d.x]);
            });

        this.redraw = data => {
            const hist = histogramNumberic(data, data, 'Registration Date', str => parseInt(str.substr(0, 4), 10));

            this.yScale.domain(d3.extent(hist, d => d.y)).nice();
            this.yAxis = d3.axisLeft(this.yScale).ticks((12 * this.height) / this.width);
            this.svg
                .select('.y')
                .transition()
                .duration(750)
                .call(this.yAxis);

            this.line
                .datum(hist)
                .transition()
                .duration(750)
                .attr('d', this.plotLine)
                .style('fill', 'none')
                .style('stroke-width', '2px')
                .style('stroke', '#684c00');

            this.svg
                .selectAll('circle')
                .data(hist)
                .transition()
                .duration(750)
                .attr('cx', d => this.xScale(d.x))
                .attr('cy', d => this.yScale(d.y))
                .style('fill', '#864c00');

            this.svg
                .selectAll('circle')
                .data(hist)
                .enter()
                .append('circle')
                .attr('cx', d => this.xScale(d.x))
                .attr('cy', d => this.yScale(d.y))
                .attr('r', 5);

            this.svg
                .selectAll('circle')
                .data(hist)
                .exit()
                .remove();
        };
    }
}
