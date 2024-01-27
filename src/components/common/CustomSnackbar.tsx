import Snackbar from '@mui/material/Snackbar';
import { SyntheticEvent } from 'react';

interface Props {
  show: boolean;
  text: string;
  onClose: (reason?: string) => void;
  autoHideDuration?: number | null;
}

export default function CustomSnackbar({
  show,
  text,
  onClose,
  autoHideDuration,
}: Props) {
  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    onClose(reason);
  };

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={show}
      message={text}
      onClose={handleClose}
    />
  );
}
