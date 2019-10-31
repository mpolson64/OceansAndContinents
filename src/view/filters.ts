import * as noUiSlider from 'nouislider';
import { Predicates } from './predicates';
import { View2ModelAdapter } from './view2ModelAdapter';
const wNumb = require('wnumb'); // eslint-disable-line

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
        this.registreeFilter = document.getElementById('registreeFilter') as HTMLInputElement;
        this.statusFilter = document.getElementById('statusFilter') as HTMLInputElement;
        this.sexFilter = document.getElementById('sexFilter') as HTMLInputElement;
        this.originFilter = document.getElementById('originFilter') as HTMLInputElement;
        this.occupationFilter = document.getElementById('occupationFilter') as HTMLInputElement;
        this.masterFilter = document.getElementById('masterFilter') as HTMLInputElement;
        this.masterResidenceFilter = document.getElementById('masterResidenceFilter') as HTMLInputElement;
        this.registrationDistrictFilter = document.getElementById('registrationDistrictFilter') as HTMLInputElement;
        this.sourcesFilter = document.getElementById('sourcesFilter') as HTMLInputElement;

        this.ageSlider = document.getElementById('ageSlider') as noUiSlider.Instance;
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
        this.dateSlider = document.getElementById('dateSlider') as noUiSlider.Instance;
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

        /* eslint-disable */
        this.predicates = {
            registree: _x => true,
            status: _x => true,
            sex: _x => true,
            origin: _x => true,
            age: _x => true,
            occupation: _x => true,
            master: _x => true,
            masterResidence: _x => true,
            registrationDate: _x => true,
            registrationDistrict: _x => true,
            sources: _x => true,
        };
        /* eslint-enable */

        this.registreeFilter.onchange = (): void => {
            this.predicates.registree = (record): boolean =>
                this.registreeFilter.value === '' ? true : record.Registree === this.registreeFilter.value;
            adapter.refilter(this.predicates);
        };

        this.statusFilter.onchange = (): void => {
            this.predicates.status = (record): boolean =>
                record.Status.toLowerCase().includes(this.statusFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.sexFilter.onchange = (): void => {
            this.predicates.sex = (record): boolean => record.Sex.toLowerCase() === this.sexFilter.value.toLowerCase();
            adapter.refilter(this.predicates);
        };

        this.originFilter.onchange = (): void => {
            this.predicates.origin = (record): boolean =>
                record.Origin.toLowerCase().includes(this.originFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.occupationFilter.onchange = (): void => {
            this.predicates.occupation = (record): boolean =>
                record.Occupation.toLowerCase().includes(this.occupationFilter.value.toLowerCase());

            adapter.refilter(this.predicates);
        };

        this.masterFilter.onchange = (): void => {
            this.predicates.master = (record): boolean =>
                record.Master.toLowerCase().includes(this.masterFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.masterResidenceFilter.onchange = (): void => {
            this.predicates.masterResidence = (record): boolean =>
                record['Master Residence'].toLowerCase().includes(this.masterResidenceFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.registrationDistrictFilter.onchange = (): void => {
            this.predicates.registrationDistrict = (record): boolean =>
                record['Registration District']
                    .toLowerCase()
                    .includes(this.registrationDistrictFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.sourcesFilter.onchange = (): void => {
            this.predicates.sources = (record): boolean =>
                record.Sources.toLowerCase().includes(this.sourcesFilter.value.toLowerCase());
            adapter.refilter(this.predicates);
        };

        this.ageSlider.noUiSlider.on('change', values => {
            const res = values.map(x => parseFloat(x));
            this.predicates.age = (record): boolean =>
                parseFloat(record.Age) >= res[0] && parseFloat(record.Age) <= res[1];
            adapter.refilter(this.predicates);
        });

        this.dateSlider.noUiSlider.on('change', values => {
            const res = values.map(x => parseFloat(x));

            this.predicates.registrationDate = (record): boolean => {
                const year = record['Registration Date'].substr(0, 4);
                return year >= res[0] && year <= res[1];
            };
            adapter.refilter(this.predicates);
        });
    }

    fillDatalists = (data: object[]): void => {
        console.log('filling datalists');
    };
}
