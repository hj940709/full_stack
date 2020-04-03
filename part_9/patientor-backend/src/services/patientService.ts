import patientData from '../../data/patients';
import uuid from 'uuid/v4';
import {PatientEntry, NewPatientEntry, PublicPatient} from '../types';

const patients: Array<PatientEntry> = patientData;

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

const getEntriesById = (id: string): PatientEntry|undefined => {
    return patients.find(patient=>patient.id == id);
};

const getNonSensitiveEntries = ():  Array<PublicPatient> => {
    return patients.map(({id,name, dateOfBirth, gender, occupation})=> ({id, name, dateOfBirth, gender, occupation}));
};

const getNonSensitiveEntriesById = (id: string):  PublicPatient|undefined => {
    return patients.map(({id,name, dateOfBirth, gender, occupation})=> ({id, name, dateOfBirth, gender, occupation})).find(patient=>patient.id == id);
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