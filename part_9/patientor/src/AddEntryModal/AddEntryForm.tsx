import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, SelectField, EntryTypeOption, DiagnosisSelection, NumberField  } from "./FormField";
import { EntryType, AllEntry } from "../types";


export type EntryFormValues = Omit<AllEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOption: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Health care" },
  { value: EntryType.Hospital, label: "Hospital" }
];


const EntrySpecificForm: React.FC<{entryType: EntryType}> = ({entryType}) =>{
 switch(entryType){
   case EntryType.HealthCheck:
    return (
      <Field
        label="healthCheckRating"
        name="healthCheckRating"
        component={NumberField}
        min={0}
        max={3}
      />
    );
  case EntryType.OccupationalHealthcare:
    return (
      <div>
        <Field
          label="employerName"
          placeholder="Employer Name"
          name="employerName"
          component={TextField}
        />
        <Field
          label="Start date of sick leave"
          placeholder="Start date of sick leave"
          name="sickLeave.startDate"
          component={TextField}
          
        />
        <Field
          label="End date of sick leave"
          placeholder="End date of sick leave"
          name="sickLeave.endDate"
          component={TextField}
        />
      </div>
    );
  case EntryType.Hospital:
    return (
      <div>
        <Field
          label="Date of discharge"
          placeholder="Date of discharge"
          name="discharge.date"
          component={TextField}
          
        />
        <Field
          label="Discharge criteria"
          placeholder="Discharge criteria"
          name="discharge.criteria"
          component={TextField}
        />
        
      </div>
    );
  default:
    return <div></div>
 }
}


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();


  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        discharge: {
          date: "",
          criteria: ""
        },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue,  setFieldTouched, values}) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SelectField
              label="type"
              name="type"
              options={entryTypeOption}
            />
            <DiagnosisSelection 
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <EntrySpecificForm entryType={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
