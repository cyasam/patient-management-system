'use client';

import { Box, Button } from '@mui/material';

interface Props {
  status: string;
  paused: boolean;
  acceptedFiles: File[];
  onStart: () => void;
  onPauseResume: () => void;
  onCancel: () => void;
}

export default function FileButtons({
  status,
  paused,
  acceptedFiles,
  onStart,
  onPauseResume,
  onCancel,
}: Props) {
  return (
    <>
      {status !== 'uploading' && (
        <Box>
          <Button
            disabled={acceptedFiles.length === 0 || status === 'success'}
            type="button"
            onClick={onStart}
            variant="contained"
          >
            Upload
          </Button>
        </Box>
      )}

      {status === 'uploading' && (
        <Box>
          <Button type="button" onClick={onPauseResume} variant="contained">
            {paused ? 'Resume' : 'Pause'}
          </Button>
          {paused === false && (
            <Button
              type="button"
              onClick={onCancel}
              variant="contained"
              color="error"
              sx={{ marginLeft: (theme) => theme.spacing(2) }}
            >
              Cancel
            </Button>
          )}
        </Box>
      )}
    </>
  );
}
