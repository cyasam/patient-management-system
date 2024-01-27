'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography component="h2">Something went wrong!</Typography>
        <Button onClick={() => reset()}>Try again</Button>
      </Container>
    </Box>
  );
}
