import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { formatDate } from '@/utils';

interface Props {
  appointments: any;
  sx: any;
}

export const UpcomingAppointments = (props: Props) => {
  const { appointments = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Upcoming Appointments" />
      <List>
        {appointments.map((appointment: any, index: number) => {
          const hasDivider = index < appointments.length - 1;

          return (
            <ListItem divider={hasDivider} key={appointment.id}>
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText
                    primary={appointment.patientName}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={appointment.title}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </Box>

                <Box>
                  <ListItemText
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      textWrap: 'nowrap',
                    }}
                    disableTypography={true}
                  >
                    {formatDate(appointment.date)}
                  </ListItemText>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
