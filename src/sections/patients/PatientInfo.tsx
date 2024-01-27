'use client';

import { Grid, Typography } from '@mui/material';
import { Props } from './PatientDetail';
import { formatBirthDate } from '@/utils';

export default function PatientInfo({ data }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          Patient Information
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          component="span"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          color="text.primary"
        >
          Full Name:
        </Typography>
        <Typography component="span" color="text.secondary">
          {data.firstName} {data.lastName}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          component="span"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          color="text.primary"
        >
          Gender:
        </Typography>
        <Typography component="span" color="text.secondary">
          {data.gender}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          component="span"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          color="text.primary"
        >
          BirthDate:
        </Typography>
        <Typography component="span" color="text.secondary">
          {formatBirthDate(data.birthDate)}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          component="span"
          sx={{ marginRight: (theme) => theme.spacing(1) }}
          color="text.primary"
        >
          Age:
        </Typography>
        <Typography component="span" color="text.secondary">
          {data.age}
        </Typography>
      </Grid>
    </Grid>
  );
}
