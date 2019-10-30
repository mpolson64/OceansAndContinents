import * as d3 from 'd3';
import { Model2ViewAdapter } from './model2viewadapter';

export class Model {
    adapter: Model2ViewAdapter;
    data: object[];
    filteredData: object[];

    constructor(filename: string, adapter: Model2ViewAdapter) {
        this.adapter = adapter;

        d3.csv(filename).then((rawData: any) => {
            this.data = rawData.slice(0);
            this.filteredData = this.data;

            adapter.update(this.filteredData);
        });
    }

    filterData = (predicates: ((val: object) => boolean)[]) => {
        const composed = predicates.reduce((composed, predicate) => item => composed(item) && predicate(item));
        this.filteredData = this.data.filter(item => composed(item));

        this.adapter.update(this.filteredData);
    }
}