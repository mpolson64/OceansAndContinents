import { Model } from './model/model';
import { View } from './view/view';
import { Predicates } from './view/predicates';

const model = new Model('boc.csv', {
    updateView: (data: object[]) => {
        view.updateActiveViz(data);
        view.fillDatalists(data);
    },
});
const view = new View({
    getData: () => model.data,
    refilter: (predicates: Predicates) => {
        const composed = (<((record: any) => boolean)[]>Object.values(predicates)).reduce(
            (composed, predicate) => item => composed(item) && predicate(item),
        );
        model.filterData(composed);
    },
});
