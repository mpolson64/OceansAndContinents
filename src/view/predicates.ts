export interface Predicates {
    registree: (record: any) => boolean;
    status: (record: any) => boolean;
    sex: (record: any) => boolean;
    origin: (record: any) => boolean;
    age: (record: any) => boolean;
    occupation: (record: any) => boolean;
    master: (record: any) => boolean;
    masterResidence: (record: any) => boolean;
    registrationDate: (record: any) => boolean;
    registrationDistrict: (record: any) => boolean;
    sources: (record: any) => boolean;
}