import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, Grid, Button } from '@mui/material';

// import { EntryWithoutId } from "../types";
import { HealthCheckEntryWithoutId, HealthCheckRating, Diagnose} from "../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckEntryWithoutId) => void;
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnose['code']>>([]);


  const addEntryForm = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    });
  };

  return (
    <div>
      <form onSubmit={addEntryForm}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialis"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="HealthCheckRating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />

        <TextField
          label="DiagnosisCodes"
          fullWidth
          value={diagnosisCodes}
          onChange={({target}) => setDiagnosisCodes(target.value)}
        >
        </TextField>

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


// const AddNewEntry= () => {
// return (
//     <div>
//         <form>
//           <h3>New HealthCheck Entry</h3>
//             <label htmlFor="description">Description</label>
//             <input type="text" id="description" onChange={(event)=> event.currentTarget.value }/>

//             <label htmlFor="">Date</label>
//             <input type="date" id="date"/>

//             <label htmlFor="specialist">Specialist</label>
//             <input type="text" id="specialist"/>

//             <label htmlFor="healthCheckRating">healthCheckRating</label>
//             <input type="number" id="healthCheckRating"/>

//             <label htmlFor="diagnosisCodes">diagnosisCodes</label>
//             <input type="text" id="diagnosisCodes"/>
//         </form>
//     </div>
// )
// }

// export default AddNewEntry