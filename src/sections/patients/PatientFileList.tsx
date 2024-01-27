import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { LinkRounded } from '@mui/icons-material';
import Loading from '@/components/common/Loading';
import { fetchPatientFiles } from '@/utils/patients/fetch';
import { formatDate } from '@/utils';

const getFileSize = (size: number) => {
  if (size < 1024 ** 2) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${(size / 1024 ** 2).toFixed(2)} MB`;
};

interface Props {
  updated: boolean;
  patientId: string;
}

export default function PatientFileList({ updated, patientId }: Props) {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);

      const filesData = await fetchPatientFiles(patientId);

      setLoading(false);
      setFiles(filesData);
    } catch (error) {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  useEffect(() => {
    if (updated) {
      fetchFiles();
    }
  }, [updated, fetchFiles]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 50,
      }}
    >
      {loading && (
        <Box
          borderRadius={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: (theme) => theme.spacing(2),
            backgroundColor: (theme) => theme.palette.common.white,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: (theme) => theme.palette.divider,
          }}
        >
          <Loading />
        </Box>
      )}
      {files && (
        <>
          {!loading && files.length === 0 && <Box>No files</Box>}
          {files.length > 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file: any) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.name}</TableCell>
                      <TableCell>{getFileSize(file.size)}</TableCell>
                      <TableCell>{formatDate(file.timeCreated)}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="view"
                          href={file.url}
                          target="_blank"
                        >
                          <LinkRounded />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Box>
  );
}
