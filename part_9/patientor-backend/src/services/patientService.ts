import patientData from '../../data/patients.json';
import uuid from 'uuid/v4';
import {PatientEntry, NewPatientEntry, PublicPatient} from '../types';

const patients: Array<PatientEntry> = patientData as Array<PatientEntry>;

export const getEntries = (): Array<PatientEntry> => {
    return patients;
};

export const getEntriesById = (id: string): Array<PatientEntry> => {
    return patients.filter(patient=>patient.id == id);
};

const getNonSensitiveEntries = (): Array<PublicPatient> => {
    return patients;
};

export const getNonSensitiveEntriesById = (id: string): Array<PublicPatient> => {
    return patients.filter(patient=>patient.id == id);
};

const addEntry = (entry: NewPatientEntry ): PatientEntry => {
    const newEntry: PatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newEntry);
    return newEntry;
};


export default {
    getEntries,
    getNonSensitiveEntries,
    getEntriesById,
    getNonSensitiveEntriesById,
    addEntry
};