'use client';

import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { Box, IconButton, Paper, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchFilterSelect from './SearchFilterSelect';

export default function PatientSearchArea() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>();

  const filterBy = searchParams.get('filterBy') ?? 'firstName';
  const [filter, setFilter] = useState(filterBy);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const value = inputRef?.current?.value;

    if (value) {
      router.push(`/patients/search?query=${value}&filterBy=${filter}`);
    }
  };

  const onSelectedChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box sx={{ position: 'relative', display: 'flex', flex: 1 }}>
          <SearchFilterSelect
            value={filter}
            onSelectedChange={onSelectedChange}
          />
          <TextField
            inputRef={inputRef}
            defaultValue={searchParams.get('query')}
            size="small"
            sx={{ flex: 1 }}
            placeholder="Search something..."
          />
        </Box>
        <IconButton
          type="submit"
          sx={{ marginLeft: (theme) => theme.spacing(1) }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
