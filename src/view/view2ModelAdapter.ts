import { Predicates } from "./predicates";

export interface View2ModelAdapter {
    refilter: (predicates: Predicates) => void;
    getData: () => object[];
}