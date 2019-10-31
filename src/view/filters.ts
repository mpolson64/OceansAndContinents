import * as noUiSlider from 'nouislider';
import {Predicates} from './predicates';
import { View2ModelAdapter } from './view2ModelAdapter';
const wNumb = require("wnumb");

export class Filters {
    registreeFilter: HTMLInputElement;
    statusFilter: HTMLInputElement;
    sexFilter: HTMLInputElement;
    originFilter: HTMLInputElement;
    occupationFilter: HTMLInputElement;
    masterFilter: HTMLInputElement;
    masterResidenceFilter: HTMLInputElement;
    registrationDistrictFilter: HTMLInputElement;
    sourcesFilter: HTMLInputElement;
    ageSlider: noUiSlider.Instance;
    dateSlider: noUiSlider.Instance;
    predicates: Predicates;

    constructor(adapter: View2ModelAdapter) {
        this.registreeFilter = <HTMLInputElement>document.getElementById('registreeFilter');
        this.statusFilter = <HTMLInputElement>document.getElementById('statusFilter');
        this.sexFilter = <HTMLInputElement>document.getElementById('sexFilter');
        this.originFilter = <HTMLInputElement>document.getElementById('originFilter');
        this.occupationFilter = <HTMLInputElement>document.getElementById('occupationFilter');
        this.masterFilter = <HTMLInputElement>document.getElementById('masterFilter');
        this.masterResidenceFilter = <HTMLInputElement>document.getElementById('masterResidenceFilter');
        this.registrationDistrictFilter = <HTMLInputElement>document.getElementById('registrationDistrictFilter');
        this.sourcesFilter = <HTMLInputElement>document.getElementById('sourcesFilter');


        this.ageSlider = document.getElementById('ageSlider') as noUiSlider.Instance
        noUiSlider.create(document.getElementById('ageSlider'), {
            start: [0, 100],
            connect: true,
            range: {
            min: 0,
            max: 100,
            },
            tooltips: true,
            format: wNumb({
            decimals: 0,
            }),
            step: 1,
        });
        this.dateSlider = document.getElementById('dateSlider') as noUiSlider.Instance
        noUiSlider.create(this.dateSlider, {
            start: [0, 100],
            connect: true,
            range: {
            min: 0,
            max: 100,
            },
            tooltips: true,
            format: wNumb({
            decimals: 0,
            }),
            step: 1,
        });

        this.predicates = {
            registree: x => true,
            status: x => true,
            sex: x => true,
            origin: x => true,
            age: x => true,
            occupation: x => true,
            master: x => true,
            masterResidence: x => true,
            registrationDate: x => true,
            registrationDistrict: x => true,
            sources: x => true,
        };

        this.registreeFilter.onchange = () => {
            this.predicates.registree = obj => (this.registreeFilter.value === '' ? true : obj.Registree === this.registreeFilter.value);
            adapter.refilter(this.predicates);
        };

        this.statusFilter.onchange = () => {
        this.predicates.status = obj => obj.Status.toLowerCase().includes(this.statusFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.sexFilter.onchange = () => {
            this.predicates.sex = obj => obj.Sex.toLowerCase() === this.sexFilter.value.toLowerCase();
        adapter.refilter(this.predicates);
        };

        this.originFilter.onchange = () => {
            this.predicates.origin = obj => obj.Origin.toLowerCase().includes(this.originFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.occupationFilter.onchange = () => {
            this.predicates.occupation = obj => obj
              .Occupation
              .toLowerCase()
              .includes(this.occupationFilter.value.toLowerCase());
          
            adapter.refilter(this.predicates);
          };

          this.masterFilter.onchange = () => {
            this.predicates.master = obj => obj.Master.toLowerCase().includes(this.masterFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.masterResidenceFilter.onchange = () => {
            this.predicates.masterResidence = obj => obj['Master Residence'].toLowerCase().includes(this.masterResidenceFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.registrationDistrictFilter.onchange = () => {
            this.predicates.registrationDistrict = obj => obj['Registration District'].toLowerCase().includes(this.registrationDistrictFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.sourcesFilter.onchange = () => {
            this.predicates.sources = obj => obj.Sources.toLowerCase().includes(this.sourcesFilter.value.toLowerCase());
        adapter.refilter(this.predicates);
        };

        this.ageSlider.noUiSlider.on('change', (values) => {
            const res = values.map(x => parseFloat(x));
            this.predicates.age = obj => parseFloat(obj.Age) >= res[0] && parseFloat(obj.Age) <= res[1];
            adapter.refilter(this.predicates);
        });
        
        this.dateSlider.noUiSlider.on('change', (values) => {
        const res = values.map(x => parseFloat(x));
    
        this.predicates.registrationDate = (obj) => {
            const year = obj['Registration Date'].substr(0, 4);
            return year >= res[0] && year <= res[1];
        };
        adapter.refilter(this.predicates);
    });
    }
}