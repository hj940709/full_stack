import React from "react";
import { MessageHeader, Icon, Message, MessageContent } from "semantic-ui-react";
import { Diagnosis, Entry } from "./types";
import { useStateValue } from "./state";

type Color = "red" | "orange" | "yellow" | "green";

const EntryItem: React.FC<{entry: Entry}> = ({entry}) => {
    const [{ diagnoses, patients }, dispatch] = useStateValue();
    const [diagnosesInfo, setDiagnosesInfo] = React.useState<Diagnosis[]>([]);
    const diagnosisCodes = entry.diagnosisCodes;

    React.useEffect(() => {
        if(Object.keys(diagnoses).length !== 0 && typeof diagnosisCodes != 'undefined'){
            setDiagnosesInfo(diagnosisCodes.map(code=>diagnoses[code]));
        }
        
    }, [dispatch, diagnoses, patients]);

    const assertNever = (value: any): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch(entry.type){
        case 'HealthCheck':
            const healthColor: Color[] = ["red", "orange", "yellow", "green" ];
            return (
                <Message className="icon">
                    <Icon name='info' />
                    <MessageContent>
                        <MessageHeader as='h4'>{entry.description}</MessageHeader>
                        <p>{entry.date} <Icon name='heart' color={healthColor[entry.healthCheckRating]}/> </p>
                        <ul>
                            {diagnosesInfo.map(diagnosis=><li key={diagnosis.code}> {diagnosis.code} {diagnosis.name}</li>)}
                        </ul>
                    </MessageContent>
                </Message>
            );
        case 'Hospital':
            return (
                <Message className="icon">
                    <Icon name='doctor' />
                    <MessageContent>
                        <MessageHeader as='h4'>{entry.description}</MessageHeader>
                        <p>{entry.date}</p>
                        <ul>
                            {diagnosesInfo.map(diagnosis=><li key={diagnosis.code}> {diagnosis.code} {diagnosis.name}</li>)}
                        </ul>
                    </MessageContent>
                </Message>
            );
        case 'OccupationalHealthcare':
            return (
                <Message className="icon">
                    <Icon name='cog' />
                    <MessageContent>
                        <MessageHeader as='h4'>{entry.description}</MessageHeader>
                        <p>{entry.date} <strong>{entry.employerName}</strong></p>
                        <ul>
                            {diagnosesInfo.map(diagnosis=><li key={diagnosis.code}> {diagnosis.code} {diagnosis.name}</li>)}
                        </ul>
                    </MessageContent>
                </Message>
            );
        default:
            return assertNever(entry);
    }

};

export default EntryItem;