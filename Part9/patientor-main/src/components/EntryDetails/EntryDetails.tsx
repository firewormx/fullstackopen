import { Entry } from "../../types"
import HospitalInfo from "./HospitalInfo";
import HealthCheckInfo from "./HealthCheckInfo";
import OccupationalInfo from "./OccupationalInfo";

// function assertNever(_entry: never) {
//     throw new Error("Function not implemented.");
// }

const EntryDetails = ({entry}: {entry: Entry}): JSX.Element => {
    switch(entry.type){
        case "Hospital":
            return <HospitalInfo entry = {entry} />;
        case "HealthCheck": 
        return <HealthCheckInfo entry={entry}/>;
        case "OccupationalHealthcare": 
        return <OccupationalInfo entry={entry}/>;
        // default: return assertNever(entry);
    }
}
export default EntryDetails

