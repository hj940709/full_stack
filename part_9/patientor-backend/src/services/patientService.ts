import patientData from '../../data/patients';
import uuid from 'uuid/v4';
import {PatientEntry, NewPatientEntry, PublicPatient, 
    NewEntry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry} from '../types';

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

const addPatientEntry = (entry: NewPatientEntry ): PatientEntry => {
    const newEntry: PatientEntry = {
        id: uuid(),
        ...entry
    };
    patients.push(newEntry);
    return newEntry;
};

const addEntry = (entry: NewEntry, patient_id: string ): PatientEntry|undefined => {
    const id =  uuid();
    const patient = patients.find(x => x.id === patient_id);
    if(patient)
        switch(entry.type){
            case 'HealthCheck':
                const newHealthCheckEntry: HealthCheckEntry = {
                    id,
                    ...entry
                };
                patient.entries.push(newHealthCheckEntry);
                break;
            case 'OccupationalHealthcare':
                const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
                    id,
                    ...entry
                };
                patient.entries.push(newOccupationalHealthcareEntry);
                break;
            case 'Hospital':
                const newHospitalEntry: HospitalEntry = {
                    id,
                    ...entry
                };
                patient.entries.push(newHospitalEntry);
                break;
        }
    
    return patient;
};


export default {
    getEntries,
    getNonSensitiveEntries,
    getEntriesById,
    getNonSensitiveEntriesById,
    addPatientEntry,
    addEntry
};