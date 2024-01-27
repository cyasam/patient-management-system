'use client';

import { Grid, Paper } from '@mui/material';
import PatientDetailOverview from '@/sections/patients/PatientDetailOverview';
import PatientInfo from './PatientInfo';
import { UpcomingAppointments } from '../overview/UpcomingAppointments';
import UploadArea from './UploadArea';

export interface Props {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    age: string;
    medicalDatas: any;
  };
  appointmentsData?: any;
}

export default function PatientDetail({ data, appointmentsData }: Props) {
  return (
    <Grid container spacing={3}>
      <PatientDetailOverview data={data.medicalDatas} />

      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={6}>
            <Paper
              sx={{
                padding: (theme) => theme.spacing(2),
              }}
            >
              <PatientInfo data={data} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <UpcomingAppointments
              appointments={appointmentsData}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <UploadArea patientId={data.id} />
      </Grid>
    </Grid>
  );
}
