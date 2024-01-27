import { Metadata } from 'next';
import PatientsList from '@/components/PatientsList';
import { Box, Container } from '@mui/material';
import { mainPageTitle } from '@/utils';

export const metadata: Metadata = {
  title: `Patients - ${mainPageTitle}`,
  description: mainPageTitle,
};

export default async function PatientsPage() {
  const response = await fetch('http://localhost:3000/api/patients', {
    next: { revalidate: 60 },
  });

  const { data } = await response.json();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <PatientsList data={data} />
      </Container>
    </Box>
  );
}
