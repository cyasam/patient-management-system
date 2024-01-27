import { Metadata } from 'next';
import { Box, Container } from '@mui/material';
import PatientsList from '@/components/PatientsList';
import { mainPageTitle } from '@/utils';
import { searchBySelectItems } from '@/utils/data';

interface Props {
  searchParams?: { query: string; filterBy: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const filterBy = searchParams?.filterBy;
  const query = searchParams?.query;

  const filterName = searchBySelectItems.find(
    (item) => item.value === filterBy
  )?.name;

  return {
    title: `Patients Search By ${filterName}: ${query} - ${mainPageTitle}`,
    description: mainPageTitle,
  };
}

export default async function PatientSearch({ searchParams }: Props) {
  let query = searchParams?.query;
  let filterBy = searchParams?.filterBy;

  const response = await fetch(
    `http://localhost:3000/api/patients?query=${query}&filterBy=${filterBy}`,
    { cache: 'no-cache' }
  );

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
