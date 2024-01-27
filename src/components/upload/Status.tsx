'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import CustomSnackbar from '../common/CustomSnackbar';

interface StatusPercentage {
  name: string;
  value: number;
  completed: string;
}

interface Props {
  status: string;
  percentages: StatusPercentage[];
}

export default function Status({ status, percentages }: Props) {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (status !== 'idle') {
      setOpenSnackbar(true);
    } else {
      setOpenSnackbar(false);
    }
  }, [status]);

  const onSnackbarClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const statusText = useMemo(() => {
    if (status === 'success') {
      return 'Uploaded succesfully.';
    } else if (status === 'failed') {
      return 'Upload failed.';
    } else if (status === 'canceled') {
      return 'Upload canceled.';
    }

    return 'Uploading...';
  }, [status]);

  return (
    <>
      {status === 'uploading' && (
        <>
          {percentages.map(({ value, name, completed }, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                marginBottom: (theme) => theme.spacing(2),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: (theme) => theme.spacing(1),
                }}
              >
                <Typography component="h6" variant="body2">
                  {name}
                </Typography>
                <Typography variant="body2">
                  {completed ? 'Uploaded' : `${value}%`}
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={value} />
            </Box>
          ))}
        </>
      )}

      <CustomSnackbar
        show={openSnackbar}
        text={statusText}
        onClose={onSnackbarClose}
        autoHideDuration={5000}
      />
    </>
  );
}
