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

        // bind filter/siders & set onchange
        this.filters = new Filters(this.adapter);

        // construct vizs
        const vizDiv = document.getElementById('vizualizers');
        const data = adapter.getData();
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
        // bind hidefilters
        // bind downloads
    }

    updateActiveViz = (data: object[]): void => this.activeViz.redraw(data);
    fillDatalists = (data: object[]): void => {
        this.filters.fillDatalists(data);
    };
}
