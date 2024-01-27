'use client';

import { Box, Grid } from '@mui/material';
import PatientSearchArea from '@/components/PatientSearchArea';
import PatientsTable from '@/components/PatientsTable';

interface Props {
  data: any;
}

export default function PatientsList({ data }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PatientSearchArea />
      </Grid>
      <Grid item xs={12}>
        <PatientsTable data={data} />
      </Grid>
    </Grid>
  );
}
