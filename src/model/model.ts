import * as d3 from 'd3';
import { Model2ViewAdapter } from './model2viewadapter';

export class Model {
    adapter: Model2ViewAdapter;
    data: object[];
    filteredData: object[];

    constructor(filename: string, adapter: Model2ViewAdapter) {
        this.adapter = adapter;

        d3.csv(filename).then(rawData => {
            this.data = rawData.slice(0);
            this.filteredData = this.data;

            adapter.updateView(this.filteredData);
        });
    }

    filterData = (predicate: (val: object) => boolean): void => {
        this.filteredData = this.data.filter(item => predicate(item));

        this.adapter.updateView(this.filteredData);
    };
}
