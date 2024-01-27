'use client';

import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import styles from './FileUpload.module.css';
import { Box } from '@mui/material';

interface Props {
  disabled: boolean;
  onDrop: (files: File[]) => void;
}

export default function FileUpload({ disabled, onDrop }: Props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled,
    onDrop,
  });

  return (
    <Box
      {...getRootProps({
        className: classNames(styles.dropzone, { disabled: disabled }),
      })}
      sx={{
        marginBottom: (theme) => theme.spacing(2),
      }}
    >
      <input {...getInputProps()} />
      <p>Drag&#39;n drop some files here, or click to select files</p>
      {acceptedFiles.map((file: File, index: number) => (
        <p key={index}>{file.name}</p>
      ))}
    </Box>
  );
}
