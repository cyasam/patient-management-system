'use client';

import { SyntheticEvent, useRef, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material';

import { useAuth } from './AuthProvider';

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const { signin } = useAuth();

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      await signin(email, password);
      setError(null);
      setInfo('Signed in Successfully. Redirecting...');
    } catch (error: any) {
      setError(error.message);
      setInfo(null);
    }

    setLoading(false);
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {info && <Alert severity="success">{info}</Alert>}
        <TextField
          inputRef={emailRef}
          fullWidth
          label="Email Address"
          name="email"
          type="email"
        />
        <TextField
          inputRef={passwordRef}
          fullWidth
          label="Password"
          name="password"
          type="password"
        />
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Continue
        </Button>
      </Stack>
    </form>
  );
}
