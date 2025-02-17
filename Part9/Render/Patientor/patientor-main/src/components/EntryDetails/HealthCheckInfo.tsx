import { HealthCheckEntry, HealthCheckRating } from '../../types';
import { Typography } from '@mui/material';
import { MedicalServices } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckInfo = ({entry} : {entry: HealthCheckEntry} ) => {
  return(
    <div className='healthcheck entry'>
      <Typography variant='body2'>
        { entry.date } <MedicalServices />
      </Typography>

      <Typography variant='body2' m={'10px 0'}>
        <i>{ entry.description }</i>
      </Typography>

      <Typography variant='body2' m={'10px 0'}>
        diagnose by <b>{ entry.specialist }</b>
      </Typography>

      <Rating rating={entry.healthCheckRating} />
      
      <Typography variant='body2' align='right' fontSize={'0.75em'} color={'green'}>
        { entry.type }
      </Typography>
    </div>
  );
};

const Rating = ({ rating }: { rating: HealthCheckRating }) => {
  const ratingColors = {
    healthy: ['green', 'green', 'green', 'green'],
    lowRisk: ['orange', 'orange', 'orange', 'lightgray'],
    highRisk: ['gold', 'gold', 'lightgray', 'lightgray'],
    criticalRisk: ['red', 'lightgray', 'lightgray', 'lightgray']
  };

  switch (rating) {
    case HealthCheckRating.Healthy:
      return <RatingRow colorArray={ratingColors.healthy} />;
    case HealthCheckRating.LowRisk:
      return <RatingRow colorArray={ratingColors.lowRisk} />;
    case HealthCheckRating.HighRisk:
      return <RatingRow colorArray={ratingColors.highRisk} />;
    case HealthCheckRating.CriticalRisk:
      return <RatingRow colorArray={ratingColors.criticalRisk} />;
    default:
      return null;
  }
};

const RatingRow = ({ colorArray }: { colorArray: string[] }) => {
  return(
    <div>
      { colorArray.map((c, i) => <FavoriteIcon key={i} style={{ color: c }} />)}
    </div>
  );
};

export default HealthCheckInfo;