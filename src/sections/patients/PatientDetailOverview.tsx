'use client';

import { Grid } from '@mui/material';
import { OverviewBox } from '../overview/OverviewBox';

interface Props {
  data: any;
}

export default function PatientDetailOverview({ data }: Props) {
  const {
    averageBloodPressure,
    averageHearthRate,
    averageOxygenRate,
    workout,
  } = data ?? {};

  const { systolic, diastolic } = averageBloodPressure ?? {};

  return (
    <>
      <Grid item xs={12} sm={6} lg={3}>
        <OverviewBox
          sx={{ height: '100%' }}
          title="Average Oxygen Rate"
          value={averageOxygenRate ?? '-'}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <OverviewBox
          sx={{ height: '100%' }}
          title="Average Tension Rate"
          value={systolic ? `${systolic}/${diastolic} mmHg` : '-'}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <OverviewBox
          sx={{ height: '100%' }}
          title="Average Heart Rate"
          value={averageHearthRate ?? '-'}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <OverviewBox
          sx={{ height: '100%' }}
          title="Workout"
          value={workout ?? '-'}
        />
      </Grid>
    </>
  );
}
