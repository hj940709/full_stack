import diagnoseData from '../../data/diagnoses.json';

import {DiagnoseEntry} from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

export const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

export const getEntriesByCode = (code: string): DiagnoseEntry | undefined => {
    return diagnoses.find(x=>x.code===code);
};

const addEntry = () => {
    return null;
};
  
export default {
    getEntries,
    getEntriesByCode,
    addEntry
};