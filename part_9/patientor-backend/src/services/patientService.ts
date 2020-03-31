import patientData from '../../data/patients.json';
import uuid from 'uuid/v4';
import {PatientEntry, NewPatientEntry} from '../types';

const diagnoses: Array<PatientEntry> = patientData as Array<PatientEntry>;

export const getEntries = (): Array<PatientEntry> => {
    return diagnoses;
};

const getNonSensitiveEntries = (): Omit<PatientEntry, 'ssn'>[] => {
    return diagnoses;
};

const addEntry = (entry: NewPatientEntry ): PatientEntry => {
    const newEntry: PatientEntry = {
        id: uuid(),
        ...entry
    };
    diagnoses.push(newEntry);
    return newEntry;
};



export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};