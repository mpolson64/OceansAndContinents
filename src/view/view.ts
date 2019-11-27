import { View2ModelAdapter } from './view2ModelAdapter';
import { Viz } from './viz/viz';
import { Filters } from './filters';
import { Donut } from './viz/donut';
import { Histogram } from './viz/histogram';
import { Map } from './viz/map';
import { Table } from './viz/table';

import 'tabulator-tables/dist/css/tabulator.min.css';
import 'nouislider/distribute/nouislider.min.css';

export class View {
    vizualizerHeight = 600;

    adapter: View2ModelAdapter;
    filters: Filters;
    activeViz: Viz;
    donut: Donut;
    histogram: Histogram;
    map: Map;
    table: Table;

    constructor(adapter: View2ModelAdapter) {
        this.adapter = adapter;
    }

    start = () => {
        console.log('starting view!');

        // bind filter/siders & set onchange
        this.filters = new Filters(this.adapter);

        // construct vizs
        const vizDiv = document.getElementById('vizualizers');
        // while (!adapter.getData()) console.log("loading data...");   // wait for data to load
        const data = this.adapter.getData();
        console.log("MILS");
        console.log(data);
        this.donut = new Donut(
            data,
            document.getElementById('donutChart'),
            document.getElementById('dountSelect'),
            this.filters,
            this.vizualizerHeight,
            vizDiv.offsetWidth - 10,
        );
        this.histogram = new Histogram(
            data,
            document.getElementById('histogramOverTimeChart'),
            this.filters,
            this.vizualizerHeight,
            vizDiv.offsetWidth - 10,
        );
        this.map = new Map(
            data,
            document.getElementById('mapChart'),
            document.getElementById('mapSelect'),
            this.filters,
            this.vizualizerHeight,
            vizDiv.offsetWidth - 10,
        );
        this.table = new Table(data, 'tableChart', this.filters, this.vizualizerHeight, vizDiv.offsetWidth - 10);

        this.activeViz = this.map;

        // bind w3bar onclicks
        const vizButtons = [
            document.getElementById('tableButton'),
            document.getElementById('donutButton'),
            document.getElementById('histogramOverTimeButton'),
            document.getElementById('mapButton'),
        ];
        vizButtons.forEach(button => {
            button.onclick = (): void => {
                Array.from(document.getElementsByClassName('viz')).forEach(elem => {
                    (elem as HTMLElement).style.display = 'none';
                });
                Array.from(document.getElementsByClassName('w3-bar-item')).forEach(elem => {
                    elem.className = 'w3-bar-item w3-button w3-light-gray';
                });

                document.getElementById(button.id.substring(0, button.id.length - 6)).style.display = 'block';
                button.className = 'w3-bar-item w3-button w3-dark-gray';

                const activeVizName = button.id.substring(0, button.id.length - 6);
                if (activeVizName == 'table') {
                    this.activeViz = this.table;
                } else if (activeVizName == 'donut') {
                    this.activeViz = this.donut;
                } else if (activeVizName == 'histogramOverTime') {
                    this.activeViz = this.histogram;
                } else if (activeVizName == 'map') {
                    this.activeViz = this.map;
                }

                this.updateActiveViz(data);
            };
        });

        // bind hidefilters
        document.getElementById('toggleFilterButton').onclick = (): void => {
            const filters = document.getElementById('filters');
            const viz = document.getElementById('vizualizers');
            const button = document.getElementById('toggleFilterButton');
        
            if (button.textContent === '>>') {
                filters.style.width = '50%';
                viz.style.width = '50%';
        
                button.textContent = '<<';
        
                // we need to do this halving and doubling because the transition makes the width
                // not take effect instantly
                this.donut = new Donut(
                    data,
                    document.getElementById('donutChart'),
                    document.getElementById('dountSelect'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth / 2 - 10,
                );
                this.histogram = new Histogram(
                    data,
                    document.getElementById('histogramOverTimeChart'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth / 2 - 10,
                );
                this.map = new Map(
                    data,
                    document.getElementById('mapChart'),
                    document.getElementById('mapSelect'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth / 2 - 10,
                );
            } else {
                filters.style.width = '0%';
                viz.style.width = '100%';
        
                button.textContent = '>>';
        
                this.donut = new Donut(
                    data,
                    document.getElementById('donutChart'),
                    document.getElementById('dountSelect'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth * 2 - 10,
                );
                this.histogram = new Histogram(
                    data,
                    document.getElementById('histogramOverTimeChart'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth * 2 - 10,
                );
                this.map = new Map(
                    data,
                    document.getElementById('mapChart'),
                    document.getElementById('mapSelect'),
                    this.filters,
                    this.vizualizerHeight,
                    vizDiv.offsetWidth * 2 - 10,
                );
            }
        };

        // bind downloads
    };

    updateActiveViz = (data: object[]): void => this.activeViz.redraw(data);

    fillDatalists = (data: object[]): void => {
        this.filters.fillDatalists(data);
    };
}
