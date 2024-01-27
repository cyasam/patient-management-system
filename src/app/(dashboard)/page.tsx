import { Metadata } from 'next';
import { Box, Container, Grid } from '@mui/material';
import { OverviewBox } from '@/sections/overview/OverviewBox';
import { UpcomingAppointments } from '@/sections/overview/UpcomingAppointments';
import { mainPageTitle } from '@/utils';
import { fetchPatientAppointments } from '@/utils/patients/fetch';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: `Overview - ${mainPageTitle}`,
  description: mainPageTitle,
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const user = JSON.parse(cookieStore.get('user')?.value as any);
  const appointmentsData = await fetchPatientAppointments(user.uid);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewBox
              sx={{ height: '100%' }}
              title="Total Patient"
              value="30"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewBox
              sx={{ height: '100%' }}
              title="Total Appointment"
              value="58"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewBox
              sx={{ height: '100%' }}
              title="Treatments"
              value="276"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewBox
              sx={{ height: '100%' }}
              title="Total Income"
              value="$2169"
            />
          </Grid>
          <Grid item xs={12}>
            <UpcomingAppointments
              appointments={appointmentsData}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
