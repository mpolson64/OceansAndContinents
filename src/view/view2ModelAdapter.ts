import { FilterState } from "./filterstate";

export interface View2ModelAdapter {
    refilter: (filters: FilterState) => void;
    getData: () => object[];
}