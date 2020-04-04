import React from "react";
import axios from "axios";
import { Header, Icon, Button } from "semantic-ui-react";
import EntryItem from './EntryItem';
import AddEntryModel from './AddEntryModal'
import { EntryFormValues } from "./AddEntryModal/AddEntryForm";
import { Patient, HealthCheckEntry } from "./types";
import { apiBaseUrl } from "./constants";
import { useStateValue, updatePatient } from "./state";
import { useParams } from 'react-router-dom'

const PatientInfo: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [error, setError] = React.useState<string | undefined>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    let patient = patients[id];
    const fetchPatient = async () => {
        try {
            const { data: updatedPatient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`);
            dispatch(updatePatient(updatedPatient));
            patient = updatedPatient;
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };
    

    React.useEffect(() => {
        if(typeof patient == 'undefined' || typeof patient.ssn == 'undefined') fetchPatient();

    }, [dispatch]);



    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(updatePatient(newPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    if(typeof patient == 'undefined' || typeof patient.ssn == 'undefined') return <Header as="h3">Error in retrieving patient data</Header>;
    else {
        let icon: 'mars' | 'venus' | 'genderless';
        switch(patient.gender){
            case 'male':
                icon = 'mars';
                break;
            case 'female':
                icon = 'venus';
                break;
            default:
                icon = 'genderless';
                break;

        }

        return (
            <div>
                <Header as="h2">{patient.name} <Icon name={icon}/></Header>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <Header as="h3">Entries</Header>
                {patient.entries?.map(entry => <EntryItem key={entry.id} entry={entry}/>)}
                <AddEntryModel
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </div>
            
        );
    }

}

export default PatientInfo;