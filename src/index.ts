import { Model } from "./model/model";
import { View } from "./view/view";
import { FilterState } from "./view/filterstate";

const model = new Model('boc.csv', {
    update: (data: object[]) => {
        view.updateActiveViz(data);
        view.fillDatalists(data);
    },
});
const view = new View({
    getData: () => model.data,
    refilter: (filters: FilterState) => {
        const predicates = [(x: object) => x == {}];
        model.filterData(predicates);
    },
});
