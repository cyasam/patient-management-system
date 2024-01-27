import { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import { mainPageTitle } from '@/utils';
import PatientDetail from '@/sections/patients/PatientDetail';
import {
  fetchPatient,
  fetchPatientAppointmentsByPatientId,
} from '@/utils/patients/fetch';
import { cookies } from 'next/headers';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchPatient(params.id);

  const patientFullName = `${data.firstName} ${data.lastName}`;

  return {
    title: `Patient: ${patientFullName} - ${mainPageTitle}`,
    description: mainPageTitle,
  };
}

export default async function PatientDetailPage({ params }: Props) {
  const cookieStore = cookies();
  const user = JSON.parse(cookieStore.get('user')?.value as any);

  const patientId = params.id;
  const data = await fetchPatient(patientId);
  const appointmentsData = await fetchPatientAppointmentsByPatientId(
    patientId,
    user.uid
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <PatientDetail data={data} appointmentsData={appointmentsData} />
      </Container>
    </Box>
  );
}
