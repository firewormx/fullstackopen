import { useState, SyntheticEvent, useContext} from "react";
import DiagnosesContext from '../../context/Context'
import {  TextField, InputLabel,Grid, Button, SelectChangeEvent, Select,OutlinedInput, MenuItem, Typography} from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Diagnose} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values:EntryWithoutId) => Promise<boolean>;
}

interface HealthCheckRatingOption{
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((value) => typeof value === "number")
.map((v) => ({
  value: v as number,
  label: HealthCheckRating[v as number],
}));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnose["code"]>>([]);
  const [dischargeDate, setDischargeDate] = useState('')
  const [dischargeCriteria, setDischargeCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [sickLeaveStart, setSickLeaveStart] = useState('')
  const [sickLeaveEnd, setSickLeaveEnd] = useState('')
  const [entryOptions, setEntryOptions] = useState('')

  const diagnoses = useContext(DiagnosesContext)

const handleHealthCheckRating = (event:SelectChangeEvent<string>) => {
  event.preventDefault()
  const value = Number(event.target.value)

  const healthCheckRating = Object.values(HealthCheckRating)
  console.log(healthCheckRating);

  if((value && healthCheckRating.includes(value))){
    setHealthCheckRating(value)
  }
  if(value === 0)     setHealthCheckRating(value)
  }

  const handleDiagnosisCodes = (event: SelectChangeEvent<string[]>) => {
  event.preventDefault()

const value = event.target.value
typeof value === 'string' 
? setDiagnosisCodes(value.split(', '))
: setDiagnosisCodes(value)
  }

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    }

switch(entryOptions){
  case 'HealthCheck': onSubmit({
    type:'HealthCheck',
    ...baseEntry,
    healthCheckRating,
  });
  onCancel();
break;
case'Hospital': onSubmit(
  {
    type:'Hospital',
    ...baseEntry,
    discharge: {
      date: dischargeDate,
      criteria: dischargeCriteria,
  }
});
onCancel();
break;
case'OccupationalHealthcare': onSubmit({
  type:'OccupationalHealthcare',
  ...baseEntry,
  employerName,
  sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart,endDate: sickLeaveEnd} : undefined
});
onCancel();
}
  };

  return (
    <div>
            <Typography component="h5" variant="h5">New Entry</Typography>
            <InputLabel style={{ marginTop: 20 }}>Entry Options</InputLabel>
            <Select
                label="Option"
                fullWidth
                value={entryOptions}
                onChange={({ target }) => setEntryOptions(target.value)}
            >
                <MenuItem key="HealthCheck" value="HealthCheck">Health Check</MenuItem>
                <MenuItem key="Hospital" value="Hospital">Hospital</MenuItem>
                <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>

      <form onSubmit={addEntry}>
      <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

       <InputLabel style={{ marginTop: 20 }}>DiagnosisCodes</InputLabel>
       <Select
                    label="Diagnosis codes"
                    multiple
                    fullWidth
                    value={diagnosisCodes}
                    onChange={handleDiagnosisCodes}
                    input={<OutlinedInput label="Multiple Select" />}
                >
                {diagnoses.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                    {d.code}
                </MenuItem>
                ))}
                </Select> 

             {entryOptions === 'HealthCheck' && (
              <>
              <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
        <Select
                            label="HealthCheckRating"
                            fullWidth
                            value={healthCheckRating.toString()}
                            onChange={handleHealthCheckRating}
                        >
                        {healthCheckRatingOptions.map(option =>
                            <MenuItem
                            key={option.label}
                            value={option.value}
                            >
                            {option.label}
                            </MenuItem>
                        )}
                        </Select>
                        </>
                      )}
                      {entryOptions === 'OccupationalHealthcare' && (
                        <>
                        <InputLabel  style={{ marginTop: 20 }}>Employer Name</InputLabel>
                        <TextField
                        label="EmployerName"
                        value={employerName}
                        fullWidth
                        onChange={({target}) => setEmployerName(target.value)}
                        />
                      
                       <InputLabel style={{ marginTop: 20 }}>Sick Leave: </InputLabel>
                        <InputLabel  style={{ marginTop: 20 }}>Start date</InputLabel>
                        <TextField 
                        type= "date"
                        value ={sickLeaveStart}
                        fullWidth
                        onChange={({target}) => setSickLeaveStart(target.value)}/>
 
                      
                        <InputLabel  style={{ marginTop: 20 }}>End date</InputLabel>
                        <TextField 
                        type="date"
                        value= {sickLeaveEnd}
                        fullWidth
                        onChange = {({target}) => {setSickLeaveEnd(target.value)}}/>
                        </>
                      )}
                    
                      {entryOptions === "Hospital" && (
                        <>
                        <InputLabel style={{ marginTop: 20 }}>discharge date</InputLabel>
                        <TextField 
                        label="dischargeDate"
                        value={dischargeDate}
                        fullWidth
                        onChange = {({target}) => {setDischargeDate(target.value)}}/>

                       <InputLabel style={{ marginTop: 20 }}>discharge criteria</InputLabel>
                        <TextField 
                        label="dischargeCriteria"
                        value={dischargeCriteria}
                        fullWidth
                        onChange = {({target}) => {setDischargeCriteria(target.value)}}/> 
                        </>
                      )}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default AddEntryForm;