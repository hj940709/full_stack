import { NewPatientEntry, Gender, HealthCheckRating, 
    NewEntry, EntryType, DiagnoseEntry } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isDiagnoseEntryCodes = (param: any): param is Array<string> => {
    return typeof param === 'object' && param.every((x: any) => isString(x) );
};
  
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};
 

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    } 
    return gender;
};

const parseEntryType = (entryType: any): EntryType => {
    if (!entryType || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing Entry type: ' + entryType);
    } 
    return entryType;
};

const parseString = (text: any): string => {
    if (!text || !isString(text)) {
      throw new Error('Incorrect or missing comment: ' + text);
    }
    return text;
};

const parseDiagnosisCodes = (codes: any): Array<DiagnoseEntry['code']> => {
    if(!codes)
        return [];
    else if(isDiagnoseEntryCodes(codes))
        return codes
    else throw new Error('Incorrect diagnoses entry codes: ' + codes);

}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const assertNever = (value: any): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [],
  };
};

export const toNewEntry = (object: any): NewEntry => {
    const temp: any = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        type: parseEntryType(object.type)
    }
    if(object.diagnosisCodes) 
        temp .diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    switch(temp.type){
        case 'HealthCheck':
            temp.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
            return temp;
        case 'OccupationalHealthcare':
            temp.employerName = parseString(object.employerName);
            if(object.sickLeave){
                temp.sickLeave = {
                    startDate: parseDate(object.sickLeave.startDate),
                    endDate: parseDate(object.sickLeave.endDate),
                }
            }
            return temp;
        case 'Hospital':
            if(object.discharge){
                temp.discharge = {
                    startDate: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria),
                }
            }
            return temp;
        default: 
            return assertNever(temp);
    }
  };