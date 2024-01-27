'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase/config';
import Status from '@/components/upload/Status';
import { Grid, Paper, Typography } from '@mui/material';
import FileButtons from '@/components/upload/FileButtons';
import FileUpload from '@/components/upload/FileUpload';
import PatientFileList from './PatientFileList';

interface Props {
  patientId: string;
}

export default function UploadArea({ patientId }: Props) {
  const [status, setStatus] = useState('idle');
  const [paused, setPaused] = useState(false);
  const [percentages, setPercentages] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const uploadTaskRef = useRef([]);
  const disabled = status === 'uploading';

  const uploadFile = useCallback(() => {
    if (acceptedFiles.length === 0) {
      return;
    }

    setStatus('uploading');

    acceptedFiles.forEach((file: any, index: number) => {
      const fileName = file.name;
      const storageRef = ref(storage, `${patientId}/${fileName}`);
      const task = uploadBytesResumable(storageRef, file);

      let tasks: any[] = uploadTaskRef.current;
      tasks.push(task);

      setPercentages((prev) => {
        const clone: any = [...prev];
        clone[index] = { name: file.name, completed: false, value: 0 };
        return clone;
      });

      task.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setPercentages((prev) => {
            const clone: any = [...prev];
            clone[index] = { ...clone[index], value: Math.round(progress) };
            return clone;
          });
        },
        (error) => {
          setPercentages([]);

          if (error.code === 'storage/canceled') {
            setStatus('canceled');
          } else {
            setStatus('failed');
          }
        },
        () => {
          setPercentages((prev) => {
            const clone: any = [...prev];
            clone[index] = { ...clone[index], completed: true };
            return clone;
          });
        }
      );
    });
  }, [acceptedFiles, patientId]);

  useEffect(() => {
    if (
      percentages.length > 0 &&
      percentages.every(({ completed }) => completed === true)
    ) {
      uploadTaskRef.current.length = 0;
      acceptedFiles.length = 0;
      setPercentages([]);
      setStatus('success');
    }
  }, [percentages, acceptedFiles]);

  const cancelUpload = useCallback(() => {
    const uploadTask = uploadTaskRef.current;
    uploadTask.forEach((task: any) => {
      task.cancel();
    });
  }, []);

  const pauseResumeUpload = useCallback(() => {
    const uploadTask = uploadTaskRef.current;

    if (paused) {
      uploadTask.forEach((task: any) => {
        task.resume();
      });
      setPaused(false);
    } else {
      uploadTask.forEach((task: any) => {
        task.pause();
      });
      setPaused(true);
    }
  }, [paused]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="h3" variant="h6">
            Files
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: (theme) => theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Status status={status} percentages={percentages} />
            <FileUpload
              disabled={disabled}
              onDrop={(files: File[]) => {
                setStatus('idle');
                setAcceptedFiles(files);
              }}
            />
            <FileButtons
              status={status}
              paused={paused}
              acceptedFiles={acceptedFiles}
              onStart={uploadFile}
              onPauseResume={pauseResumeUpload}
              onCancel={cancelUpload}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: (theme) => theme.spacing(2) }}>
            <PatientFileList
              updated={status === 'success' || status === 'canceled'}
              patientId={patientId}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
