'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

import styles from './SplashScreen.module.css';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const splashRef = useRef<HTMLElement>();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!loading) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'white',
        zIndex: (theme) => theme.zIndex.modal,
      }}
      ref={splashRef}
    >
      <div className={styles.boxes}>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.box}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Box>
  );
}
