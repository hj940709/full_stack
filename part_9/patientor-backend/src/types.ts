export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
} 

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Entry {
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export interface NewPatientEntry {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >